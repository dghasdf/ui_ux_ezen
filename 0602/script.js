$(document).ready(function () {
  $("#fullpage").fullpage({
    autoScrolling: true,
    scrollHorizontally: true,
    scrollOverflow: true,

    // 이동
    menu: "#menu",
    lockAnchors: true,
    anchors: ["page0", "page1", "page2", "page3", "page4", "page5", "page6"],
    // 앵커위치
    navigation: true,
    // 풀페이지 옆에위치버튼
    navigationPosition: "right",
    navigationTooltips: ["firstSlide", "secondSlide"],
    showActiveTooltip: false,
    slidesNavigation: true,
    slidesNavPosition: "bottom",

    onLeave: function (origin, destination, direction, trigger) {
      if (origin.index == 0) {
        $("header").css("color", "#000");
        $("header .logo").css("filter", "invert(0)");
        $(".usericon ul img").css("filter", "invert(0)");
        // origin.index = 해당 0번째 section을 벗어나면 적용했던 해당 css를 이렇게 바꾸겟다.
        // invert(반전하지않음) 즉, 0번째 section을 벗어나 다른 섹션에서는 이렇게 적용.
      }
      if (origin.idnex == 1) {
        $("#sect1 .left").removeClass("animate__flash");
        $("#sect1 .right").removeClass("animate__bounceIn");
      }
    },

    afterLoad: function (origin, destination, direction, trigger) {
      if (destination.index == 0) {
        $("header").css("color", "#fff");
        $("header .logo").css("filter", "invert(1)");
        $(".usericon ul img").css("filter", "invert(1)");
        // destination = 되돌리다 만약 다른섹션에서 다시 0번째 section으로 돌아가게 되면, onleave에서 적용했던 css를 다시 이렇게 바꾸겠다.
      }
      if (destination.index == 1) {
        $("#sect1 .left").addClass("animate__flash");
        $("#sect1 .right").addClass("animate__bounceIn");
      }
    },
  });
});
