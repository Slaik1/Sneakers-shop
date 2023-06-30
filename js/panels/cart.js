const base = new DataBase('https://649c69660480757192381e95.mockapi.io')
const productStore = new ProductsStore('.products__list')
const cartsStore = new CartsStore('#cartItemsList','#panelCartTotalCost')

async function fillCartProducts() {
    const products = await dataBase.getParamProducts('inCart', true)
    cartsStore.setAll(products)
}

function clearViewCart() {
    const cartList = cartsStore.productsParentElement

    while(cartList.firstChild) {
        cartList.removeChild(cartList.lastChild)
    }
}

const DOMViewCartElements = {
    openPanelBtn: document.querySelector('#openPanelCartBtn'),
    panelCart: document.querySelector('#panelCart'),
    opacity: document.querySelector('#opacity'),
    closePanelBtn: document.querySelector('#panelCartCloseBtn'),
    orderBtn: document.querySelector('#panelOrderBtn')
}

DOMViewCartElements.openPanelBtn.addEventListener('click', () => {
    DOMViewCartElements.panelCart.classList.toggle('rightSlide')
    DOMViewCartElements.opacity.style.visibility="visible";
    fillCartProducts()
})

DOMViewCartElements.closePanelBtn.addEventListener('click', () => {
    DOMViewCartElements.panelCart.classList.toggle('rightSlide')
    DOMViewCartElements.opacity.style.visibility="hidden";
    clearViewCart()
})

DOMViewCartElements.orderBtn.addEventListener('click', async () => {
    cartProducts = document.querySelector('#cartItemsList').children

    if (cartProducts.length === 0) {
        console.log('нужно что-то заказать');
        return
    }

    clearViewCart()
    let products = await base.getParamProducts('inCart',true)
    for (const item of products) {
        await base.changeParamsProduct(item.id, {inCart: false})
    }

    products = await base.getProducts()

    productStore.setAll(products)

})


