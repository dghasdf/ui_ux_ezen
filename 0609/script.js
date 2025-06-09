// full page
$(document).ready(function () {
  $("#fullpage").fullpage({
    autoScrolling: true,
    scrollHorizontally: true,
    scrollOverflow: false,
    // 이동
    menu: "#myMenu",
    lockAnchors: true,
    anchors: ["page0", "page1", "page2", "page3"],
    navigation: true,
    navigationPosition: "right",
    navigationTooltips: ["page0", "page1", "page2", "page3"],
    showActiveTooltip: true,
    slidesNavigation: true,
    slidesNavPosition: "bottom",
  });
  // Initialize Swiper
  const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,
    slidesPerView: 3,
    spaceBetween: 30,
    autoplay: {
      delay: 2000,
    },
  });
});
