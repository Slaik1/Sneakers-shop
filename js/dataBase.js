class DataBase {
    baseUrl
    products
    endpoints = {
        product:'/product/'
    }

    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    async addProduct(product) {
        const request = await fetch(this.baseUrl + this.endpoints.product, {
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(product)
        })
        return await request.json()
    }

    async getProducts() {
        const request = await fetch(this.baseUrl + this.endpoints.product, {
            method: 'GET',
            headers: {'content-type':'application/json'},
        })
        this.products = await request.json()
        return this.products
    }

    async getParamProducts(key, value) {
        const url = new URL(this.baseUrl + this.endpoints.product)
        url.searchParams.append(key, value)
        const request = await fetch(url, {
            method: 'GET',
            headers: {'content-type':'application/json'},
        })
        return await request.json()
    }

    async changeParamsProduct(id, param) {
        const request = await fetch(this.baseUrl + this.endpoints.product + id, {
            method: 'PUT',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(param)
        })
        return  await request.json()
    }
}