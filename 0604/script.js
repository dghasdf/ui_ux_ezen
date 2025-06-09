$(document).ready(function () {
  $("#fullpage").fullpage({
    autoScrolling: true,
    scrollHorizontally: true,
    scrollOverflow: true,
    // 이동
    menu: "#myMenu",
    lockAnchors: true,
    anchors: ["firstPage", "secondPage", "thirdPage", "fourthPage"],
    navigation: true,
    navigationPosition: "right",
    navigationTooltips: [
      "firstSlide",
      "secondSlide",
      "thirdPage",
      "fourthPage",
    ],
    showActiveTooltip: false,
    slidesNavigation: true,
    slidesNavPosition: "bottom",

    onLeave: function (origin, destination, direction, trigger) {
      if (origin.index == 0) {
        $("#sect1").css("background", "green");
      }
      if (origin.index == 2) {
        $(".left").removeClass("animate__bounceIn");
        $(".right").removeClass("animate__bounceIn");
      }
    },
    afterLoad: function (origin, destination, direction, trigger) {
      if (destination.index == 0) {
        $("#sect1").css("background", "red");
      }
      if (destination.index == 2) {
        $(".left").addClass("animate__bounceIn");
        $(".right").addClass("animate__bounceIn");
      }
    },
  });
  $(".slider").bxSlider({
    mode: "fade",
    auto: true,
    pager: false,
    controls: false,
    speed: 300,
    pause: 2000,
  });
});
