const dataBase = new DataBase('https://649c69660480757192381e95.mockapi.io')
const store = new ProductsStore('#products__list', '#totalCost')
const searchBtn = document.querySelector('#searchBtn')
const searchInput = document.querySelector('#searchField')
let products

async function fillDOMProducts() {
    products = await dataBase.getProducts()
    productStore.setAll(products)
    hidePreloader('#preloader')
}

function hidePreloader(preloaderId) {
    const preloader = document.querySelector(preloaderId)
    preloader.style.visibility = 'hidden'
}

function debounse(callback, delay) {
    let timeoutId = null

    return (...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            callback.apply(this, args)
        }, delay)
    }
}

searchInput.oninput  = (event) => {
    const keyWord = event.target.value//document.querySelector('#searchField').value
    sortProducts(products, keyWord)
}

const sortProducts = debounse((products, key) => {
    const sortedProducts = products.filter(
        (el) => el.title.toLowerCase().includes(key.toLowerCase())
    )
    store.setAll(sortedProducts)
}, 500)

fillDOMProducts()