const base = new DataBase('https://649c69660480757192381e95.mockapi.io')
const productStore = new ProductsStore('#products__list', '#totalCost')
const cartsStore = new CartsStore('#cartItemsList','#panelCartTotalCost')

async function fillCartProducts() {
    const products = await dataBase.getParamProducts('inCart', true)
    const emptyCartPanel = document.querySelector('#emptyCart')
    if (products.length === 0) {
        emptyCartPanel.style.visibility = 'visible'
        return
    }
    emptyCartPanel.style.visibility = 'hidden'
    cartsStore.setAll(products)
}

function clearViewCart() {
    const cartList = cartsStore.productsParentElement

    while(cartList.firstChild) {
        cartList.removeChild(cartList.lastChild)
    }
}

function showOrderedPage() {
    const orderedPanel = document.querySelector('#orderedPanel')
    orderedPanel.style.visibility = 'visible'
}

function hideOrderedPage() {
    const orderedPanel = document.querySelector('#orderedPanel')
    orderedPanel.style.visibility = 'hidden'
}

const DOMViewCartElements = {
    openPanelBtn: document.querySelector('#openPanelCartBtn'),
    panelCart: document.querySelector('#panelCart'),
    opacity: document.querySelector('#opacity'),
    closePanelBtn: document.querySelector('#panelCartCloseBtn'),
    orderBtn: document.querySelector('#panelOrderBtn')
}

function toggleCartOpen() {
    let isOpen = false;

    return () => {
        isOpen = !isOpen

        DOMViewCartElements.panelCart.classList.toggle('rightSlide')

        if(isOpen) {
            DOMViewCartElements.opacity.style.visibility="visible";
            fillCartProducts()
            return
        } 

        DOMViewCartElements.opacity.style.visibility="hidden";
        clearViewCart()
        setTimeout(hideOrderedPage, 400);
    }
}

function addListenersForArray(elsArr, listener, callback) {
    elsArr.forEach((el) => el.addEventListener(listener,callback))
}

const idsForListeners = [
    DOMViewCartElements.closePanelBtn,
    DOMViewCartElements.openPanelBtn,
    DOMViewCartElements.opacity
]

// add listeners for toggleCard

addListenersForArray(idsForListeners, 'click', toggleCartOpen())



DOMViewCartElements.orderBtn.addEventListener('click', async () => {
    const cartProducts = document.querySelector('#cartItemsList').children
    

    if (cartProducts.length === 0) {
        console.log('нужно что-то заказать');
        return
    }
    showOrderedPage()

    clearViewCart()
    let products = await base.getParamProducts('inCart',true)
    const pageName = document.title
    
    for (const item of products) {
        await base.changeParamsProduct(item.id, {
            purchase: true,
            inCart: false
        })
    }

    if (pageName === 'Магазин кроссовок') {
        products = await dataBase.getProducts()
    } else if (pageName === 'Мои закладки') {
        products = await dataBase.getParamProducts('isLiked', true)
    } else if (pageName === 'Мои покупки') {
        products = await dataBase.getParamProducts('purchase', true)
    }

    productStore.setAll(products)
})


