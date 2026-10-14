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
    window.scrollTo({ top: bounded * window.innerHeight, behavior: 'instant' });
    setIndex(bounded);
  }, []);

  useLayoutEffect(() => {
    const scenes = [...document.querySelectorAll('.gallery-stage > section, .gallery-stage > footer')];
    document.documentElement.classList.add('gallery-enabled');
    let current = 0;
    let lockedUntil = 0;
    let accumulated = 0;
    let lastWheel = 0;
    let frame = 0;
    let touch;
    const setScene = next => {
      current = Math.max(0, Math.min(gallerySteps.length - 1, next));
      setIndex(current);
    };
    const readScroll = () => {
      setScene(Math.round(window.scrollY / window.innerHeight));
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(readScroll); };
    const jump = next => {
      const bounded = Math.max(0, Math.min(gallerySteps.length - 1, next));
      if (bounded === current) return;
      lockedUntil = performance.now() + 950;
      accumulated = 0;
      goTo(bounded);
      current = bounded;
    };
    const onWheel = event => {
      if (document.querySelector('dialog[open]')) return;
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (document.querySelector('.nav.open')) return;
      const scene = scenes.find(node => node.id === gallerySteps[current][0]);
      // Taller scenes retain their own scrolling before advancing the gallery.
      if (scene && scene.contains(event.target)) {
        const canScrollDown = scene.scrollTop + scene.clientHeight < scene.scrollHeight - 2;
        if ((event.deltaY > 0 && canScrollDown) || (event.deltaY < 0 && scene.scrollTop > 2)) return;
      }
      event.preventDefault();
      const now = performance.now();
      if (now < lockedUntil) return;
      if (now - lastWheel > 180 || Math.sign(accumulated) !== Math.sign(event.deltaY)) accumulated = 0;
      lastWheel = now;
      accumulated += event.deltaY * (event.deltaMode === 1 ? 16 : 1);
      if (Math.abs(accumulated) >= 35) jump(current + Math.sign(accumulated));
    };
    const onKey = event => {
      if (document.querySelector('dialog[open]')) return;
      if (event.target.closest('input, select, textarea, button, [contenteditable="true"]')) return;
      const direction = { ArrowDown: 1, PageDown: 1, ArrowUp: -1, PageUp: -1, ' ': event.shiftKey ? -1 : 1 }[event.key];
      if (direction) { event.preventDefault(); jump(current + direction); }
      if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault(); jump(event.key === 'Home' ? 0 : gallerySteps.length - 1);
      }
    };
    const onTouchStart = event => {
      if (document.querySelector('dialog[open]')) { touch = null; return; }
      touch = event.touches.length === 1 && !event.target.closest('input, select, textarea, button, a') && !document.querySelector('.nav.open')
        ? { y: event.touches[0].clientY, scene: event.target.closest('.gallery-scene'), captured: false }
        : null;
    };
    const onTouchMove = event => {
      if (document.querySelector('dialog[open]')) { touch = null; return; }
      if (!touch || event.touches.length !== 1) return;
      const delta = touch.y - event.touches[0].clientY;
      const scene = touch.scene;
      if (!touch.captured && scene && ((delta > 0 && scene.scrollTop + scene.clientHeight < scene.scrollHeight - 2) || (delta < 0 && scene.scrollTop > 2))) {
        touch = null;
        return;
      }
      touch.captured = true;
      touch.delta = delta;
      event.preventDefault();
    };
    const onTouchEnd = () => {
      if (document.querySelector('dialog[open]')) { touch = null; return; }
      if (touch?.captured && Math.abs(touch.delta) > 45 && performance.now() >= lockedUntil) jump(current + Math.sign(touch.delta));
      touch = null;
    };
    const onAnchor = event => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;
      const target = gallerySteps.findIndex(step => step[0] === anchor.hash.slice(1));
      if (target < 0) return;
      event.preventDefault();
      history.pushState(null, '', anchor.hash);
      jump(target);
    };
    const fromHash = () => {
      const target = gallerySteps.findIndex(step => step[0] === location.hash.slice(1));
      if (target >= 0) jump(target);
    };
    const onResize = () => goTo(current);
    scenes.forEach(scene => scene.classList.add('gallery-scene'));
    readScroll();
    fromHash();
    window.addEventListener('scroll', onScroll, { passive: true });
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
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove('gallery-enabled');
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('popstate', fromHash);
      document.removeEventListener('click', onAnchor);
      scenes.forEach(scene => { scene.removeAttribute('inert'); scene.removeAttribute('aria-hidden'); });
    };
  }, [goTo]);

  useLayoutEffect(() => {
    const [id, , treatment, result] = gallerySteps[index];
    document.querySelectorAll('.gallery-scene').forEach(scene => {
      const active = scene.id === id;
      if (!active && scene.contains(document.activeElement)) document.activeElement.blur();
      scene.classList.toggle('scene-active', active);
      scene.inert = !active;
      scene.setAttribute('aria-hidden', String(!active));
      if (!active) scene.scrollTop = 0;
    });
    document.querySelectorAll('.service-card').forEach((card, position) => {
      const active = position === (treatment ?? 0);
      card.classList.toggle('treatment-active', active);
      card.inert = !active;
      card.setAttribute('aria-hidden', String(!active));
    });
    document.querySelectorAll('.result-card').forEach((card, position) => {
      const active = position === (result ?? 0);
      card.classList.toggle('result-active', active);
      card.inert = !active;
      card.setAttribute('aria-hidden', String(!active));
    });
  }, [index]);

  return { index, goTo };
}
