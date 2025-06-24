// 앵커 스크롤 이동
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60, // 헤더 높이 보정
        behavior: 'smooth',
      });
    }
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

// 타이핑 효과
let isTyping = false;
let isCanceled = false;
let typingInterval = null;

const typing = async (element, delay = 50) => {
  const text = element.dataset.original || element.textContent;
  element.dataset.original = text;
  element.textContent = '';
  element.style.opacity = 1;

  for (let i = 0; i < text.length; i++) {
    if (isCanceled) return;
    element.textContent += text[i];
    await new Promise((res) => setTimeout(res, delay));
  }
};

const resetElements = () => {
  const allEls = document.querySelectorAll(
    '.span_first span, .span_second, .p_first p'
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

  const spanFirst = document.querySelectorAll('.span_first span');
  const spanSecond = document.querySelector('.span_second');
  const pFirst = document.querySelectorAll('.p_first p');

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

window.addEventListener('DOMContentLoaded', () => {
  const intro = document.querySelector('#Intro');
  observer.observe(intro);
});

// svg
window.addEventListener('scroll', () => {
  // 처리할 섹션 아이디 리스트
  const sections = ['About', 'Project'];

  sections.forEach((id) => {
    const section = document.getElementById(id);
    if (!section) return;

    const svgElement = section.querySelector('svg');
    if (!svgElement) return;

    const rect = section.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    const sectionHeight = rect.height;
    const visibleHeight =
      Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const visibleRatio = visibleHeight > 0 ? visibleHeight / sectionHeight : 0;

    if (visibleRatio >= 0.4) {
      svgElement.classList.add('animate');
    } else {
      svgElement.classList.remove('animate');
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const wrappers = document.querySelectorAll('.video-wrapper');

  wrappers.forEach((wrapper) => {
    const video = wrapper.querySelector('video');
    const thumbnail = wrapper.querySelector('.thumbnail');

    wrapper.addEventListener('mouseenter', () => {
      thumbnail.style.opacity = '0';
      video.style.opacity = '1';
      video.play();
    });

    wrapper.addEventListener('mouseleave', () => {
      thumbnail.style.opacity = '1';
      video.style.opacity = '0';
      video.pause(); // 현재 시점에서 정지
    });
  });
});

// contant
document
  .getElementById('contact-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    emailjs.sendForm('service_az3014', 'template_y3f58g9', this).then(
      function () {
        alert('메시지가 성공적으로 전송되었습니다!');
        document.getElementById('contact-form').reset(); // 입력 초기화
      },
      function (error) {
        alert('전송 실패! 오류: ' + JSON.stringify(error));
      }
    );
  });

// 사이드 탑 버튼
const goToBtn = document.getElementById('goToBtn');

// 스크롤 시 버튼 보이기/숨기기
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
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
