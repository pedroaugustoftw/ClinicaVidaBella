import { useCallback, useLayoutEffect, useState } from 'react';

export const gallerySteps = [
  ['inicio', 'Boas-vindas'], ['sobre', 'Nossa essência'],
  ['tratamentos', 'Harmonização facial', 0],
  ['tratamentos', 'Limpeza de pele', 1],
  ['tratamentos', 'Depilação a laser', 2],
  ['resultados', 'Nossa filosofia'],
  ['casos', 'Full Face', undefined, 0],
  ['casos', 'Cuidado capilar', undefined, 1],
  ['casos', 'Glúteo UP MR', undefined, 2],
  ['casos', 'Perfil harmônico', undefined, 3],
  ['equipe', 'Quem cuida de você'],
  ['avaliacoes', 'Experiências'], ['instagram', 'Dentro da Vida Bella'], ['duvidas', 'Suas dúvidas'],
  ['contato', 'Seu momento'], ['encerramento', 'Vida Bella'],
];

export function useScrollGallery() {
  const [index, setIndex] = useState(0);
  const goTo = useCallback(next => {
    const bounded = Math.max(0, Math.min(gallerySteps.length - 1, next));
    window.scrollTo({ top: bounded * window.innerHeight, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }, []);
  useLayoutEffect(() => {
    const scenes = [...document.querySelectorAll('.gallery-stage > section, .gallery-stage > footer')];
    const treatments = [...document.querySelectorAll('.service-card')];
    const results = [...document.querySelectorAll('.result-card')];
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    document.documentElement.classList.add('gallery-enabled', 'gallery-fluid');
    scenes.forEach(scene => scene.classList.add('gallery-scene'));
    let visual = window.scrollY / window.innerHeight;
    let current = -1;
    let frame = 0;
    let touch = null;
    const paint = () => {
      frame = 0;
      const target = Math.max(0, Math.min(gallerySteps.length - 1, window.scrollY / window.innerHeight));
      visual = reduced.matches ? Math.round(target) : Math.abs(target - visual) < .001 ? target : visual + (target - visual) * .14;
      const lower = Math.floor(visual);
      const upper = Math.min(lower + 1, gallerySteps.length - 1);
      const mix = Math.max(0, Math.min(1, (visual - lower - .12) / .76));
      const eased = mix * mix * (3 - 2 * mix);
      const selected = eased < .5 ? lower : upper;
      if (current !== selected) { current = selected; setIndex(selected); }
      const weights = new Map();
      [[lower, 1 - eased], [upper, eased]].forEach(([position, weight]) => {
        const id = gallerySteps[position][0]; weights.set(id, (weights.get(id) || 0) + weight);
      });
      const styleNode = (node, opacity, active) => {
        node.style.opacity = String(opacity);
        node.style.visibility = opacity > .001 ? 'visible' : 'hidden';
        node.style.transform = reduced.matches ? 'none' : 'translateY(' + (1 - opacity) * 14 + 'px)';
        node.style.pointerEvents = active ? 'auto' : 'none';
        node.inert = !active;
        node.setAttribute('aria-hidden', String(!active));
      };
      scenes.forEach(scene => {
        const active = scene.id === gallerySteps[selected][0];
        scene.classList.toggle('scene-active', active);
        styleNode(scene, weights.get(scene.id) || 0, active);
      });
      const paintCards = (cards, column, className) => cards.forEach((card, position) => {
        const id = column === 2 ? 'tratamentos' : 'casos';
        let opacity = 0;
        [[lower, 1 - eased], [upper, eased]].forEach(([step, weight]) => {
          if (gallerySteps[step][0] === id && gallerySteps[step][column] === position) opacity += weight;
        });
        if (!weights.has(id)) opacity = position === 0 ? 1 : 0;
        const active = position === (gallerySteps[selected][column] ?? 0);
        card.classList.toggle(className, active);
        styleNode(card, opacity, active);
      });
      paintCards(treatments, 2, 'treatment-active');
      paintCards(results, 3, 'result-active');
      if (Math.abs(target - visual) > .001) frame = requestAnimationFrame(paint);
    };
    const update = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const canScroll = (scene, delta) => scene && ((delta > 0 && scene.scrollTop + scene.clientHeight < scene.scrollHeight - 2) || (delta < 0 && scene.scrollTop > 2));
    const blocked = () => document.querySelector('dialog[open], .nav.open');
    const onWheel = event => {
      if (blocked() || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
      if (canScroll(event.target.closest('.gallery-scene'), delta)) return;
      event.preventDefault(); window.scrollBy({ top: delta, behavior: 'instant' });
    };
    const onTouchStart = event => {
      touch = !blocked() && event.touches.length === 1 && !event.target.closest('input, select, textarea, button, a')
        ? { y: event.touches[0].clientY, scene: event.target.closest('.gallery-scene') } : null;
    };
    const onTouchMove = event => {
      if (!touch || blocked() || event.touches.length !== 1) return;
      const y = event.touches[0].clientY; const delta = touch.y - y; touch.y = y;
      if (canScroll(touch.scene, delta)) return;
      event.preventDefault(); window.scrollBy({ top: delta * 1.5, behavior: 'instant' });
    };
    const onTouchEnd = () => { touch = null; };
    const onKey = event => {
      if (blocked() || event.target.closest('input, select, textarea, button, [contenteditable="true"]')) return;
      const direction = { ArrowDown: 1, PageDown: 1, ArrowUp: -1, PageUp: -1, ' ': event.shiftKey ? -1 : 1 }[event.key];
      if (direction) { event.preventDefault(); goTo(current + direction); }
      if (event.key === 'Home' || event.key === 'End') { event.preventDefault(); goTo(event.key === 'Home' ? 0 : gallerySteps.length - 1); }
    };
    const fromHash = () => {
      const next = gallerySteps.findIndex(step => step[0] === location.hash.slice(1)); if (next >= 0) goTo(next);
    };
    const onAnchor = event => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor || !gallerySteps.some(step => step[0] === anchor.hash.slice(1))) return;
      event.preventDefault(); history.pushState(null, '', anchor.hash); fromHash();
    };
    const onResize = () => { window.scrollTo({ top: Math.max(0, current) * window.innerHeight, behavior: 'instant' }); update(); };
    paint(); fromHash();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('touchcancel', onTouchEnd);
    window.addEventListener('resize', onResize);
    window.addEventListener('popstate', fromHash);
    document.addEventListener('click', onAnchor);
    return () => {
      cancelAnimationFrame(frame); document.documentElement.classList.remove('gallery-enabled', 'gallery-fluid');
      window.removeEventListener('scroll', update); window.removeEventListener('wheel', onWheel); window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onTouchStart); window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd); window.removeEventListener('touchcancel', onTouchEnd);
      window.removeEventListener('resize', onResize); window.removeEventListener('popstate', fromHash); document.removeEventListener('click', onAnchor);
      [...scenes, ...treatments, ...results].forEach(node => { node.removeAttribute('inert'); node.removeAttribute('aria-hidden'); node.removeAttribute('style'); });
    };
  }, [goTo]);
  return { index, goTo };
}
