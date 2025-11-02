(function () {
  const track = document.querySelector('.gallery-track');
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  const prev = document.querySelector('.g-arrow.prev');
  const next = document.querySelector('.g-arrow.next');
  const dotsContainer = document.querySelector('.gallery-dots');

  let slidesPerView = getSlidesPerView();
  let index = 0;
  let autoplayTimer = null;
  const total = items.length;

  // build dots
  function buildDots() {
    dotsContainer.innerHTML = '';
    const pages = Math.max(1, Math.ceil(total / slidesPerView));
    for (let i = 0; i < pages; i++) {
      const btn = document.createElement('button');
      btn.dataset.page = i;
      if (i === 0) btn.classList.add('active');
      btn.addEventListener('click', () => { goTo(i); resetAutoplay(); });
      dotsContainer.appendChild(btn);
    }
  }

  function getSlidesPerView() {
    const w = window.innerWidth;
    if (w <= 700) return 1;
    if (w <= 1100) return 2;
    return 3;
  }

  function updateTrack() {
    slidesPerView = getSlidesPerView();
    const translateX = (index * (100 / slidesPerView)) + '%';
    track.style.transform = `translateX(-${translateX})`;

    const page = Math.floor(index / slidesPerView);
    const dots = Array.from(dotsContainer.children);
    dots.forEach((d, i) => d.classList.toggle('active', i === page));
  }

  function goTo(pageIndex) {
    index = pageIndex * slidesPerView;
    updateTrack();
  }

  next.addEventListener('click', () => {
    moveNext();
    resetAutoplay();
  });

  prev.addEventListener('click', () => {
    movePrev();
    resetAutoplay();
  });

  function moveNext() {
    index += slidesPerView;
    if (index >= total) index = 0; // 👈 loop back
    updateTrack();
  }

  function movePrev() {
    index -= slidesPerView;
    if (index < 0) {
      // 👈 go to last full slide set
      const remainder = total % slidesPerView;
      index = remainder === 0 ? total - slidesPerView : total - remainder;
    }
    updateTrack();
  }

  // autoplay
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      moveNext(); // 👈 use looping function
    }, 3500);
  }
  function stopAutoplay() { if (autoplayTimer) clearInterval(autoplayTimer); }
  function resetAutoplay() { stopAutoplay(); startAutoplay(); }

  // init
  function init() {
    buildDots();
    updateTrack();
    startAutoplay();
    window.addEventListener('resize', () => {
      setTimeout(() => { buildDots(); updateTrack(); }, 120);
    });
    const viewport = document.querySelector('.gallery-viewport');
    viewport.addEventListener('mouseenter', stopAutoplay);
    viewport.addEventListener('mouseleave', startAutoplay);
  }

  init();
})();
