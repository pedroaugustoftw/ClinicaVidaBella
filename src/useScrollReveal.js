import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches || !('IntersectionObserver' in window)) return;
    const nodes = [...document.querySelectorAll(
      '.intro > *, .section-heading > *, .service-card, .feature > *, .result-card > *, .doctor > *, .review-card, .social > *, .faq > *, .contact > *'
    )];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        target.classList.remove('reveal-pending');
        observer.unobserve(target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -32px 0px' });
    nodes.forEach(node => {
      node.classList.add('scroll-reveal');
      // Keep initially visible content steady and reveal later columns in sequence.
      if (node.getBoundingClientRect().top < window.innerHeight - 32) return;
      const position = [...node.parentElement.children].indexOf(node);
      node.style.setProperty('--reveal-delay', `${Math.min(position, 2) * 100}ms`);
      node.classList.add('reveal-pending');
      observer.observe(node);
    });
    const showAll = () => {
      if (!reduced.matches) return;
      observer.disconnect();
      nodes.forEach(node => node.classList.remove('reveal-pending'));
    };
    reduced.addEventListener('change', showAll);
    return () => {
      observer.disconnect();
      reduced.removeEventListener('change', showAll);
      nodes.forEach(node => {
        node.classList.remove('scroll-reveal', 'reveal-pending');
        node.style.removeProperty('--reveal-delay');
      });
    };
  }, []);
}
