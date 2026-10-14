export const PHONE = '5582996180666';

export function whatsapp(message = 'Olá! Gostaria de agendar uma avaliação na Clínica Vida Bella.') {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}
