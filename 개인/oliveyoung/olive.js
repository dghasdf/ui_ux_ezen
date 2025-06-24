document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60, // 헤더 높이만큼 보정
        behavior: 'smooth',
      });
    }
  });
});

window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// 커서 마우스
const cursor = document.querySelector('.custom-cursor');
const hoverTargets = document.querySelectorAll('.hover-target');

document.addEventListener('mousemove', (e) => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
});

hoverTargets.forEach((target) => {
  target.addEventListener('mouseenter', () => {
    cursor.classList.add('hovered'); // ✅ 원 작아지게
    cursor.textContent = 'click'; // ✅ 텍스트 변경
  });

  target.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovered'); // ✅ 원 원래대로
    cursor.textContent = 'cursor'; // ✅ 텍스트 원래대로
  });
});

// 햄버거 메뉴 toggle
const nav = document.querySelector('.nav');
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
  hamburger.classList.toggle('open'); // ✅ ✕ 애니메이션용 클래스
});

// ✅ 헤더 + 메뉴에 .scrolled 클래스 toggle
const header = document.querySelector('header');
const menu = document.querySelector('.nav ul'); // ← 슬라이드 메뉴 ul

window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    header.classList.add('scrolled');
    menu.classList.add('scrolled'); // ✅ 메뉴에도 blur 효과 적용
  } else {
    header.classList.remove('scrolled');
    menu.classList.remove('scrolled');
  }
});

// 사이드 탑 버튼
const goToBtn = document.getElementById('goToBtn');

// 스크롤 시 버튼 보이기/숨기기
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    goToBtn.classList.add('active');
  } else {
    goToBtn.classList.remove('active');
  }
});

// 클릭 시 스크롤 맨 위로 부드럽게 이동
goToBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
