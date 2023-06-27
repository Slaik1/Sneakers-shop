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