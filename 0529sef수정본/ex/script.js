const tabItems = document.querySelectorAll(".tab-menu li");
const sliders = document.querySelectorAll(".slider");

tabItems.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabItems.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");

    const tabName = tab.dataset.tab;
    sliders.forEach((slider) => {
      slider.classList.remove("active");
    });

    const selectedSlider = document.querySelector(`.slider.${tabName}`);
    selectedSlider.classList.add("active");

    // // 무한 슬라이드 설정 및 위치 초기화
    // setupInfiniteSlider(selectedSlider);

    const track = selectedSlider.querySelector(".slider-track");
    track.style.transition = "none";
    track.style.transform = `translateX(-100%)`;

    // 브라우저가 렌더링 처리할 시간을 줌 (움찔 방지)
    requestAnimationFrame(() => {
      setupInfiniteSlider(selectedSlider);
      requestAnimationFrame(() => {
        track.style.transition = "transform 0.5s ease-in-out";
      });
    });
  });
});
// 무한 슬라이드 설정 함수
function setupInfiniteSlider(slider) {
  const track = slider.querySelector(".slider-track");
  let slides = slider.querySelectorAll(".slide");

  // 중복 복제 방지
  if (slider.dataset.cloned !== "true") {
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    firstClone.classList.add("clone");
    lastClone.classList.add("clone");

    track.insertBefore(lastClone, slides[0]);
    track.appendChild(firstClone);

    slider.dataset.cloned = "true";
  }

  slides = slider.querySelectorAll(".slide");
  let currentIndex = 1;
  const slideWidth = 100;

  const dotsContainer = slider.querySelector(".dots");

  function goToSlide(index, animate = true) {
    if (!animate) {
      track.style.transition = "none";
    } else {
      track.style.transition = "transform 0.5s ease-in-out";
    }
    track.style.transform = `translateX(-${index * slideWidth}%)`;
  }

  function updateDots(realIndex) {
    const originalSlides = slider.querySelectorAll(".slide:not(.clone)");
    dotsContainer.innerHTML = "";
    originalSlides.forEach((_, i) => {
      const dot = document.createElement("span");
      if (i === realIndex) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentIndex = i + 1;
        goToSlide(currentIndex);
        updateDots(i);
      });
      dotsContainer.appendChild(dot);
    });
  }

  goToSlide(currentIndex, false);
  updateDots(currentIndex - 1);

  const prev = slider.querySelector(".prev");
  const next = slider.querySelector(".next");

  if (prev && next) {
    prev.onclick = () => {
      if (currentIndex <= 0) return;
      currentIndex--;
      goToSlide(currentIndex);
      updateDots((currentIndex - 1 + slides.length - 2) % (slides.length - 2));
    };

    next.onclick = () => {
      if (currentIndex >= slides.length - 1) return;
      currentIndex++;
      goToSlide(currentIndex);
      updateDots((currentIndex - 1) % (slides.length - 2));
    };
  }

  // 트랜지션 후 위치 재조정 (무한 슬라이드용)
  track.addEventListener("transitionend", () => {
    if (slides[currentIndex].classList.contains("clone")) {
      if (currentIndex === 0) {
        currentIndex = slides.length - 2;
        goToSlide(currentIndex, false);
      } else if (currentIndex === slides.length - 1) {
        currentIndex = 1;
        goToSlide(currentIndex, false);
      }
    }
  });
}

// 초기 슬라이더 한 개 활성화
sliders.forEach((slider) => {
  if (slider.classList.contains("active")) {
    setupInfiniteSlider(slider);
  }
});
