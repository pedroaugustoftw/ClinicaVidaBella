import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ArrowRight, Menu, X, MapPin, Clock, Phone, Instagram, MessageCircle, ShieldCheck, Heart, Check, ChevronDown, Leaf, Flower2 } from 'lucide-react';
import './style.css';
import './refinements.css';
import './gallery.css';
import './identity.css';
import './photo-composition.css';
import { BotanicalAccent, PhotoComposition } from './PhotoComposition';
import { CareQuestionnaire } from './CareQuestionnaire';
import { whatsapp } from './whatsapp';
import { assetUrl } from './assets';
import './hero-reference.css';
import { useScrollGallery } from './useScrollGallery';
import { ScrollGalleryNavigation } from './ScrollGalleryNavigation';

const INSTAGRAM = 'https://www.instagram.com/clinicavidabella/';
const treatments = [
  { num: '01', name: 'Harmonização facial', description: 'Um olhar individual para os traços, as proporções e a sua expressão.', image: '/images/resultado-4-original.webp', fit: 'contain', alt: 'Publicação da Dra. Mariana Rocha sobre perfil harmônico, com registros antes e depois' },
  { num: '02', name: 'Limpeza de pele', description: 'Atenção à sua pele, em um momento dedicado ao cuidado e ao bem-estar.', image: '/images/instagram/high-resolution/post-10.jpg', alt: 'Registro de limpeza de pele publicado no perfil da Clínica Vida Bella' },
  { num: '03', name: 'Depilação a laser', description: 'Converse com a equipe sobre as possibilidades de cuidado para você.', image: '/images/instagram/high-resolution/post-05.jpg', fit: 'contain', alt: 'Publicação da Clínica Vida Bella sobre depilação a laser' },
];
const cases = [
  { name: 'Full Face', category: 'CUIDADO FACIAL', description: 'O cuidado com o rosto começa pela escuta. Um plano pensado para os traços e os objetivos de cada pessoa.', image: '/images/resultado-1-original.webp', alt: 'Publicação original com comparação facial antes e depois de Full Face, com os olhos ocultados' },
  { name: 'Cuidado capilar', category: 'SAÚDE & AUTOESTIMA', description: 'Acompanhamento individual para compreender as necessidades do couro cabeludo e as possibilidades de tratamento.', image: '/images/resultado-2-original.webp', alt: 'Publicação original com registros antes e depois de tratamento capilar' },
  { name: 'Glúteo UP MR', category: 'CUIDADO CORPORAL', description: 'A naturalidade também está no cuidado com o corpo. Conheça o método apresentado pela Dra. Mariana Rocha.', image: '/images/resultado-3-original.webp', alt: 'Publicação original sobre o método Glúteo UP MR, com registros corporais antes e depois' },
  { name: 'Perfil harmônico', category: 'HARMONIZAÇÃO FACIAL', description: 'Um olhar para o conjunto: proporções, individualidade e o equilíbrio dos seus traços.', image: '/images/resultado-4-original.webp', alt: 'Publicação original com comparação do perfil facial antes e depois, com os olhos ocultados' },
];
const reviews = [
  ['Emanuelle Santos', 'Ambiente confortável, relaxante e lindo! Profissionais maravilhosas, desde a recepção ao fim do atendimento.'],
  ['Joyciara Alves', 'Clínica maravilhosa, super recomendo! O atendimento é maravilhoso e as meninas são super atenciosas.'],
  ['Bianca Maria', 'Ambiente maravilhoso, e profissionais incríveis! Super indico.'],
];
const questions = [
  ['Como posso agendar uma avaliação?', 'Clique em um dos botões de WhatsApp desta página para conversar diretamente com a equipe.'],
  ['Como saber qual tratamento é indicado?', 'A indicação depende de uma avaliação individualizada, considerando suas necessidades e as orientações profissionais.'],
  ['Onde fica a Clínica Vida Bella?', 'No Empresarial Metropolitan, Avenida Deputada Ceci Cunha, 1179, térreo, sala 9, em Arapiraca, Alagoas.'],
  ['Os resultados são iguais para todas as pessoas?', 'Não. Os resultados variam conforme características individuais, procedimento e acompanhamento profissional.'],
];
function Brand({ light = false, footer = false }) {
  return <span className="brand-lockup"><img src={assetUrl(`/brand/vida-bella${footer ? '-footer' : light ? '-white' : ''}.svg`)} alt="Vida Bella" /><span>CLÍNICA DE ESTÉTICA</span></span>;
}
function WhatsAppLink({ children, message, className = 'btn primary' }) {
  return <a className={className} href={whatsapp(message)} target="_blank" rel="noreferrer">{children}<ArrowUpRight size={18} /></a>;
}
function App() {
  const gallery = useScrollGallery();
  const [menu, setMenu] = useState(false);
  const [faq, setFaq] = useState(-1);
  const [name, setName] = useState('');
  const [service, setService] = useState('Harmonização facial');
  const [careOpen, setCareOpen] = useState(false);
  return <>
    <header>
      <a href="#inicio" className="brand" aria-label="Clínica Vida Bella início"><Brand /></a>
      <nav id="main-nav" className={menu ? 'nav open' : 'nav'}>
        {[['sobre', 'A clínica'], ['tratamentos', 'Tratamentos'], ['casos', 'Resultados'], ['equipe', 'A médica'], ['contato', 'Contato']].map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{label}</a>)}
      </nav>
      <div className="header-actions"><a className="header-instagram" href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram da Clínica Vida Bella"><Instagram size={21} /></a><WhatsAppLink className="header-cta">Agendar avaliação</WhatsAppLink></div>
      <button className="mobile-menu" aria-label={menu ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menu} aria-controls="main-nav" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
    </header>
    <main className="gallery-stage">
      <section className="hero" id="inicio">
        <div className="hero-content">
          <div className="eyebrow"><span className="eyebrow-line" /> ESTÉTICA, CUIDADO & BEM-ESTAR</div>
          <h1>A beleza de ser <em>você mesma.</em></h1>
          <p>Um espaço dedicado à sua autoestima, com acolhimento, atenção aos detalhes e cuidado que respeita sua individualidade.</p>
          <div className="hero-actions"><button type="button" className="btn primary hero-questionnaire" aria-haspopup="dialog" aria-expanded={careOpen} aria-controls="care-questionnaire" onClick={() => setCareOpen(true)}>Descubra seu cuidado ideal <ArrowUpRight size={18} /></button><WhatsAppLink className="btn hero-direct">Agendar minha avaliação</WhatsAppLink><a className="text-link" href="#tratamentos">Conhecer tratamentos <ArrowRight size={17} /></a></div>
          <div className="hero-values">{[[Leaf, 'Tratamentos', 'personalizados'], [Flower2, 'Beleza natural', 'e harmoniosa'], [Heart, 'Atendimento', 'humanizado'], [ShieldCheck, 'Ambiente seguro', 'e acolhedor']].map(([Icon, line1, line2]) => <div key={line1}><Icon size={28} strokeWidth={1.2} aria-hidden="true" /><span>{line1}<br />{line2}</span></div>)}</div>
        </div>
        <div className="hero-photo photo-composition photo-cutout"><BotanicalAccent /><img src={assetUrl('/images/mariana-rocha-cutout.webp')} alt="Dra. Mariana Rocha, médica e CEO da Clínica Vida Bella" fetchPriority="high" /><div className="photo-tag"><span>DRA. MARIANA ROCHA</span><small>Um olhar atento à sua beleza.</small></div></div>
      </section>
      <section className="intro section" id="sobre">
        <div className="intro-left"><div className="eyebrow">01 / NOSSA ESSÊNCIA</div><h2>Mais do que estética.<br /><em>Um cuidado que acolhe.</em></h2><p>Na Vida Bella, sentir-se bem consigo mesma faz parte do cuidado. Atenção individualizada, escuta e uma visão natural da beleza.</p><a className="under-link" href="#instagram">Entre no nosso universo <ArrowUpRight size={17} /></a></div>
        <PhotoComposition className="essence-photo" src={assetUrl('/images/instagram/high-resolution/post-09.jpg')} alt="Recepção e ambiente da Clínica Vida Bella em publicação do Instagram" caption={<><span className="photo-badge"><MapPin size={17} /></span><span className="photo-caption-label">Arapiraca, Alagoas</span><span className="photo-caption-rule" /><strong>O cuidado começa<br />no acolhimento.</strong></>} />
      </section>
      <section className="services section" id="tratamentos">
        <div className="section-heading"><div><div className="eyebrow">02 / O QUE FAZEMOS</div><h2>Cuidados pensados<br /><em>para você.</em></h2></div><p>Da pele ao bem-estar, um plano de cuidado que começa com você. A indicação de cada tratamento é definida em avaliação.</p></div>
        <div className="service-grid">{treatments.map(t => <article className="service-card" key={t.num}><div className={`service-img ${t.fit === 'contain' ? 'original-publication' : ''}`}><PhotoComposition src={t.image} alt={t.alt} preserve={t.fit === 'contain'} caption={<><span className="photo-caption-label">Cuidado individualizado</span><strong>Beleza com<br />naturalidade.</strong></>} /><span>{t.num}</span></div><div className="service-body"><h3>{t.name}</h3><p>{t.description}</p><a href={whatsapp(`Olá! Gostaria de saber mais sobre ${t.name.toLowerCase()} na Clínica Vida Bella.`)} target="_blank" rel="noreferrer" aria-label={`Consultar ${t.name}`}><ArrowUpRight size={20} /></a></div></article>)}</div>
        <div className="service-note">Fotografias e publicações da clínica. Cada cuidado é individual.</div>
      </section>
      <section className="feature" id="resultados">
        <PhotoComposition className="feature-image" src={assetUrl('/images/instagram/high-resolution/post-12.jpg')} alt="Registro de uma experiência de cuidado com a pele na Clínica Vida Bella" caption={<><span className="photo-badge"><Heart size={17} /></span><span className="photo-caption-label">Seu momento de cuidado</span><span className="photo-caption-rule" /><strong>Beleza começa<br />no bem-estar.</strong></>} />
        <div className="feature-content"><div className="eyebrow">03 / NOSSA FILOSOFIA</div><h2>Resultados que começam com <em>uma boa conversa.</em></h2><p>Cada pele tem sua história. Antes de qualquer procedimento, o primeiro passo é compreender seus objetivos e esclarecer possibilidades, cuidados e expectativas.</p><div className="feature-points"><div><ShieldCheck size={22} /><span>Avaliação individualizada</span></div><div><Heart size={22} /><span>Naturalidade como prioridade</span></div><div><Check size={22} /><span>Orientação e acompanhamento</span></div></div><a className="under-link" href="#casos">Conhecer histórias de cuidado <ArrowUpRight size={18} /></a></div>
      </section>
      <section className="results-gallery" id="casos" aria-label="Registros de resultados">
        {cases.map((item, i) => <article className="result-card" key={item.name}>
          <div className="result-copy"><div className="eyebrow">04 / HISTÓRIAS DE CUIDADO</div><div className="result-counter"><span>{String(i + 1).padStart(2, '0')}</span><span>/ 04</span></div><span className="result-category">{item.category}</span><h2>{item.name.includes(' ') ? <>{item.name.split(' ').slice(0, -1).join(' ')}<br /><em>{item.name.split(' ').at(-1)}.</em></> : item.name}</h2><p>{item.description}</p><WhatsAppLink message={`Olá! Gostaria de conversar sobre ${item.name} e agendar uma avaliação.`}>Conversar sobre este cuidado</WhatsAppLink><div className="result-disclaimer">Registros individuais. Os resultados variam de pessoa para pessoa e não representam garantia de resultado.</div></div>
          <PhotoComposition className="result-visual" src={item.image} alt={item.alt} preserve caption="Publicação original · @marianarocha_dra" />
        </article>)}
      </section>
      <section className="doctor section" id="equipe">
        <div className="doctor-copy"><div className="eyebrow">05 / QUEM CUIDA DE VOCÊ</div><h2>Conheça a<br /><em>Drª Mariana Rocha.</em></h2><div className="doctor-rule" /><p className="doctor-role">MÉDICA, FISIOTERAPEUTA & CEO DA VIDA BELLA</p><div className="doctor-bio"><p>Olá! Sou Dra Mariana Rocha, médica e fisioterapeuta especialista em dermato. Atuo na área da dermato e estética há 14 anos, desde que fundei a Clínica Vida Bella, primeira clínica de estética avançada do interior de Alagoas.</p><p>Contamos com quase 20.000 clientes cadastradas e milhares de procedimentos realizados, onde o resgate da autoestima sempre foi nosso principal objetivo.</p><p>Acreditamos que elevando a autoestima e o amor próprio, a mulher melhora sua qualidade de vida e é mais feliz.</p><p>Pensando nisso, desenvolvemos protocolos exclusivos, voltados para o aumento da beleza com naturalidade e segurança.</p></div><span className="credential">CRM-AL 9146</span><WhatsAppLink className="under-link" message="Olá! Gostaria de agendar uma avaliação com a Dra. Mariana Rocha.">Agendar avaliação</WhatsAppLink><a className="doctor-instagram" href="https://www.instagram.com/marianarocha_dra/" target="_blank" rel="noreferrer"><Instagram size={15} /> @marianarocha_dra</a></div>
        <PhotoComposition className="doctor-photo" src={assetUrl('/images/mariana-rocha-original.webp')} alt="Retrato oficial da Dra. Mariana Rocha" caption={<><span className="photo-caption-label">Drª Mariana Rocha</span><span className="photo-caption-rule" /><strong>Cuidado. Escuta.<br />Naturalidade.</strong></>} />
      </section>
      <section className="reviews section" id="avaliacoes">
        <div className="section-heading"><div><div className="eyebrow">06 / EXPERIÊNCIAS</div><h2>O carinho de quem<br /><em>já esteve aqui.</em></h2></div><p>Palavras de quem viveu o acolhimento e o cuidado da Vida Bella.</p></div>
        <div className="review-grid">{reviews.map(([author, quote]) => <div className="review-card" key={author}><div className="stars" aria-label="5 estrelas">★★★★★</div><blockquote>“{quote}”</blockquote><div className="review-name">{author}<small>Trecho de avaliação pública</small></div></div>)}</div>
        <a className="under-link review-source" href="https://dentmap.com.br/dentistas/arapiraca/clinica-vida-bella-9aae667b" target="_blank" rel="noreferrer">Ver avaliações na fonte <ArrowUpRight size={16} /></a>
      </section>
      <section className="social section" id="instagram">
        <div className="social-heading"><div className="eyebrow">07 / NOSSO UNIVERSO</div><h2>De perto,<br /><em>a Vida Bella.</em></h2><p>O espaço, as pessoas e os pequenos detalhes que fazem parte do nosso cuidado.</p><a className="under-link" href={INSTAGRAM} target="_blank" rel="noreferrer"><Instagram size={16} /> @clinicavidabella <ArrowUpRight size={16} /></a></div>
        <div className="social-grid">{[
          ['/images/instagram/high-resolution/post-08.jpg', 'Nosso espaço', 'https://www.instagram.com/dailygisely/reel/DPha-GtDF6x/'],
          ['/images/instagram/high-resolution/post-02.jpg', 'Conheça a Dra. Mariana', 'https://www.instagram.com/clinicavidabella/reel/DY0cUpHSqpr/'],
          ['/images/instagram/high-resolution/post-01.jpg', 'Momentos de cuidado', 'https://www.instagram.com/dailygisely/reel/DZcrKRyssZU/'],
        ].map(([image, label, link]) => <a href={link} target="_blank" rel="noreferrer" className="social-card" key={image}><img src={assetUrl(image)} alt={`${label}: publicação no perfil da Clínica Vida Bella`} /><span>{label}<ArrowUpRight size={17} /></span></a>)}</div>
      </section>
      <section className="faq section" id="duvidas">
        <div><div className="eyebrow">08 / DÚVIDAS FREQUENTES</div><h2>Vamos esclarecer<br /><em>suas dúvidas?</em></h2></div>
        <div className="faq-items">{questions.map(([q, a], i) => <div className="faq-item" key={q}><button onClick={() => setFaq(faq === i ? -1 : i)} aria-expanded={faq === i} aria-controls={`faq-answer-${i}`}>{q}<ChevronDown size={19} className={faq === i ? 'rotate' : ''} /></button><div id={`faq-answer-${i}`} className={`faq-answer${faq === i ? ' is-open' : ''}`} aria-hidden={faq !== i}><div><p>{a}</p></div></div></div>)}</div>
      </section>
      <section className="contact" id="contato">
        <div className="contact-main"><div className="eyebrow">09 / SEU PRÓXIMO PASSO</div><h2>Seu momento<br /><em>começa aqui.</em></h2><p>Conte para nossa equipe o que você procura. Estamos aqui para ajudar você a dar o primeiro passo.</p><form onSubmit={e => { e.preventDefault(); window.open(whatsapp(`Olá! Meu nome é ${name.trim() || 'Cliente'} e gostaria de agendar uma avaliação sobre ${service.toLowerCase()}.`), '_blank', 'noopener,noreferrer'); }}><label htmlFor="name">Seu nome</label><input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Como podemos chamar você?" required /><label htmlFor="service">Tratamento de interesse</label><select id="service" value={service} onChange={e => setService(e.target.value)}>{['Harmonização facial', 'Limpeza de pele', 'Depilação a laser', 'Cuidado capilar', 'Cuidado corporal', 'Quero orientação da equipe'].map(option => <option key={option}>{option}</option>)}</select><button type="submit" className="btn primary">Continuar pelo WhatsApp <ArrowUpRight size={18} /></button></form></div>
        <div className="contact-details"><div className="contact-detail"><Phone size={21} /><div><span>WHATSAPP E TELEFONE</span><a href={whatsapp()} target="_blank" rel="noreferrer">(82) 99618-0666</a></div></div><div className="contact-detail"><MapPin size={21} /><div><span>ONDE ESTAMOS</span><p>Empresarial Metropolitan, Av. Deputada Ceci Cunha, 1179, térreo, sala 9 · Arapiraca, AL</p><a className="small-link" href="https://www.google.com/maps/search/?api=1&query=Clinica+Vida+Bella+Arapiraca" target="_blank" rel="noreferrer">Ver no Google Maps ↗</a></div></div><div className="contact-detail"><Clock size={21} /><div><span>HORÁRIOS DE ATENDIMENTO</span><p>Segunda a sexta · 09h às 19h<br />Sábado · 09h às 13h</p></div></div><a className="contact-social" href={INSTAGRAM} target="_blank" rel="noreferrer"><Instagram size={18} /> Acompanhe a Vida Bella <ArrowUpRight size={17} /></a><div className="contact-photo"><img src={assetUrl('/images/instagram/high-resolution/post-08.jpg')} alt="Ambiente real da Clínica Vida Bella" /></div></div>
      </section>
      <footer id="encerramento"><div className="footer-brand"><Brand footer /></div><p>Beleza com naturalidade.<br /><em>Cuidado em cada detalhe.</em></p><a className="under-link footer-social" href={INSTAGRAM} target="_blank" rel="noreferrer"><Instagram size={17} /> @clinicavidabella <ArrowUpRight size={17} /></a><div className="footer-bottom"><span>© {new Date().getFullYear()} Clínica Vida Bella · Arapiraca, AL.</span><span>Conteúdo visual da clínica e de suas publicações.</span></div></footer>
    </main>
    <ScrollGalleryNavigation {...gallery} />
    <CareQuestionnaire open={careOpen} onClose={() => setCareOpen(false)} />
    <a className="floating-whatsapp" href={whatsapp()} target="_blank" rel="noreferrer" aria-label="Conversar pelo WhatsApp"><MessageCircle size={25} /></a>
  </>;
}
createRoot(document.getElementById('root')).render(<App />);
