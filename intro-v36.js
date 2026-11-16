(() => {
  const intro = document.querySelector('.site-intro');
  if (!intro) return;

  const forceIntro = new URLSearchParams(location.search).has('intro');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const alreadySeen = sessionStorage.getItem('bcotn-intro-seen') === '1';
  let closing = false;
  let timer;

  const closeIntro = () => {
    if (closing) return;
    closing = true;
    clearTimeout(timer);
    sessionStorage.setItem('bcotn-intro-seen', '1');
    intro.classList.add('is-leaving');
    document.body.classList.remove('intro-active');
    window.setTimeout(() => intro.remove(), reducedMotion ? 220 : 800);
  };

  if (alreadySeen && !forceIntro) {
    intro.remove();
    return;
  }

  document.body.classList.add('intro-active');
  intro.addEventListener('click', closeIntro);
  intro.querySelector('.intro-skip')?.addEventListener('click', event => {
    event.stopPropagation();
    closeIntro();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeIntro();
  }, { once: true });

  timer = window.setTimeout(closeIntro, reducedMotion ? 1600 : 7200);
})();
