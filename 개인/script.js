const cursor = document.querySelector(".custom-cursor");
const hoverTargets = document.querySelectorAll(".hover-target");

document.addEventListener("mousemove", (e) => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
});

hoverTargets.forEach((target) => {
  target.addEventListener("mouseenter", () => {
    cursor.classList.add("hovered"); // ✅ 원 작아지게
    cursor.textContent = "click"; // ✅ 텍스트 변경
  });

  target.addEventListener("mouseleave", () => {
    cursor.classList.remove("hovered"); // ✅ 원 원래대로
    cursor.textContent = "cursor"; // ✅ 텍스트 원래대로
  });
});
