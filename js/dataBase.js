class DataBase {
    user
    baseUrl
    products
    endpoints = {
        user:'/user',
        product:'/product/'
    }

    constructor(baseUrl, user = null) {
        this.baseUrl = baseUrl
        this.user = user
    }

    async addUser () {
        const request = await fetch(this.baseUrl + this.endpoints.user,{
            method: 'POST',
            headers: {'content-type':'application/json'}
        })
        this.user = await request.json()
    }

    async addProduct(product) {
        const request = await fetch(this.baseUrl + this.endpoints.user + '/' + this.user.id + this.endpoints.product, {
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(product)
        })
        return await request.json()
    }

    async getProducts() {
        const request = await fetch(this.baseUrl + this.endpoints.user + '/' + this.user.id + this.endpoints.product, {
            method: 'GET',
            headers: {'content-type':'application/json'},
        })
        this.products = await request.json()
        return this.products
    }

    async getParamProducts(key, value) {
        const url = new URL(this.baseUrl + this.endpoints.user + '/' + this.user.id + this.endpoints.product)
        url.searchParams.append(key, value); 
        const request = await fetch(url, {
            method: 'GET',
            headers: {'content-type':'application/json'},
        })
        return  await request.json()
    }

    async changeParamsProduct(id, param) {
        const request = await fetch(this.baseUrl + this.endpoints.user + '/' + this.user.id + this.endpoints.product + id, {
            method: 'PUT',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(param)
        })
        return  await request.json()
    }
}