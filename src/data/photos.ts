// ===================================================
// SUAS FOTOS E DADOS
// ===================================================

export interface Photo {
  id: number;
  src: string;
  caption: string;
}

export interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  quote?: string;
  src: string;
}

export interface FilmSlide {
  src: string;
  message: string;
  date?: string;
}

// ===================================================
// CARROSSEL — CAPÍTULO 1
// ===================================================
export const photos: Photo[] = [
  { id: 1, src: '/photos/couple.jpg', caption: 'Nossa conexão foi tão forte desde o primeiro encontro' },
  { id: 2, src: '/photos/wedding.jpg', caption: 'O começo de nossa história' },
  { id: 3, src: '/photos/rice.png', caption: 'Felicidade que não cabe no peito' },
  { id: 4, src: '/photos/mirror.jpg', caption: 'Juntos em cada momento' },
  { id: 5, src: '/photos/ring.jpg', caption: 'Para o resto da minha vida' },
];

// ===================================================
// TIMELINE — CAPÍTULO 2
// ===================================================
export const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    date: 'Começo de Tudo',
    title: 'Nosso Primeiro Encontro',
    description: 'A nossa conexão foi tão forte desde o primeiro encontro que eu sabia que tinha que te ter pro resto da minha vida.',
    src: '/photos/mirror.jpg',
  },
  {
    id: 2,
    date: 'A Construção do Amor',
    title: 'Crescendo Juntos',
    description: 'Nossa jornada começou a tomar forma. Cada momento e desafio nos uniu ainda mais e nos fez crescer como casal.',
    src: '/photos/ring.jpg',
  },
  {
    id: 3,
    date: '26 de Junho de 2020',
    title: 'Nosso Casamento',
    description: 'Através de um pouco de loucura e um pouco de pressão, nos unimos. Mas desde sempre eu sabia que era a coisa certa. Não tinha dúvidas que era para ser.',
    quote: '"Loucura, talvez. Mas era para ser."',
    src: '/photos/wedding.jpg',
  },
  {
    id: 4,
    date: '10 de Maio de 2022',
    title: 'Davi Chegou ao Mundo',
    description: 'O dia em que Davi nasceu, o nosso amor se multiplicou. Você se tornou ainda mais incrível diante dos meus olhos como mãe.',
    src: '/photos/couple.jpg',
  },
  {
    id: 5,
    date: 'Hoje e Sempre',
    title: '6 Anos de Amor',
    description: 'Temos passado momentos difíceis, complicados, decisões que nos fazem crescer como casal e família. O desejo de fazer as coisas acontecerem só aumenta.',
    quote: '"Você é o alicerce da nossa casa."',
    src: '/photos/rice.png',
  },
];

// ===================================================
// GALERIA — CAPÍTULO 4
// ===================================================
export const galleryPhotos: Array<Photo & { date: string }> = [
  { id: 1, src: '/photos/inicio5.png', caption: 'Onde tudo começou', date: 'O Início' },
  { id: 2, src: '/photos/mirror.jpg', caption: 'Primeiras memórias juntos', date: 'O Início' },
  { id: 3, src: '/photos/casamento.jpg', caption: 'O começo do nosso felizes para sempre', date: '26/06/2020' },
  { id: 4, src: '/photos/wedding.jpg', caption: 'O dia em que dissemos sim', date: '26/06/2020' },
  { id: 5, src: '/photos/ring.jpg', caption: 'Nossa união eternizada', date: '26/06/2020' },
  { id: 6, src: '/photos/csasmento.png', caption: 'Um dia inesquecível', date: '26/06/2020' },
  { id: 7, src: '/photos/casamentofoto2.png', caption: 'Celebrando o amor', date: '26/06/2020' },
  { id: 8, src: '/photos/rice.png', caption: 'Chuva de arroz e felicidade', date: '26/06/2020' },
  { id: 9, src: '/photos/fotocomdavi6.png', caption: 'Nosso maior presente, Davi', date: 'Davi' },
  { id: 10, src: '/photos/familia.png', caption: 'A nossa família maravilhosa', date: 'Nossa Família' },
  { id: 11, src: '/photos/viagm2.png', caption: 'Descobrindo o mundo juntos', date: 'Viagens' },
  { id: 12, src: '/photos/vigaem3.png', caption: 'Aventuras pelo caminho', date: 'Viagens' },
  { id: 13, src: '/photos/viagem7.png', caption: 'Colecionando momentos', date: 'Viagens' },
  { id: 14, src: '/photos/viagem89.png', caption: 'Sempre lado a lado', date: 'Viagens' },
  { id: 15, src: '/photos/festa7.png', caption: 'Comemorando a vida', date: 'Momentos' },
  { id: 16, src: '/photos/role5.png', caption: 'Diversão e sorrisos', date: 'Momentos' },
  { id: 17, src: '/photos/role10.png', caption: 'Nossa alegria contagiante', date: 'Momentos' },
  { id: 18, src: '/photos/foto1.jpg', caption: 'Meu amor eterno', date: 'Nós' },
  { id: 19, src: '/photos/2.jpg', caption: 'Cumplicidade infinita', date: 'Nós' },
  { id: 20, src: '/photos/foto5.png', caption: 'Cada detalhe com você', date: 'Nós' },
  { id: 21, src: '/photos/couple.jpg', caption: 'Você é a minha melhor escolha', date: 'Sempre' },
];

// ===================================================
// FILME — CAPÍTULO 6
// ===================================================
export const filmSlides: FilmSlide[] = [
  {
    src: '/photos/couple.jpg',
    message: 'O começo de nossa história todos já conhecem...',
  },
  {
    src: '/photos/wedding.jpg',
    message: 'Mas hoje é comemorado algo muito mais especial: nosso casamento.',
    date: '26 de Junho de 2020',
  },
  {
    src: '/photos/rice.png',
    message: 'Nossa família crescendo com a chegada do Davi.',
    date: '10 de Maio de 2022',
  },
  {
    src: '/photos/mirror.jpg',
    message: 'Você sempre sabe o que me dizer. Você é a cabeça dessa família.',
  },
  {
    src: '/photos/ring.jpg',
    message: 'Que essa homenagem seja a melhora dos próximos dias, anos e décadas que viveremos juntos.',
  },
  {
    src: '/photos/couple.jpg',
    message: 'Parabéns pra nós e para nosso amor.',
    date: 'Junho de 2026',
  },
];
