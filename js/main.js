const dataBase = new DataBase('https://649c69660480757192381e95.mockapi.io')

async function fillDOMProducts() {
    const productStore = new ProductsStore('.products__list')
    const products = await dataBase.getProducts()
    productStore.setAll(products)
}


fillDOMProducts()