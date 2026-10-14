import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { gallerySteps } from './useScrollGallery';

export function ScrollGalleryNavigation({ index, goTo }) {
  return <>
    <div className="gallery-track" aria-hidden="true" style={{ height: `${gallerySteps.length * 100}vh` }} />
    <div className="gallery-navigation">
      <div className="gallery-caption"><span>{String(index + 1).padStart(2, '0')} <i>/ {String(gallerySteps.length).padStart(2, '0')}</i></span><span aria-live="polite" aria-atomic="true">{gallerySteps[index][1]}</span></div>
      <nav className="gallery-dots" aria-label="Cenas da página">{gallerySteps.map(([id, label], position) => <button key={`${id}-${position}`} aria-label={`Ir para ${label}`} aria-current={position === index ? 'step' : undefined} onClick={() => goTo(position)}><span /></button>)}</nav>
      <div className="gallery-controls"><span>Role para explorar</span><button aria-label="Cena anterior" disabled={index === 0} onClick={() => goTo(index - 1)}><ArrowUp size={16}/></button><button aria-label="Próxima cena" disabled={index === gallerySteps.length - 1} onClick={() => goTo(index + 1)}><ArrowDown size={16}/></button></div>
    </div>
  </>;
}
