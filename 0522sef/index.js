// 스크롤할 시 헤더 변형
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  const logoImg = document.getElementById('logoImg'); // 로고 이미지 요소

  if (window.scrollY > 0) {
    header.classList.add('scrolled');
    logoImg.src = '/image/Group 58 (3).png'; // 스크롤 시 바꿀 로고 경로
  } else {
    header.classList.remove('scrolled');
    logoImg.src = '/image/Group 59 (2).png'; // 원래 로고 경로
  }
});

// 네비게이션 클릭시 이동
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault(); // 기본 점프 이동 막기

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth', // 부드럽게
        block: 'start', // 시작 위치에 맞춰 이동
      });
    }
  });
});

const slides = document.querySelector('.slides');
const slideItems = document.querySelectorAll('.slide');
const slideCount = slideItems.length;
let index = 1;

// 초기 위치
function setSlidePosition() {
  slides.style.transform = `translateX(-${index * 100}vw)`;
}
setSlidePosition();

// 무한 슬라이드 함수
function moveToNextSlide() {
  index++;
  slides.style.transition = 'transform 0.5s ease-in-out';
  slides.style.transform = `translateX(-${index * 100}vw)`;

  if (index === slideCount - 1) {
    setTimeout(() => {
      slides.style.transition = 'none';
      index = 1;
      setSlidePosition();
    }, 500);
  }
}

// 자동 슬라이드 실행
setInterval(moveToNextSlide, 3000);

// ⭐️ 브라우저 리사이즈 대응
window.addEventListener('resize', () => {
  slides.style.transition = 'none'; // 위치만 갱신, 애니메이션 없음
  setSlidePosition();
});
// 어바웃 스크롤
const aboutBox = document.getElementById('aboutBox');
const textArea = aboutBox.querySelector('.AboutText_Iconbox');

textArea.addEventListener('click', () => {
  aboutBox.classList.toggle('active');
});
// 폰트 애니메이션
const h2 = document.querySelector('#ABOUT h2');
const about = document.querySelector('#ABOUT');

window.addEventListener('scroll', () => {
  const rect = about.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // 보이는 비율 계산 (0 ~ 1 사이)
  const visibleRatio = 1 - Math.max(0, Math.min(1, rect.top / windowHeight));

  // 검정(#000) → 오렌지(#ff5800) 색상 보간
  const startColor = [0, 0, 0]; // rgb(0,0,0)
  const endColor = [255, 88, 0]; // rgb(255,88,0)

  const currentColor = startColor.map((start, i) =>
    Math.round(start + (endColor[i] - start) * visibleRatio)
  );

  h2.style.color = `rgb(${currentColor.join(',')})`;
});
