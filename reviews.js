{
  const reviews = document.querySelector('#reviews');
  const track = reviews.querySelector('.reviews-track');
  const slides = [...track.children];
  const controls = reviews.querySelector('.reviews-controls');
  const previous = controls.querySelector('[data-step="-1"]');
  const next = controls.querySelector('[data-step="1"]');
  const count = controls.querySelector('.reviews-count');
  const dialog = reviews.querySelector('.review-dialog');
  const dialogTitle = dialog.querySelector('#review-dialog-title');
  const enlarged = dialog.querySelector('img');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function layout() {
    const step = slides[1].offsetLeft - slides[0].offsetLeft;
    const first = Math.round(track.scrollLeft / step);
    const visible = Math.round(track.clientWidth / step);
    return { step, first, visible };
  }

  function updateControls() {
    const { first, visible } = layout();
    const last = Math.min(first + visible, slides.length);
    previous.disabled = first === 0;
    next.disabled = last === slides.length;
    const range = first + 1 === last ? String(last) : `${first + 1}–${last}`;
    const label = `${range} из ${slides.length}`;
    if (count.textContent !== label) count.textContent = label;
  }

  function move(direction) {
    const { step, first } = layout();
    track.scrollTo({
      left: (first + direction) * step,
      behavior: reducedMotion.matches ? 'auto' : 'smooth'
    });
  }

  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('scroll', updateControls, { passive: true });
  new ResizeObserver(updateControls).observe(track);

  for (const [index, slide] of slides.entries()) {
    const link = slide.querySelector('a');
    const image = link.querySelector('img');
    link.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || !dialog.showModal) return;
      event.preventDefault();
      dialogTitle.textContent = `Отзыв ${index + 1} из ${slides.length}`;
      enlarged.alt = image.alt;
      enlarged.src = image.src;
      dialog.showModal();
    });
  }

  controls.hidden = false;
  updateControls();
}
