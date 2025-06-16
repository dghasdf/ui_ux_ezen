document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60, // 헤더 높이만큼 보정
        behavior: "smooth",
      });
    }
  });
});

window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// 커서 마우스
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
