$(document).ready(function () {
  const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    scrollbar: {
      el: ".swiper-scrollbar",
    },
    // 한 슬라이더에 몇개의 사진이 나타나게 할건지
    slidesPerView: 3,
    spaceBetween: 10,
    breakpoints: {
      // when window width is >= 320px
      600: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      // when window width is >= 480px
      800: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      // when window width is >= 640px
      1000: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
  });
});
