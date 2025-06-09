// anime({
//   width: 200,
//   targets: ".square",
//   translateX: "500", // from '48px' to '25%',
//   height: 300,
//   rotate: "1.5turn", // from `0deg` to '.75turn',
//   duration: 2000,
//   easing: "easeInOutSine",
//   margin: 50,
// });

anime({
  targets: ".box",
  translateX: anime.stagger([-200, 300], { grid: [10, 1], axis: "x" }),
  backgroundColor: anime.stagger(["#ff595e", "#1982c4"]),
  delay: anime.stagger(100),
  duration: 1500,
  easing: "easeInOutQuad",
});
