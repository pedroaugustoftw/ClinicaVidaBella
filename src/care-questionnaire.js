import { CalendarDays, Ellipsis, Flower2, Heart, Search, ShieldCheck, Sparkles, UserRound, Waves, Zap } from 'lucide-react';

export const CARE_AREAS = [
  { label: 'Estética facial', description: 'Cuidado com a pele e seus objetivos.', icon: UserRound },
  { label: 'Estética corporal', description: 'Atenção ao corpo e ao bem-estar.', icon: Heart },
  { label: 'Rejuvenescimento', description: 'Prevenção e cuidado com o tempo.', icon: Flower2 },
  { label: 'Ainda não sei', description: 'Conheça as possibilidades de cuidado.', icon: Ellipsis },
];

export const CARE_GOALS = {
  'Estética facial': ['Textura e aparência da pele', 'Manchas', 'Linhas de expressão', 'Cuidados preventivos'],
  'Estética corporal': ['Contorno corporal', 'Flacidez', 'Textura da pele', 'Bem-estar'],
  'Rejuvenescimento': ['Suavizar sinais de envelhecimento', 'Melhorar a aparência da pele', 'Prevenção', 'Orientação profissional'],
  'Ainda não sei': ['Conhecer os tratamentos', 'Melhorar minha autoestima', 'Cuidados personalizados', 'Avaliação profissional'],
};

export const GOAL_ICONS = [Waves, Sparkles, Heart, ShieldCheck];

export const CARE_TIMING = [
  { label: 'O quanto antes', icon: Zap },
  { label: 'Nas próximas semanas', icon: CalendarDays },
  { label: 'Estou pesquisando', icon: Search },
];

export function buildCareMessage({ area, goal, timing }) {
  return `Olá! Conheci a Vida Bella pelo site e respondi ao questionário.\n\nÁrea de interesse: ${area}\n\nMeu objetivo: ${goal}\n\nQuando gostaria de começar: ${timing}\n\nGostaria de saber mais e agendar uma avaliação.`;
}
