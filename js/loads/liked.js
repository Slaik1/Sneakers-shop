const dataBase = new DataBase('https://649c69660480757192381e95.mockapi.io')

async function fillDOMProducts() {
    const productStore = new ProductsStore('#products__list', '#totalCost')
    const products = await dataBase.getParamProducts('isLiked', true)
    if (products.length === 0) {
        showNoItemsPanel('#noLikedItems')
        hidePreloader('#preloader')
        return
    }
    productStore.setAll(products)
    hidePreloader('#preloader')
}

function hidePreloader(preloaderId) {
    const preloader = document.querySelector(preloaderId)
    preloader.style.visibility = 'hidden'
}

function showNoItemsPanel(panelId) {
    const noItemsPanel = document.querySelector(panelId)
    noItemsPanel.style.visibility = 'visible'
}

fillDOMProducts()