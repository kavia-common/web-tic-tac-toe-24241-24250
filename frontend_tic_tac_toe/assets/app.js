(function () {
  'use strict';

  const monthBtn = document.querySelector('.calendar__title--month');
  const yearBtn = document.querySelector('.calendar__title--year');
  const prevBtn = document.querySelector('.calendar__nav--prev');
  const nextBtn = document.querySelector('.calendar__nav--next');

  function toggleAriaExpanded(btn) {
    if (!btn) return;
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
  }

  monthBtn && monthBtn.addEventListener('click', () => toggleAriaExpanded(monthBtn));
  yearBtn && yearBtn.addEventListener('click', () => toggleAriaExpanded(yearBtn));

  // Simple keyboard navigation scaffold
  document.addEventListener('keydown', (e) => {
    if (!e.target.classList.contains('calendar__cell')) return;
    const cells = Array.from(document.querySelectorAll('.calendar__cell'));
    const idx = cells.indexOf(e.target);
    if (idx < 0) return;

    const cols = 7;
    let nextIndex = idx;

    switch (e.key) {
      case 'ArrowRight': nextIndex = Math.min(idx + 1, cells.length - 1); break;
      case 'ArrowLeft': nextIndex = Math.max(idx - 1, 0); break;
      case 'ArrowDown': nextIndex = Math.min(idx + cols, cells.length - 1); break;
      case 'ArrowUp': nextIndex = Math.max(idx - cols, 0); break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        e.target.classList.toggle('calendar__cell--selected');
        break;
      default: return;
    }

    cells[nextIndex].focus();
  });

  // Make grid cells focusable for keyboard nav
  document.querySelectorAll('.calendar__cell').forEach(c => {
    c.setAttribute('tabindex', '0');
  });

  // Demo handlers for prev/next (no data changes, just a subtle animation)
  function pulse(el) {
    if (!el) return;
    el.style.transform = 'scale(0.96)';
    setTimeout(() => (el.style.transform = ''), 120);
  }
  prevBtn && prevBtn.addEventListener('click', () => pulse(prevBtn));
  nextBtn && nextBtn.addEventListener('click', () => pulse(nextBtn));
})();
