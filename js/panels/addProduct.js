const DOMBaseElements = {
    title: document.querySelector('#panelAddTile'),
    imageUrl: document.querySelector('#panelAddUrl'),
    cost: document.querySelector('#panelAddCost'),
    addBtn: document.querySelector('#panelAddBtn')
}

const DOMViewAddElements = {
    openPanelBtn: document.querySelector('#openPanelAddBtn'),
    panelAddProduct: document.querySelector('#panelAddProduct'),
    opacity: document.querySelector('#opacity'),
    closeBtn: document.querySelector('#panelAddCloseBtn')
}
    
    
DOMBaseElements.addBtn.addEventListener('click', async () => {
    if(DOMBaseElements.title.value && DOMBaseElements.imageUrl.value && DOMBaseElements.cost.value) {
        const dataBase = new DataBase('https://649c69660480757192381e95.mockapi.io')
        const productStore = new ProductsStore('#products__list', '#totalCost')

        const newProduct = await dataBase.addProduct({
            title: DOMBaseElements.title.value,
            imageUrl: DOMBaseElements.imageUrl.value,
            cost: DOMBaseElements.cost.value,
            inCart: false,
            isLiked: false,
            purchase: false 
        })

        productStore.add(newProduct)

        DOMBaseElements.title.value = ''
        DOMBaseElements.imageUrl.value = ''
        DOMBaseElements.cost.value = ''
    }
    else {
        console.log('Поля не должны быть пустыми');
    }
})

DOMViewAddElements.openPanelBtn.addEventListener('click', () => {
    DOMViewAddElements.panelAddProduct.classList.toggle('rightSlide')
    DOMViewAddElements.opacity.style.visibility="visible";
})

DOMViewAddElements.closeBtn.addEventListener('click', () => {
    DOMViewAddElements.panelAddProduct.classList.toggle('rightSlide')
    DOMViewAddElements.opacity.style.visibility="hidden";
})
