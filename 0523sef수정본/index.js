// 스크롤할 시 헤더 변형
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  const logoImg = document.getElementById('logoImg'); // 로고 이미지 요소

  if (window.scrollY > 0) {
    header.classList.add('scrolled');
    logoImg.src = '/image/Group 59 (2).png'; // 스크롤 시 바꿀 로고 경로
  } else {
    header.classList.remove('scrolled');
    logoImg.src = '/image/Group 58 (3).png'; // 원래 로고 경로
  }
});

// 네비게이션 클릭시 이동
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

// ✅ 로고 이미지 클릭 시 main으로 스크롤
document.getElementById('logoImg').addEventListener('click', function () {
  const main = document.querySelector('main');
  if (main) {
    main.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
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
// const aboutBox = document.getElementById("aboutBox");
// const textArea = aboutBox.querySelector(".AboutText_Iconbox");

// textArea.addEventListener("click", () => {
//   aboutBox.classList.toggle("active");
// });

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

// 인트로
document.addEventListener('DOMContentLoaded', function () {
  const intro = document.getElementById('intro');
  const mainContent = document.getElementById('mainContent');

  intro.addEventListener('click', function () {
    intro.style.opacity = '0';
    setTimeout(() => {
      intro.style.display = 'none';
      mainContent.style.display = 'block';
    }, 600); // transition 시간과 맞추기
  });
});

// 로딩스피너
// const intro = document.getElementById("intro");
// const loadingSpinner = document.getElementById("loadingSpinner");
// const mainContent = document.getElementById("mainContent");

// intro.addEventListener("click", () => {
//   // 1. 인트로 사라지기
//   intro.style.opacity = "0";

//   // 2. 인트로 숨기고 스피너 보이기
//   setTimeout(() => {
//     intro.style.display = "none";

//     loadingSpinner.style.display = "flex"; // 보여주기
//     loadingSpinner.style.opacity = "1";
//     loadingSpinner.style.pointerEvents = "auto";

//     // 3. 스피너 2초 후 사라지고 mainContent 등장
//     setTimeout(() => {
//       loadingSpinner.style.opacity = "0";
//       loadingSpinner.style.pointerEvents = "none";

//       setTimeout(() => {
//         loadingSpinner.style.display = "none";
//         mainContent.style.display = "block";

//         // 살짝 지연 후 투명도 적용
//         setTimeout(() => {
//           mainContent.style.opacity = "1";
//           mainContent.style.pointerEvents = "auto";
//         }, 50);
//       }, 500); // 스피너 페이드아웃 후 비활성화
//     }, 2000); // 스피너 노출 시간
//   }, 600); // 인트로 사라지는 transition 시간
// });

// 로딩스피너한번만
const intro = document.getElementById('intro');
const loadingSpinner = document.getElementById('loadingSpinner');
const mainContent = document.getElementById('mainContent');

// 세션 스토리지 확인
const hasVisited = sessionStorage.getItem('visited');

if (hasVisited) {
  // 이미 방문한 경우 → 인트로/스피너 건너뛰고 바로 콘텐츠 보여줌
  intro.style.display = 'none';
  loadingSpinner.style.display = 'none';
  mainContent.style.display = 'block';
  mainContent.style.opacity = '1';
  mainContent.style.pointerEvents = 'auto';
} else {
  // 처음 방문한 경우
  intro.addEventListener('click', () => {
    intro.style.opacity = '0';

    setTimeout(() => {
      intro.style.display = 'none';

      loadingSpinner.style.display = 'flex';
      loadingSpinner.style.opacity = '1';
      loadingSpinner.style.pointerEvents = 'auto';

      setTimeout(() => {
        loadingSpinner.style.opacity = '0';
        loadingSpinner.style.pointerEvents = 'none';

        setTimeout(() => {
          loadingSpinner.style.display = 'none';
          mainContent.style.display = 'block';

          setTimeout(() => {
            mainContent.style.opacity = '1';
            mainContent.style.pointerEvents = 'auto';
          }, 50);
        }, 500);
      }, 2000);
    }, 600);

    // 방문 기록 저장
    sessionStorage.setItem('visited', 'true');
  });
}

// 탭
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetId = tab.dataset.tab;

    // 모든 탭 비활성화
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    // 선택된 탭 활성화
    tab.classList.add('active');
    document.getElementById(targetId).classList.add('active');

    // 탭 전환 시 내용 초기화
    resetContent();
  });
});

// BEER 클릭 시 텍스트 변경
const beerImages = document.querySelectorAll('.beer-images img');
const defaultText = document.querySelector('.default-text');
const beerInfo = document.querySelector('.beer-info');
const beerTitle = document.querySelector('.beer-title');
const beerDesc = document.querySelector('.beer-desc');

beerImages.forEach(img => {
  img.addEventListener('click', () => {
    const title = img.dataset.title;
    const desc = img.dataset.desc;

    defaultText.style.display = 'none';
    beerInfo.style.display = 'block';
    beerTitle.textContent = title;
    beerDesc.textContent = desc;
  });
});

// FOOD 클릭 시 텍스트 변경
const foodImages = document.querySelectorAll('.food-images img');
const foodDefaultText = document.querySelector('.food-default-text');
const foodInfo = document.querySelector('.food-info');
const foodTitle = document.querySelector('.food-title');
const foodDesc = document.querySelector('.food-desc');

foodImages.forEach(img => {
  img.addEventListener('click', () => {
    const title = img.dataset.title;
    const desc = img.dataset.desc;

    foodDefaultText.style.display = 'none';
    foodInfo.style.display = 'block';
    foodTitle.textContent = title;
    foodDesc.textContent = desc;
  });
});

// 탭 전환 시 내용 초기화 함수
function resetContent() {
  // BEER 초기화
  if (defaultText) defaultText.style.display = 'block';
  if (beerInfo) beerInfo.style.display = 'none';
  if (beerTitle) beerTitle.textContent = '';
  if (beerDesc) beerDesc.textContent = '';

  // FOOD 초기화
  if (foodDefaultText) foodDefaultText.style.display = 'block';
  if (foodInfo) foodInfo.style.display = 'none';
  if (foodTitle) foodTitle.textContent = '';
  if (foodDesc) foodDesc.textContent = '';
}

// 초기 진입 시 BEER 탭 선택
document.querySelector(".tab[data-tab='Beer']").click();
