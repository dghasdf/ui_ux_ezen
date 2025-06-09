const tabItems = document.querySelectorAll('.tab-menu li');
const sliders = document.querySelectorAll('.slider');

tabItems.forEach(tab => {
  tab.addEventListener('click', () => {
    // 탭 활성화
    tabItems.forEach(item => item.classList.remove('active'));
    tab.classList.add('active');

    // 슬라이더 전환
    const tabName = tab.dataset.tab;
    sliders.forEach(slider => {
      slider.classList.remove('active');
      if (slider.classList.contains(tabName)) {
        slider.classList.add('active');
        updateSlider(slider, 0);
      }
    });
  });
});

// 슬라이더 동작 (좌우, dots)
function updateSlider(slider, index) {
  const track = slider.querySelector('.slider-track');
  const slides = slider.querySelectorAll('.slide');
  const dotsContainer = slider.querySelector('.dots');

  // 슬라이드 이동
  track.style.transform = `translateX(-${index * 100}%)`;

  // 도트 업데이트
  dotsContainer.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === index) dot.classList.add('active');
    dot.addEventListener('click', () => updateSlider(slider, i));
    dotsContainer.appendChild(dot);
  });

  // 버튼 설정
  const prevBtn = slider.querySelector('.prev');
  const nextBtn = slider.querySelector('.next');

  if (prevBtn && nextBtn) {
    prevBtn.onclick = () => {
      const newIndex = index === 0 ? slides.length - 1 : index - 1;
      updateSlider(slider, newIndex);
    };
    nextBtn.onclick = () => {
      const newIndex = index === slides.length - 1 ? 0 : index + 1;
      updateSlider(slider, newIndex);
    };
  }
}

// 초기 슬라이더 상태 설정
sliders.forEach(slider => {
  if (slider.classList.contains('active')) {
    updateSlider(slider, 0);
  }
});
