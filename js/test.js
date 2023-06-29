// async function main(){
//     const data = new DataBase('https://649c69660480757192381e95.mockapi.io',user= {
//         createdAt: 1687975779,
//         id: 1
//        })
//     if (data.user === null) {
//         await data.addUser()
//     }
//     const product = await data.addProduct(newProduct={
//         title:'кроссовки',
//         imageUrl: 'ссылка',
//         cost:255,
//         inCart:true,
//         isLiked:true
//     })
//     console.log(newProduct);

//     const products = await data.getProducts()
//     console.log(products);


//     const likedProducts = await data.getParamProducts('inCart', false)
//     console.log(likedProducts);

//     const newParam = await data.changeParamsProduct(1, {
//         isLiked:false
//     })

// }

// main()