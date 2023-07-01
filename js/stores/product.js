class ProductsStore {
    products = []
    productsParentElement
    totalCostNode

    constructor(productListId, costId) {
        this.productsParentElement = document.querySelector(productListId)
        this.totalCostNode = document.querySelector(costId)
    }

    createDOMElement = (element) => {
        const div = document.createElement('div')
        div.classList.add('products__item')

        const likeBtn = document.createElement('div')
        likeBtn.innerHTML= '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M11.466 22.776a.746.746 0 0 0 1.068 0l9.594-9.721C26.129 9.002 23.286 2 17.596 2 14.179 2 12.611 4.511 12 4.98 11.386 4.509 9.828 2 6.404 2 .732 2-2.146 8.984 1.873 13.055z" data-original="#f44336"/></g></svg>'
        likeBtn.classList.add('products__like')
        div.appendChild(likeBtn)

        const img = document.createElement('img')
        img.src = element.imageUrl
        div.appendChild(img)

        const title = document.createElement('p')
        title.innerText = element.title
        title.classList.add('products__title')
        div.appendChild(title)

        const tag = document.createElement('p')
        tag.innerText = 'Цена:'
        tag.classList.add('products__tag')

        const cost = document.createElement('p')
        cost.innerText = Number(element.cost).toLocaleString('ru') + ' руб.'
        cost.classList.add('products__cost')

        const wrapper = document.createElement('div')
        wrapper.classList.add('products__costWrapper')
        wrapper.appendChild(tag)
        wrapper.appendChild(cost)
        div.appendChild(wrapper)
        
        const addBtn = document.createElement('div')
        addBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 448 448" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M408 184H272a8 8 0 0 1-8-8V40c0-22.09-17.91-40-40-40s-40 17.91-40 40v136a8 8 0 0 1-8 8H40c-22.09 0-40 17.91-40 40s17.91 40 40 40h136a8 8 0 0 1 8 8v136c0 22.09 17.91 40 40 40s40-17.91 40-40V272a8 8 0 0 1 8-8h136c22.09 0 40-17.91 40-40s-17.91-40-40-40zm0 0" data-original="#000000"/></g></svg>'
        addBtn.classList.add('products__add')
        div.appendChild(addBtn)

        const svgPath = likeBtn.firstChild.querySelector('path')
        if (element.isLiked) {
            likeBtn.classList.add('liked')
            svgPath.classList.add('liked')
        }

        if (element.inCart) {
            addBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 78.369 78.369" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M78.049 19.015 29.458 67.606a1.094 1.094 0 0 1-1.548 0L.32 40.015a1.094 1.094 0 0 1 0-1.547l6.704-6.704a1.095 1.095 0 0 1 1.548 0l20.113 20.112 41.113-41.113a1.095 1.095 0 0 1 1.548 0l6.703 6.704a1.094 1.094 0 0 1 0 1.548z" fill="#FFF" data-original="#000000"/></g></svg>'
            addBtn.classList.add('inCart')
        }

        const dataBase = new DataBase('https://649c69660480757192381e95.mockapi.io')

        likeBtn.addEventListener('click', async() => {
            likeBtn.classList.toggle('liked')
            svgPath.classList.toggle('liked')

            if (likeBtn.classList.contains('liked')) {
                await dataBase.changeParamsProduct(element.id, {isLiked:true})
            }else {
                await dataBase.changeParamsProduct(element.id, {isLiked:false})
            }
        })

        addBtn.addEventListener('click', async () => {
            addBtn.classList.toggle('inCart')

            if (addBtn.classList.contains('inCart')) {
                addBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 78.369 78.369" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M78.049 19.015 29.458 67.606a1.094 1.094 0 0 1-1.548 0L.32 40.015a1.094 1.094 0 0 1 0-1.547l6.704-6.704a1.095 1.095 0 0 1 1.548 0l20.113 20.112 41.113-41.113a1.095 1.095 0 0 1 1.548 0l6.703 6.704a1.094 1.094 0 0 1 0 1.548z" fill="#FFF" data-original="#000000"/></g></svg>'
                await dataBase.changeParamsProduct(element.id, {inCart:true})
                this.setCost()
            } else {
                addBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 448 448" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M408 184H272a8 8 0 0 1-8-8V40c0-22.09-17.91-40-40-40s-40 17.91-40 40v136a8 8 0 0 1-8 8H40c-22.09 0-40 17.91-40 40s17.91 40 40 40h136a8 8 0 0 1 8 8v136c0 22.09 17.91 40 40 40s40-17.91 40-40V272a8 8 0 0 1 8-8h136c22.09 0 40-17.91 40-40s-17.91-40-40-40zm0 0"  data-original="#000000"/></g></svg>'
                await dataBase.changeParamsProduct(element.id, {inCart:false})
                this.setCost()
            }
        })
        return div
    }

    printDom = () => {
        this.products.forEach((el) => {
            const div = this.createDOMElement(el)
            this.productsParentElement.appendChild(div)
        })
        this.setCost()
    }

    add = (newEl) => {
        this.products = [...this.products, newEl]
        this.printDom()
    }

    setAll = (elements) => {
        this.products = elements
        this.clearDOM()
        this.printDom()
    }

    async setCost() {
        const dataBase = new DataBase('https://649c69660480757192381e95.mockapi.io')
        const products = await dataBase.getProducts()
        let cost = 0

        for (const product of products) {
            if (product.inCart === true) {
                cost += Number(product.cost)
            }
        }

        this.totalCostNode.innerText = cost.toLocaleString('ru') + ' руб.'
    }

    clearDOM() {
        while(this.productsParentElement.firstChild) {
            this.productsParentElement.removeChild(this.productsParentElement.lastChild)
        }
    }
}