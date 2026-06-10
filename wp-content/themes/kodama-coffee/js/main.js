/* =============================================
   KODAMA COFFEE メインJS
   ※ 要素が存在しないページでも動くよう、
     すべて存在チェックを入れている
============================================= */

/* プリローダー（TOPのみ存在） */
(function () {
  const pl = document.getElementById('preloader');
  if (!pl) return;
  document.body.style.overflow = 'hidden';
  window.addEventListener('load', () => {
    setTimeout(() => {
      pl.classList.add('hidden');
      document.body.style.overflow = '';
    }, 2000);
  });
})();

/* 木漏れ日の光の筋（TOPヒーローのみ） */
(function () {
  const container = document.getElementById('lightRays');
  if (!container) return;
  const count = 8;
  for (let i = 0; i < count; i++) {
    const ray = document.createElement('div');
    ray.className = 'ray';
    const left = 5 + Math.random() * 90;
    const angleStart = -10 + Math.random() * 20;
    const angleEnd   = angleStart + (Math.random() - 0.5) * 8;
    const dur   = 4 + Math.random() * 6;
    const delay = -Math.random() * dur;
    const h     = 40 + Math.random() * 30;
    const w     = 1.2 + Math.random() * 2;
    ray.style.left   = left + '%';
    ray.style.height = h + '%';
    ray.style.width  = w + 'px';
    ray.style.setProperty('--angle-start', angleStart + 'deg');
    ray.style.setProperty('--angle-end',   angleEnd   + 'deg');
    ray.style.animationDuration = dur + 's';
    ray.style.animationDelay   = delay + 's';
    container.appendChild(ray);
  }
})();

/* カスタムカーソル */
(function () {
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');
  if (!cursor || !ring) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });
  function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();
})();

/* ナビのスクロール背景 */
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  });
})();

/* ヒーローのパララックス（TOPのみ） */
(function () {
  const heroBg = document.getElementById('heroBg');
  if (!heroBg) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroBg.style.transform = 'scale(1.05) translateY(' + (y * 0.3) + 'px)';
    }
  });
})();

/* 木漏れ日の光の粒（TOPヒーローのみ） */
(function () {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 28;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 4 + Math.random() * 12;
    const left = Math.random() * 100;
    const bottom = -5 + Math.random() * 20;
    const dur = 12 + Math.random() * 18;
    const delay = -Math.random() * dur;
    const drift = (Math.random() - 0.5) * 120;
    p.style.width  = size + 'px';
    p.style.height = size + 'px';
    p.style.left   = left + '%';
    p.style.bottom = bottom + '%';
    p.style.setProperty('--drift', drift + 'px');
    p.style.animationDuration = dur + 's';
    p.style.animationDelay = delay + 's';
    p.style.opacity = 0;
    container.appendChild(p);
  }
})();

/* CONCEPTセクションの浮遊粒子（TOP・コンセプトページ） */
(function () {
  const container = document.getElementById('conceptParticles');
  if (!container) return;
  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'cp';
    const size   = 3 + Math.random() * 9;
    const left   = Math.random() * 100;
    const bottom = Math.random() * 40;
    const dur    = 8 + Math.random() * 12;
    const delay  = -Math.random() * dur;
    const drift  = (Math.random() - 0.5) * 60;
    p.style.width  = size + 'px';
    p.style.height = size + 'px';
    p.style.left   = left + '%';
    p.style.bottom = bottom + 'px';
    p.style.setProperty('--cp-drift', drift + 'px');
    p.style.animationDuration = dur + 's';
    p.style.animationDelay   = delay + 's';
    p.style.opacity = 0;
    container.appendChild(p);
  }
})();

/* スクロール連動フェードイン（Intersection Observer） */
(function () {
  const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!targets.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  targets.forEach((el) => observer.observe(el));
})();

/* モバイルナビ開閉 */
(function () {
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  if (!navToggle || !navLinks) return;

  function openNav() {
    navLinks.classList.add('open');
    navToggle.classList.add('open');
    navToggle.textContent = '✕';
    navToggle.setAttribute('aria-label', 'メニューを閉じる');
    document.body.classList.add('nav-open');
  }
  function closeNav() {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.textContent = '☰';
    navToggle.setAttribute('aria-label', 'メニューを開く');
    document.body.classList.remove('nav-open');
  }

  navToggle.addEventListener('click', () => {
    navLinks.classList.contains('open') ? closeNav() : openNav();
  });
  navLinks.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', closeNav);
  });
})();

/* ページトップへ戻る */
(function () {
  const btt = document.getElementById('backToTop');
  if (!btt) return;
  window.addEventListener('scroll', () => {
    btt.classList.toggle('visible', window.scrollY > 400);
  });
  btt.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
