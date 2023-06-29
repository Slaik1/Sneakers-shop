const DOMBaseElements = {
    title: document.querySelector('#panelAddTile'),
    imageUrl: document.querySelector('#panelAddUrl'),
    cost: document.querySelector('#panelAddCost'),
    addBtn: document.querySelector('#panelAddBtn')
}

const DOMViewElements = {
    addPanelBtn: document.querySelector('#openPanelBtn'),
    panelAddProduct: document.querySelector('#panelAddProduct'),
    panelOpacity: document.querySelector('#panelOpacity'),
    closeBtn: document.querySelector('#panelAddProductCloseBtn')
}
    
    
DOMBaseElements.addBtn.addEventListener('click', async () => {
    if(DOMBaseElements.title.value && DOMBaseElements.imageUrl.value && DOMBaseElements.cost.value) {
        const user = JSON.parse(localStorage.getItem('user'))
        const dataBase = new DataBase('https://649c69660480757192381e95.mockapi.io', user)

        await dataBase.addProduct({
            title: DOMBaseElements.title.value,
            imageUrl: DOMBaseElements.imageUrl.value,
            cost: DOMBaseElements.cost.value,
            inCart: false,
            isLiked:false
        })

        DOMBaseElements.title.value = ''
        DOMBaseElements.imageUrl.value = ''
        DOMBaseElements.cost.value = ''
    }
    else {
        console.log('Поля не должны быть пустыми');
    }
})

DOMViewElements.addPanelBtn.addEventListener('click', () => {
    DOMViewElements.panelAddProduct.classList.toggle('rightSlide')
    DOMViewElements.panelOpacity.style.visibility="visible";
})

DOMViewElements.closeBtn.addEventListener('click', () => {
    DOMViewElements.panelAddProduct.classList.toggle('rightSlide')
    DOMViewElements.panelOpacity.style.visibility="hidden";
})
