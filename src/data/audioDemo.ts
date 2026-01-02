import industryPlumbing from "@/assets/industry-plumbing.jpg";
import industryCleaning from "@/assets/industry-cleaning.jpg";
import officeImage from "@/assets/office-tech.jpg";

export interface TranscriptMessage {
  speaker: "ai" | "client";
  text: string;
  timestamp: number; // seconds
}

export interface AudioDemo {
  id: string;
  title: string;
  image: string;
  audioUrl: string;
  transcript: TranscriptMessage[];
}

export const audioDemos: AudioDemo[] = [
  {
    id: "encanamento",
    title: "Encanamento",
    image: industryPlumbing,
    audioUrl: "/audio/demo-encanamento.mp3",
    transcript: [
      { speaker: "ai", text: "Olá! Obrigado por ligar para a Plumber Pro Services. Meu nome é Ana, sou a assistente virtual. Como posso ajudá-lo hoje?", timestamp: 0 },
      { speaker: "client", text: "Oi, tenho um vazamento embaixo da pia da cozinha e preciso de alguém para consertar o mais rápido possível.", timestamp: 5 },
      { speaker: "ai", text: "Entendo, vazamentos podem ser urgentes. Deixe-me agendar um técnico para você. Qual é o seu CEP?", timestamp: 12 },
      { speaker: "client", text: "É 01310-100.", timestamp: 18 },
      { speaker: "ai", text: "Perfeito! Temos disponibilidade amanhã às 9h ou às 14h. Qual horário funciona melhor para você?", timestamp: 22 },
      { speaker: "client", text: "Amanhã às 9h está ótimo.", timestamp: 28 },
      { speaker: "ai", text: "Confirmado! Agendei para amanhã às 9h. Vou enviar os detalhes por SMS. Posso ter seu nome completo?", timestamp: 32 },
      { speaker: "client", text: "Carlos Eduardo Silva.", timestamp: 38 },
      { speaker: "ai", text: "Obrigada, Carlos! Seu atendimento está confirmado. Algo mais em que posso ajudar?", timestamp: 42 },
    ],
  },
  {
    id: "advocacia",
    title: "Advocacia",
    image: officeImage,
    audioUrl: "/audio/demo-advocacia.mp3",
    transcript: [
      { speaker: "ai", text: "Escritório de Advocacia Santos e Associados, meu nome é Clara, assistente virtual. Em que posso ajudar?", timestamp: 0 },
      { speaker: "client", text: "Boa tarde. Preciso marcar uma consulta sobre um caso de divórcio.", timestamp: 5 },
      { speaker: "ai", text: "Claro, posso ajudá-lo com isso. O Dr. Santos tem disponibilidade quinta-feira às 10h ou sexta às 15h. Qual prefere?", timestamp: 10 },
      { speaker: "client", text: "Quinta às 10h está ótimo para mim.", timestamp: 17 },
      { speaker: "ai", text: "Perfeito! Vou agendar sua consulta para quinta às 10h. Posso ter seu nome completo e telefone para contato?", timestamp: 22 },
      { speaker: "client", text: "Meu nome é Fernanda Oliveira, telefone 11 99999-1234.", timestamp: 28 },
      { speaker: "ai", text: "Obrigada, Fernanda! Sua consulta está confirmada. Enviarei um lembrete por SMS um dia antes. Algo mais?", timestamp: 35 },
      { speaker: "client", text: "Não, era só isso. Muito obrigada!", timestamp: 42 },
      { speaker: "ai", text: "Eu que agradeço! Tenha um ótimo dia e até quinta-feira.", timestamp: 46 },
    ],
  },
  {
    id: "limpeza",
    title: "Limpeza",
    image: industryCleaning,
    audioUrl: "/audio/demo-limpeza.mp3",
    transcript: [
      { speaker: "ai", text: "Clean Home Services, aqui é a assistente virtual Beatriz. Como posso ajudar?", timestamp: 0 },
      { speaker: "client", text: "Oi! Quero agendar uma limpeza profunda para minha casa.", timestamp: 4 },
      { speaker: "ai", text: "Ótimo! Para uma limpeza profunda, preciso saber: quantos quartos e banheiros tem sua casa?", timestamp: 9 },
      { speaker: "client", text: "São 3 quartos e 2 banheiros.", timestamp: 15 },
      { speaker: "ai", text: "Perfeito! Para uma casa desse tamanho, nossa limpeza profunda leva em média 4 horas. Podemos agendar para sábado de manhã ou segunda à tarde. Qual prefere?", timestamp: 19 },
      { speaker: "client", text: "Sábado de manhã seria perfeito.", timestamp: 27 },
      { speaker: "ai", text: "Excelente! Agendado para sábado às 8h. Posso ter seu endereço completo?", timestamp: 31 },
      { speaker: "client", text: "Rua das Flores, 123, apartamento 45, Jardim Paulista.", timestamp: 36 },
      { speaker: "ai", text: "Anotado! Sua limpeza profunda está confirmada para sábado às 8h. Enviarei confirmação por WhatsApp. Algo mais?", timestamp: 42 },
    ],
  },
];
