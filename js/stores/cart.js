class CartsStore {
    products = []
    productsParentElement
    costCartParentNode

    constructor(productsDOMId, costDOMId) {
        this.productsParentElement = document.querySelector(productsDOMId)
        this.costCartParentNode = document.querySelector(costDOMId)
    }

    createDOMElement(element) {
        const div = document.createElement('div')
        div.classList.add('panelCart__item')

        const img = document.createElement('img')
        img.src = element.imageUrl
        div.appendChild(img)

        const title = document.createElement('div')
        title.classList.add('panelCart__itemTitle')

        const about = document.createElement('p')
        about.classList.add('panelCart__about')
        about.innerText = element.title
        title.appendChild(about)

        const cost = document.createElement('p')
        cost.classList.add('panelCart__cost')
        cost.innerText = Number(element.cost).toLocaleString('ru') + ' руб.'
        title.appendChild(cost)

        div.appendChild(title)

        const deleteBtn = document.createElement('div')
        deleteBtn.classList.add('panelCart__deleteBtn')
        deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 329.269 329" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M194.8 164.77 323.013 36.555c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0L164.633 134.605 36.422 6.391c-8.344-8.34-21.824-8.34-30.164 0-8.344 8.34-8.344 21.824 0 30.164l128.21 128.215L6.259 292.984c-8.344 8.34-8.344 21.825 0 30.164a21.266 21.266 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.214 128.216 128.214a21.273 21.273 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25 8.343-8.34 8.343-21.824 0-30.164zm0 0" data-original="#000000"/></g></svg>'
        div.appendChild(deleteBtn)

        deleteBtn.addEventListener('click', async() => {
            div.remove()
            
            const dataBase = new DataBase('https://649c69660480757192381e95.mockapi.io') 
            const productsStore = new ProductsStore('#products__list', '#totalCost')
            await dataBase.changeParamsProduct(element.id, {inCart: false})

            const pageName = document.title
            let newProducts

            if (pageName === 'Магазин кроссовок') {
                newProducts = await dataBase.getProducts()
            } else if (pageName === 'Мои закладки') {
                newProducts = await dataBase.getParamProducts('isLiked', true)
            } else if (pageName === 'Мои покупки') {
                newProducts = await dataBase.getParamProducts('purchase', true)
            }

            for (let index = 0; index < this.products.length; index++) {
                if (this.products[index].id === element.id) {
                    this.products.splice(index, 1)
                }
            }

            productsStore.setAll(newProducts)

            this.setCost()
        })
        return div
    }

    printDom() {
        this.products.forEach((el) => {
            const div = this.createDOMElement(el)
            this.productsParentElement.appendChild(div)
        })
        this.setCost()
    }

    add(newEl) {
        this.products = [...this.products, newEl]
        this.printDom()
    }

    setAll(elements) {
        this.products = elements
        this.printDom()
    }

    setCost() {
        let cost = 0
        for (const el of this.products) {
            cost += Number(el.cost)
        }
        this.costCartParentNode.innerHTML = cost.toLocaleString('ru') + ' руб.  '
    }
}