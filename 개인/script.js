// 헤더
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

// 타이핑 효과
let isTyping = false;
let isCanceled = false;
let typingInterval = null;

const typing = async (element, delay = 50) => {
  const text = element.dataset.original || element.textContent;
  element.dataset.original = text;
  element.textContent = "";
  element.style.opacity = 1;

  for (let i = 0; i < text.length; i++) {
    if (isCanceled) return;
    element.textContent += text[i];
    await new Promise((res) => setTimeout(res, delay));
  }
};

const resetElements = () => {
  const allEls = document.querySelectorAll(
    ".span_first span, .span_second, .p_first p"
  );
  allEls.forEach((el) => {
    const text = el.dataset.original || el.textContent;
    el.textContent = text;
    el.style.opacity = 0;
  });
};

const runTypingSequence = async () => {
  if (isTyping) return;

  isCanceled = false;
  isTyping = true;

  const spanFirst = document.querySelectorAll(".span_first span");
  const spanSecond = document.querySelector(".span_second");
  const pFirst = document.querySelectorAll(".p_first p");

  resetElements();

  for (const span of spanFirst) {
    await typing(span, 80);
    if (isCanceled) {
      isTyping = false;
      return;
    }
    await new Promise((res) => setTimeout(res, 200));
  }

  await new Promise((res) => setTimeout(res, 300));
  if (isCanceled) {
    isTyping = false;
    return;
  }
  await typing(spanSecond, 70);

  for (const p of pFirst) {
    await new Promise((res) => setTimeout(res, 300));
    if (isCanceled) {
      isTyping = false;
      return;
    }
    await typing(p, 60);
  }

  isTyping = false;
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 섹션에 들어왔을 때 실행
        if (!isTyping) runTypingSequence();

        // 이미 타이핑중이지 않으면 간격마다 재실행 시작
        if (!typingInterval) {
          typingInterval = setInterval(() => {
            if (!isTyping) runTypingSequence();
          }, 12000); // 12초 간격
        }
      } else {
        // 섹션 벗어나면 중지 및 초기화
        isCanceled = true;
        isTyping = false;
        clearInterval(typingInterval);
        typingInterval = null;
        resetElements();
      }
    });
  },
  { threshold: 0.5 }
);

window.addEventListener("DOMContentLoaded", () => {
  const intro = document.querySelector("#Intro");
  observer.observe(intro);
});

// svg
window.addEventListener("scroll", () => {
  const aboutSection = document.getElementById("About");
  const svgElement = aboutSection.querySelector("svg");
  const rect = aboutSection.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;

  // about 섹션 높이
  const aboutHeight = rect.height;

  // 화면에 보이는 부분 높이 계산
  const visibleHeight =
    Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);

  // 보이는 비율 (0 이상 1 이하)
  const visibleRatio = visibleHeight > 0 ? visibleHeight / aboutHeight : 0;

  // 30% 이상 보이면 애니메이션 실행, 아니면 제거
  if (visibleRatio >= 0.4) {
    svgElement.classList.add("animate");
  } else {
    svgElement.classList.remove("animate");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const videos = document.querySelectorAll(".hover-video");

  videos.forEach((video) => {
    video.addEventListener("mouseenter", () => video.play());
    video.addEventListener("mouseleave", () => video.pause());
  });
});
