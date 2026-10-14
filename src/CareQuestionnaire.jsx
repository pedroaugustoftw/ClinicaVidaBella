import React, { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ArrowRight, CalendarDays, Check, MessageCircle, UserRound, Waves, X } from 'lucide-react';
import { CARE_AREAS, CARE_GOALS, CARE_TIMING, GOAL_ICONS, buildCareMessage } from './care-questionnaire';
import { whatsapp } from './whatsapp';
import { assetUrl } from './assets';
import './care-questionnaire.css';

function OptionCard({ option, selected, name, onSelect }) {
  const Icon = option.icon;
  return <label className={`care-option${selected ? ' is-selected' : ''}`}>
    <input type="radio" name={name} value={option.label} checked={selected} onChange={() => onSelect(option.label)} />
    <span className="care-option-icon" aria-hidden="true"><Icon size={30} strokeWidth={1.25} /></span>
    <span className="care-option-copy"><strong>{option.label}</strong>{option.description && <small>{option.description}</small>}</span>
    {selected && <span className="care-option-check" aria-hidden="true"><Check size={12} strokeWidth={2.5} /></span>}
  </label>;
}

function QuestionStep({ options, value, onSelect, step }) {
  return <fieldset className={`care-options${step === 2 ? ' care-options-stacked' : ''}`} aria-labelledby="care-question-title">
    <legend className="care-sr-only">Selecione uma opção</legend>
    {options.map(option => <OptionCard key={option.label} option={option} selected={value === option.label} name={`care-step-${step}`} onSelect={onSelect} />)}
  </fieldset>;
}

function CareSummary({ answers }) {
  return <dl className="care-summary">{[
    ['Área de interesse', answers.area, UserRound],
    ['Meu objetivo', answers.goal, Waves],
    ['Quando gostaria de começar', answers.timing, CalendarDays],
  ].map(([label, value, Icon]) => <div key={label}><Icon size={27} strokeWidth={1.25} aria-hidden="true" /><div><dt>{label}</dt><dd>{value}</dd></div></div>)}</dl>;
}

const TITLES = ['Qual área você deseja cuidar?', 'O que você gostaria de melhorar?', 'Quando gostaria de começar?', 'Seu cuidado começa aqui.'];
const DESCRIPTIONS = [
  'Selecione a opção que mais combina com o seu momento.',
  'Escolha seu principal objetivo para que possamos orientar você.',
  'Essa informação nos ajuda a entender o seu momento.',
  'Com base nas suas respostas, nossa equipe poderá orientar você sobre os cuidados mais adequados aos seus objetivos.',
];

export function CareQuestionnaire({ open, onClose }) {
  const dialogRef = useRef(null);
  const titleRef = useRef(null);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState('forward');
  const [area, setArea] = useState('');
  const [goals, setGoals] = useState({});
  const [timing, setTiming] = useState('');
  const goal = goals[area] || '';
  const answers = { area, goal, timing };
  const value = [area, goal, timing][step];
  const options = step === 0 ? CARE_AREAS : step === 1
    ? (CARE_GOALS[area] || []).map((label, i) => ({ label, icon: GOAL_ICONS[i] }))
    : CARE_TIMING;

  useLayoutEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const opener = document.activeElement;
    const previousRootOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    titleRef.current?.focus({ preventScroll: true });
    return () => {
      dialog.close();
      document.documentElement.style.overflow = previousRootOverflow;
      document.body.style.overflow = previousBodyOverflow;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, [open]);

  useLayoutEffect(() => {
    if (open) {
      titleRef.current?.focus({ preventScroll: true });
      dialogRef.current.querySelector('.care-content')?.scrollTo(0, 0);
    }
  }, [step, open]);

  const select = choice => {
    if (step === 0) setArea(choice);
    if (step === 1) setGoals(previous => ({ ...previous, [area]: choice }));
    if (step === 2) setTiming(choice);
  };
  const navigate = next => {
    if (next > step && !value) return;
    setDirection(next > step ? 'forward' : 'backward');
    setStep(Math.max(0, Math.min(3, next)));
  };
  const trapFocus = event => {
    if (event.key !== 'Tab') return;
    const dialog = dialogRef.current;
    const controls = [...dialog.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled), [tabindex="0"]')].filter(element => {
      if (!element.getClientRects().length) return false;
      if (element.type !== 'radio') return true;
      const group = [...dialog.querySelectorAll(`input[name="${element.name}"]`)];
      return element === (group.find(input => input.checked) || group[0]);
    });
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && (document.activeElement === first || document.activeElement === titleRef.current)) {
      event.preventDefault(); last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first?.focus();
    }
  };

  return createPortal(<dialog ref={dialogRef} id="care-questionnaire" className="care-dialog" aria-labelledby="care-question-title" aria-describedby="care-step-description" aria-modal="true" onCancel={event => { event.preventDefault(); onClose(); }} onKeyDown={trapFocus} onClick={event => {
    if (event.target !== dialogRef.current) return;
    const bounds = dialogRef.current.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
  }}>
    <div className="care-modal">
      <div className="care-modal-header"><span className="care-step-count">{String(step + 1).padStart(2, '0')} de 04</span><div className="care-progress" role="progressbar" aria-label="Progresso do questionário" aria-valuemin={0} aria-valuemax={4} aria-valuenow={step + 1} aria-valuetext={`${step + 1} de 4 etapas`}><span style={{ width: `${(step + 1) * 25}%` }} /></div><button className="care-close" type="button" aria-label="Fechar questionário" onClick={onClose}><X size={22} strokeWidth={1.5} /></button></div>
      <div className={`care-content care-${direction}${step === 3 ? ' care-result' : ''}`} key={step}>
        {step === 3 && <img className="care-result-mark" src={assetUrl('/brand/favicon.svg')} alt="" />}
        <h2 className="care-title" id="care-question-title" ref={titleRef} tabIndex={-1}>{TITLES[step]}</h2>
        <p className="care-description" id="care-step-description">{DESCRIPTIONS[step]}</p>
        {step < 3 ? <QuestionStep options={options} value={value} step={step} onSelect={select} /> : <>
          <CareSummary answers={answers} />
          <a className="care-whatsapp" href={whatsapp(buildCareMessage(answers))} target="_blank" rel="noopener noreferrer"><MessageCircle size={19} aria-hidden="true" /><span>Conversar com a Vida Bella no WhatsApp</span><ArrowRight size={18} aria-hidden="true" /></a>
          <p className="care-result-note">Você pode revisar a mensagem antes de enviá-la pelo WhatsApp.</p>
        </>}
      </div>
      <div className={`care-actions${step === 0 ? ' care-actions-first' : ''}`}>
        {step > 0 && <button className="care-back" type="button" onClick={() => navigate(step - 1)}><ArrowLeft size={17} aria-hidden="true" /> Voltar</button>}
        {step < 3 && <button className="care-continue" type="button" disabled={!value} onClick={() => navigate(step + 1)}>Continuar <ArrowRight size={17} aria-hidden="true" /></button>}
      </div>
    </div>
  </dialog>, document.body);
}
