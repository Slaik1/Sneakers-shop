const swiper = new Swiper('.swiper', {
  // Optional parameters
  speed:600,
  spaceBetween: 10,
  direction: 'horizontal',
  loop: true,
  pagination: {
    el: '.swiper-pagination',
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// const PRODUCTS = [
//   {
//     id: 1,
//     name: "Кросовки",
//     imageUrl: "https://basket-10.wb.ru/vol1412/part141217/141217830/images/big/1.jpg",
//     price: 10000
//   },
//   {
//     id: 2,
//     name: "Кросовки2",
//     imageUrl: "https://basket-10.wb.ru/vol1412/part141217/141217830/images/big/1.jpg",
//     price: 20000
//   },
//   {
//     id: 3,
//     name: "Кросовки",
//     imageUrl: "https://basket-10.wb.ru/vol1412/part141217/141217830/images/big/1.jpg",
//     price: 30000
//   }
// ]

// const elementsClass = new ProductsStore('.products__list')

// elementsClass.setAll(PRODUCTS)