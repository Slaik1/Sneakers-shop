const user = JSON.parse(localStorage.getItem('user'))
const dataBase = new DataBase('https://649c69660480757192381e95.mockapi.io', user)
const productStore = new ProductsStore('.products__list')

async function setUser() {
    if (dataBase.user === null) {
        await dataBase.addUser()
        localStorage.setItem('user', JSON.stringify(dataBase.user))
    }
    fillDOMProducts()
}

async function fillDOMProducts() {
    const products = await dataBase.getProducts()
    productStore.setAll(products)
}

setUser()