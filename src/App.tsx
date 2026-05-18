import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Info, 
  BookOpen, 
  AlertTriangle, 
  CheckCircle2, 
  MessageCircle, 
  Menu, 
  X,
  ChevronRight,
  ClipboardCheck,
  ShieldAlert,
  ArrowRight,
  BarChart2,
  PieChart as PieChartIcon,
  TrendingDown,
  Speaker,
  ClipboardPen
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie,
  LabelList
} from 'recharts';

import introImg from './assets/images/regenerated_image_1778097519723.png';
import practicesImg from './assets/images/regenerated_image_1778097517365.png';
import antraImg from './assets/images/regenerated_image_1778522677796.png';
import aliancaImg from './assets/images/regenerated_image_1778522679760.png';
import cordeiroImg from './assets/images/regenerated_image_1778522682255.png';
import sallesImg from './assets/images/regenerated_image_1778522681295.png';
import sousaImg from './assets/images/regenerated_image_1778522681791.png';
import termImg from './assets/images/regenerated_image_1778602273769.png';
import dontImg from './assets/images/regenerated_image_1778603776105.png';
import medImg from './assets/images/regenerated_image_1778777849919.png';

// Images for "Boas Práticas" tabs
const terminologyImg = termImg;
const recordsImg = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800&h=600";
const dontDoImg = dontImg;
const mediatorImg = medImg;

// --- DATA FROM PDF CONTENT ---

const violenceStats = [
  { label: 'Pessoas LGBTQI+ sofreram agressões verbais em 2024', value: '90%' },
  { label: 'Vítimas de violência física em 2024', value: '34%' },
  { label: 'Aumenta 4% entre pessoas trans/travestis e negras', value: '38%' },
];

const aggressorsData = [
  { group: 'Estudantes', value: 97, color: '#FF5A5F' },
  { group: 'Docente/Educador(a)', value: 34, color: '#FF5A5F' },
  { group: 'Gestão/Direção', value: 16, color: '#FF5A5F' },
  { group: 'Outros Profissionais', value: 10, color: '#FF5A5F' },
];

const evasionData = [
  { label: 'Estudantes cis que pensaram em abandonar', value: '2%' },
  { label: 'Aumenta 56% entre pessoas trans', value: '58%' },
  { label: 'Aumenta 48% entre pessoas negras', value: '50%' },
];

const murderData = [
  { year: '2017', value: 179 },
  { year: '2018', value: 163 },
  { year: '2019', value: 124 },
  { year: '2020', value: 175 },
  { year: '2021', value: 140 },
  { year: '2022', value: 131 },
  { year: '2023', value: 145 },
  { year: '2024', value: 122 },
  { year: '2025', value: 80 },
];

const TransLogo = () => (
  <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded-xl shadow-md group transition-transform hover:scale-110">
    <div className="absolute inset-0 flex flex-col">
      <div className="h-[20%] bg-[#5BCEFA]"></div>
      <div className="h-[20%] bg-[#F5A9B8]"></div>
      <div className="h-[20%] bg-white"></div>
      <div className="h-[20%] bg-[#F5A9B8]"></div>
      <div className="h-[20%] bg-[#5BCEFA]"></div>
    </div>
    <div className="relative z-10 bg-white/60 backdrop-blur-sm p-1.5 rounded-lg border border-white/50">
      <MessageCircle size={20} className="text-brand-dark" strokeWidth={2.5} />
    </div>
  </div>
);

const highlightedReferences = [
  {
    text: "ANTRA. Dossiê: Assassinatos e violência contra travestis e demais pessoas trans no Brasil em 2025. Associação Nacional de Travestis e Transexuais, 2026.",
    link: "https://antrabrasil.org/wp-content/uploads/2026/01/dossie-antra-2026.pdf",
    thumbnail: antraImg
  },
  {
    text: "ALIANÇA LGBTI+. Panorama da Diversidade Sexual e de Gênero nas Escolas: Desafios e Metas para 2025. Curitiba: Aliança Nacional LGBTI+, 2025.",
    link: "https://aliancalgbti.org.br/wp-content/uploads/2025/04/Apresentacao_Evento-de-Lancamento_Alianca-LGBTI.pdf",
    thumbnail: aliancaImg
  },
  {
    text: "FAVERO, Sofia. Crianças Trans: Entre o Cuidado e a Patologização (Tese de Doutorado). UFRGS, 2024.",
    link: "https://www.academia.edu/129232361/Tese_Sofia_Favero_PPGPSI_UFRGS",
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    text: "SILVA, A. S. et al. Educação por uma escola que ensine e acolha a diversidade de gênero. Revista Educação em Questão, 2024.",
    link: "https://doi.org/10.25053/redufor.v10.e15342",
    thumbnail: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

const simpleReferences = [
  "CORDEIRO, Maria José de Jesus Alves; RODRIGUES, Nadir Pereira. Formação docente na perspectiva da diversidade de gênero e sexualidade: desafios e possibilidades. Revista Observatorio de la Economía Latinoamericana, v. 22, n. 7, 2024.",
  "SALLES, Suzana de Moura Einloft; GUIMARAES, Willian. O papel da gestão escolar na implementação de políticas de diversidade sexual e de gênero nas escolas públicas. Revista Ação e Reflexão, v. 3, n. 1, p. 1-14, 2025.",
  "SOUSA, Kelyane Oliveira de. Programa de habilidades sociais na escola: uma forma de combate ao preconceito contra a diversidade sexual. 2017.",
  "DEL PRETTE, Z. A. P.; DEL PRETTE, A. Psicologia das Habilidades Sociais: Terapia e Educação. Petrópolis: Vozes, 2001.",
  "BRASIL. Ministério da Educação. Resolução CNE/CP nº 01/2018 - Nome Social na Educação Básica."
];

const audiovisualMaterials = [
  {
    title: "A crise de saúde mental entre os jovens brasileiro",
    link: "https://youtu.be/IrzO1Emc-Cg?si=63Hp2Y9Po9Nwdn7J",
    type: "Podcast",
    thumbnail: "https://img.youtube.com/vi/IrzO1Emc-Cg/maxresdefault.jpg"
  },
  {
    title: "Conhecendo pessoas diferentes...parte 1",
    link: "https://www.youtube.com/watch?v=ZVnQxqyI4r0",
    type: "Vídeo / Entrevista",
    thumbnail: "https://img.youtube.com/vi/ZVnQxqyI4r0/maxresdefault.jpg"
  },
  {
    title: "Judith Butler - Seu comportamento cria seu gênero",
    link: "https://www.youtube.com/watch?v=9MlqEoCFtPM",
    type: "Vídeo / Documentário",
    thumbnail: "https://img.youtube.com/vi/9MlqEoCFtPM/maxresdefault.jpg"
  },
  {
    title: "Conhecendo pessoas diferentes...parte 2",
    link: "https://www.youtube.com/watch?v=DZsBei4nCkU",
    type: "Vídeo / Entrevista",
    thumbnail: "https://img.youtube.com/vi/DZsBei4nCkU/maxresdefault.jpg"
  }
];

const projectTeam = [
  "Katiane Soares Flores",
  "Vitória de souza Silva",
  "Antônia Alves Rodrigues",
  "Caroline Nogueira bussola",
  "Denise Reis Takacs",
  "Giovanna Romagnoli Caetano",
  "Marcia Cardoso da Cruz",
  "Andreia Vieira dos Reis Silva",
  "Silvana Marques correa",
  "Steffany da silva Tropardi"
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('boas-praticas');

  const navItems = [
    { id: 'inicio', label: 'Introdução' },
    { id: 'contexto', label: 'Insegurança no Ambiente Escolar' },
    { id: 'professor', label: 'Papel do Professor' },
    { id: 'conteudo', label: 'Boas Práticas em Sala de Aula' },
    { id: 'referencias', label: 'Curadoria e Referências' },
    { id: 'avalie', label: 'Avalie', isExternal: true, link: 'https://forms.gle/9ZjbZtvCrEQpB1739' },
  ];

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    
    // Use a small delay to allow the state change to propagate and menu to start closing
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-brand-neutral">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('inicio')}>
            <TransLogo />
            <span className="font-extrabold text-brand-dark text-xl hidden sm:block tracking-tighter">Educa<span className="text-brand-purple">Inclusiva</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              item.isExternal ? (
                <a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-black text-brand-purple transition-all hover:scale-105"
                >
                  {item.label}
                </a>
              ) : (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium text-gray-600 hover:text-brand-purple transition-colors"
                >
                  {item.label}
                </button>
              )
            ))}
          </div>

          {/* Mobile Toggle */}
          <button 
            type="button"
            className="md:hidden p-2 text-brand-dark hover:bg-brand-neutral rounded-lg transition-colors" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              className="md:hidden bg-white border-b border-gray-200 shadow-xl overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-2">
                {navItems.map((item) => (
                  item.isExternal ? (
                    <a
                      key={item.id}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between py-4 px-5 bg-brand-purple/10 text-brand-purple font-black rounded-2xl text-sm transition-all active:scale-95"
                    >
                      {item.label}
                      <ArrowRight size={18} />
                    </a>
                  ) : (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className="text-left py-4 px-5 text-brand-dark font-bold hover:bg-brand-neutral rounded-2xl transition-colors text-sm"
                    >
                      {item.label}
                    </button>
                  )
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-16">
        {/* Evaluation Banner */}
        <div className="bg-brand-dark text-white border-b border-white/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/20 to-transparent pointer-events-none"></div>
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10"
          >
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="bg-brand-purple p-2.5 rounded-xl animate-pulse shadow-lg shadow-brand-purple/30">
                <ClipboardPen className="text-white" size={20} />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-tight leading-none mb-1">Avaliação do Trabalho Acadêmico</p>
                <p className="text-xs text-gray-400 font-medium">Por favor, navegue pelos conteúdos antes de realizar sua avaliação. Sua opinião é fundamental!</p>
              </div>
            </div>
            <a 
              href="https://forms.gle/9ZjbZtvCrEQpB1739" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-2.5 bg-brand-purple hover:bg-brand-purple/90 text-white text-[10px] font-black rounded-full transition-all flex items-center gap-2 uppercase tracking-widest shadow-xl shadow-brand-purple/20 hover:scale-105 active:scale-95"
            >
              Avaliar agora <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>

        {/* Intro Section */}
        <section id="inicio" className="bg-brand-beige py-20 px-4 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 bg-brand-purple/10 text-brand-purple px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6"
                >
                  <div className="w-4 h-4 rounded-full flex flex-col overflow-hidden">
                    <div className="h-1/5 bg-[#5BCEFA]"></div>
                    <div className="h-1/5 bg-[#F5A9B8]"></div>
                    <div className="h-1/5 bg-white"></div>
                    <div className="h-1/5 bg-[#F5A9B8]"></div>
                    <div className="h-1/5 bg-[#5BCEFA]"></div>
                  </div>
                  Introdução à Educação Inclusiva
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark mb-6 leading-tight"
                >
                  A Consolidação da <span className="text-brand-purple">Identidade</span> no Ambiente Escolar
                </motion.h1>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-lg text-gray-700 mb-8 leading-relaxed max-w-xl space-y-4"
                >
                  <p>
                    A adolescência é uma fase crucial para a consolidação da identidade, incluindo a sexualidade e a identidade de gênero. É o período ideal para intervenções das habilidades sociais.
                  </p>
                  <p className="text-base text-gray-600">
                    Segundo a Constituição Brasileira (1988), a educação é um direito, garantindo igualdade de condições para acesso e permanência. Para isso, é preciso um ambiente seguro e de acolhimento.
                  </p>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur shadow-sm rounded-2xl border border-gray-100">
                    <CheckCircle2 size={18} className="text-brand-soft-green flex-shrink-0 mt-1" />
                    <div>
                      <span className="font-bold text-brand-dark block text-sm">Habilidades Sociais</span>
                      <span className="text-xs text-gray-500">Assertividade, empatia e expressão de afeto.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur shadow-sm rounded-2xl border border-gray-100">
                    <ClipboardCheck size={18} className="text-brand-purple flex-shrink-0 mt-1" />
                    <div>
                      <span className="font-bold text-brand-dark block text-sm">Diretrizes Práticas</span>
                      <span className="text-xs text-gray-500">Nome social e remoção de barreiras de preconceito.</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative group lg:order-last order-first mb-12 lg:mb-0"
              >
                <div className="absolute -inset-4 bg-gradient-to-tr from-brand-purple/20 to-brand-soft-green/20 rounded-[40px] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative aspect-square md:aspect-video lg:aspect-square overflow-hidden rounded-[32px] shadow-2xl border-8 border-white">
                  <img 
                    src={introImg} 
                    alt="Diversidade e Inclusão Escolar" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white">
                    <h4 className="font-bold text-lg mb-2">Papel do Docente</h4>
                    <p className="text-sm leading-relaxed opacity-90 italic">
                      "O vínculo entre aluno e professor deve ultrapassar o mecânico de submissão, abrindo portas para diálogos e entendimento."
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Insecurity Section */}
        <section id="contexto" className="py-24 px-4 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-6 tracking-tight uppercase">
                Insegurança no <br /> Ambiente Escolar
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Formas de Violência */}
              <div className="bg-brand-neutral/30 rounded-3xl p-8 border border-gray-100 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-brand-dark mb-8 uppercase tracking-widest border-b-4 border-brand-purple inline-block">
                    Formas de Violência
                  </h3>
                  <div className="space-y-6">
                    {violenceStats.map((stat, i) => (
                      <div key={i} className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-full border-4 border-brand-dark flex items-center justify-center flex-shrink-0 text-brand-dark font-black text-lg">
                          {stat.value}
                        </div>
                        <p className="text-xs font-bold text-gray-600 uppercase leading-tight">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <TrendingDown className="text-brand-dark scale-150" />
                </div>
              </div>

              {/* Quem são os agressores */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-extrabold text-brand-dark mb-8 uppercase tracking-widest">
                  Quem são os(as) agressores(as)?
                </h3>
                <p className="text-[10px] text-gray-500 mb-6 uppercase">
                  Agressores(as) mencionados(as) por vítimas de comentários ofensivos, bullying ou LGBTIfobia nas instituições de ensino (2024).
                </p>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={aggressorsData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="group" 
                        tick={{ fontSize: 9, fill: '#1F3A5F', fontWeight: 'bold' }} 
                        angle={-15} 
                        textAnchor="end"
                        interval={0}
                      />
                      <YAxis hide domain={[0, 100]} />
                      <Tooltip />
                      <Bar dataKey="value" barSize={40} radius={[4, 4, 0, 0]}>
                        {aggressorsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        <LabelList dataKey="value" position="top" formatter={(val: number) => `${val}%`} style={{ fontSize: 10, fontWeight: 'bold', fill: '#1F3A5F' }} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Risco de Evasão */}
              <div className="bg-red-50/50 rounded-3xl p-8 border border-red-100">
                <h3 className="text-xl font-extrabold text-red-600 mb-8 uppercase tracking-widest border-b-4 border-red-400 inline-block">
                  Risco de Evasão
                </h3>
                <p className="text-[10px] text-gray-500 mb-8 uppercase">
                  Porcentagem de estudantes que já consideraram abandonar a instituição de ensino
                </p>
                <div className="space-y-8">
                  {evasionData.map((data, i) => (
                    <div key={i} className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-full bg-white border-4 border-red-400 flex items-center justify-center flex-shrink-0 text-red-600 font-black text-lg shadow-sm">
                        {data.value}
                      </div>
                      <p className="text-xs font-bold text-gray-600 uppercase">
                        {data.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Apoio Recebido */}
              <div className="bg-blue-50/50 rounded-3xl p-8 border border-blue-100 flex flex-col">
                <h3 className="text-xl font-extrabold text-brand-dark mb-8 uppercase tracking-widest border-b-4 border-brand-soft-green inline-block">
                  Apoio recebido após o bullying:
                </h3>
                <div className="flex-1 flex flex-col justify-center gap-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-brand-dark flex items-center justify-center text-white font-bold">31%</div>
                    <p className="text-xs font-bold text-gray-600 uppercase">ESTUDANTES PROCURARAM A ESCOLA, MAS:</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-full border-4 border-blue-400 flex items-center justify-center mx-auto mb-2 text-brand-dark font-bold text-xs">69%</div>
                      <p className="text-[9px] font-bold text-blue-600 uppercase">DISSERAM QUE NADA FOI FEITO</p>
                    </div>
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-full border-4 border-blue-400 flex items-center justify-center mx-auto mb-2 text-brand-dark font-bold text-xs">86%</div>
                      <p className="text-[9px] font-bold text-blue-600 uppercase">AÇÕES POUCO OU NADA EFICAZES</p>
                    </div>
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-full border-4 border-blue-400 flex items-center justify-center mx-auto mb-2 text-brand-dark font-bold text-xs">8%</div>
                      <p className="text-[9px] font-bold text-blue-600 uppercase">SOLUÇÃO MUITO EFICAZ</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-gray-800 leading-relaxed space-y-6 mb-16 text-lg font-bold">
              <p>
                No âmbito educacional, o problema do preconceito contra a diversidade sexual e de gênero se manifesta de forma contundente, especialmente na adolescência, período crítico para a formação da identidade e dos valores. Conforme aponta Sousa (2017), parte-se da premissa de que a escola, embora seja um espaço privilegiado para a socialização, muitas vezes atua como reprodutora da heteronormatividade, silenciando discussões sobre sexualidade e gênero. Esse silenciamento contribui diretamente para a exclusão, a violência psicológica e a evasão escolar de jovens LGBTQIAPN+.
              </p>
              <p className="text-gray-500 text-base">
                Esses dados refletem uma realidade que atravessa a sociedade como um todo e se manifesta também fora dos muros da escola.
              </p>
            </div>

            {/* ANTRA Chart & Alert */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h4 className="text-sm font-bold text-blue-400 mb-6 uppercase">
                  Gráfico: Assassinatos de pessoas trans e no Brasil entre 2017 e 2025 - ANTRA
                </h4>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={murderData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="year" tick={{ fontSize: 10, fontWeight: 'bold' }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#6FAF8F" radius={[4, 4, 0, 0]}>
                        <LabelList dataKey="value" position="top" style={{ fontSize: 10, fontWeight: 'bold', fill: '#1F3A5F' }} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center gap-2 mt-4 text-[10px] text-gray-500 font-bold uppercase justify-center">
                  <div className="w-3 h-3 bg-blue-100"></div> Dados/Ano
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <div className="bg-gray-200/80 p-8 rounded-3xl">
                  <h4 className="font-extrabold text-brand-dark mb-4 leading-tight uppercase">
                    QUANDO A QUEDA NOS NÚMEROS NÃO REPRESENTA MELHORA NO CENÁRIO
                  </h4>
                  <p className="text-xs text-gray-700 leading-relaxed mb-6 uppercase font-bold">
                    A QUEDA NO NÚMERO DE ASSASSINATOS DE PESSOAS TRANS REGISTRADA EM 2025 (DE 122 EM 2024 PARA 80 EM 2025) NÃO DEVE SER INTERPRETADA COMO UMA MELHORA REAL NA SEGURANÇA, MAS SIM COMO UM AUMENTO DA INVISIBILIDADE DA VIOLÊNCIA. ANTRA (2026)
                  </p>
                  <p className="text-[10px] text-gray-600 leading-relaxed border-t border-gray-300 pt-4 uppercase">
                    A ANTRA ALERTA QUE O BRASIL CONTINUA SENDO O PAÍS QUE MAIS MATA PESSOAS TRANS NO MUNDO E QUE A REDUÇÃO NO GRÁFICO DE 2025 É FRUTO DE UM APAGAMENTO INFORMATIVO E DA OMISSÃO DO ESTADO, E NÃO DE POLÍTICAS PÚBLICAS EFICAZES DE ENFRENTAMENTO À TRANSFOBIA.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-4 bg-brand-neutral/50 rounded-xl text-[10px] font-mono text-gray-400 break-all uppercase">
              LEIA MAIS: HTTPS://ANTRABRASIL.ORG/WP-CONTENT/UPLOADS/2026/01/DOSSIE-ANTRA-2026.PDF<br />
              HTTPS://ALIANCALGBTI.ORG.BR/WP-CONTENT/UPLOADS/2025/04/APRESENTACAO_EVENTO-DE-LANCAMENTO_ALIANCA-LGBTI.PDF
            </div>
          </div>
        </section>

        {/* Teacher's Role Section */}
        <section id="professor" className="py-24 px-4 bg-brand-beige scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-6 tracking-tight uppercase">O Papel do Professor</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A educação é um direito garantido pela Constituição. O vínculo entre aluno e professor deve ultrapassar a submissão mecânica, sendo porta para diálogo e afeto.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {[
                {
                  icon: <MessageCircle className="text-brand-purple" />,
                  title: "Mediação Ativa",
                  desc: "Intervir em casos de discriminação e assegurar o respeito à diversidade em sala."
                },
                {
                  icon: <Info className="text-brand-soft-green" />,
                  title: "Revisão de Crenças",
                  desc: "Refletir sobre os próprios preconceitos e padrões de gênero da sociedade."
                },
                {
                  icon: <CheckCircle2 className="text-brand-dark" />,
                  title: "Habilidades Sociais",
                  desc: "Desenvolver assertividade, empatia e expressão de afeto como ferramentas de inclusão."
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
                >
                  <div className="w-12 h-12 bg-brand-neutral rounded-xl flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-brand-dark">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Special Feature: Interview */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="bg-brand-dark text-white p-12 lg:p-16 flex flex-col justify-center">
                  <div className="mb-8">
                    <div className="w-20 h-20 bg-brand-purple rounded-3xl mb-6 flex items-center justify-center shadow-lg shadow-brand-purple/20 rotate-3 group-hover:rotate-0 transition-transform">
                      <MessageCircle size={40} />
                    </div>
                    <span className="text-brand-purple font-black uppercase tracking-[0.2em] text-[10px] block mb-4">Destaque: Experiência na Prática</span>
                    <h3 className="text-3xl font-black leading-tight uppercase tracking-tighter">Entrevista com <br /> Emanuel Ribeiro Cordeiro</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed italic border-l-2 border-brand-purple pl-4 uppercase font-bold text-[10px]">
                    Cientista Social e Especialista em Gestão Escolar com 19 anos de atuação na rede pública de Mauá e Ribeirão Pires. Pesquisador de Habilidades Sociais e Mediação Escolar, dedicado à promoção do desenvolvimento humano e inclusão no ambiente de aprendizagem.
                  </p>
                </div>
                
                <div className="lg:col-span-2 p-8 md:p-12 lg:p-16 space-y-12 bg-white max-h-[600px] overflow-y-auto custom-scrollbar">
                  {[
                    {
                      q: "Como você define a origem da transfobia no ambiente escolar e o papel do professor diante disso?",
                      a: "A questão da transfobia está intimamente ligada à falta de letramento, o que pode levar uma pessoa a ser ofensiva sem sequer perceber. No cotidiano escolar, o professor atua como um intermediador fundamental em conflitos de bullying e preconceito. Para isso, é essencial que ele saiba aplicar as habilidades sociais, que são ferramentas de desempenho social e inter-relação fundamentais para a saúde mental e o desenvolvimento no ambiente de aprendizagem."
                    },
                    {
                      q: "Quais habilidades sociais específicas são mais relevantes para lidar com a diversidade em sala de aula?",
                      a: "Uma das principais é a comunicação assertiva, que consiste em ensinar e praticar formas respeitosas de falar e ouvir, evitando invalidações ou piadas preconcuituosas. Historicamente, o treinamento assertivo foca na expressão adequada de sentimentos e na defesa de direitos, sendo crucial para distinguir comportamentos assertivos de agressivos ou passivos. Além disso, a empatia é vital, definida como a capacidade de reconhecer e identificar-se com a perspectiva do outro, manifestando reações que expressem essa compreensão."
                    },
                    {
                      q: "Você poderia relatar uma experiência prática onde o uso (ou a falha) dessas habilidades ficou evidente?",
                      a: "Tive um caso com uma aluna que utilizava nome social. Ao ver dois nomes na chamada digital, fiquei confuso e perguntei qual seria o correto. Esse questionamento disparou gatilhos nela, que começou a chorar e pediu que o nome de batismo nunca mais fosse repetido. Esse episódio mostra como o professor deve usar essas situações para incentivar os alunos a respeitarem as identidades e sentimentos dos colegas."
                    },
                    {
                      q: "Quais estratégias o educador deve adotar para garantir um ambiente mais inclusivo?",
                      a: "É necessário desenvolver uma postura ética e profissional baseada em: Reconhecimento de preconceitos próprios (o desenvolvimento social humano é contínuo); Escuta imparcial e ausência de favoritismos; e Formação contínua. O campo do Treinamento de Habilidades Sociais (THS) oferece bases teóricas e práticas que ajudam o professor a agir de forma consciente em temas como inclusão e mediação de conflitos."
                    },
                    {
                      q: "Qual é o impacto final de um professor que domina essas habilidades sociais?",
                      a: "Quando o educador controla julgamentos pessoais e atua com ética, ele fortalece o diálogo e reduz conflitos. O domínio de habilidades como resolução de problemas e cooperação permite que o professor transforme a escola em um ambiente acolhedor, cumprindo as metas de desenvolvimento social esperadas para jovens e adultos. Isso é crucial porque déficits nessas habilidades podem comprometer fases posteriores do ciclo vital dos estudantes."
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-4">
                      <div className="flex gap-4 items-start group">
                        <div className="w-8 h-8 rounded-full bg-brand-purple/10 flex items-center justify-center flex-shrink-0 text-brand-purple font-black text-xs">P</div>
                        <h4 className="font-black text-brand-dark leading-tight uppercase tracking-tight text-sm group-hover:text-brand-purple transition-colors">{item.q}</h4>
                      </div>
                      <div className="pl-12 border-l-2 border-brand-neutral ml-4">
                        <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Boas Práticas Section */}
        <section id="conteudo" className="py-24 px-4 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-12 text-center uppercase tracking-tight">Boas Práticas em Sala de Aula</h2>
            
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {[
                { id: 'boas-praticas', label: 'Boas Práticas', icon: <CheckCircle2 size={18} /> },
                { id: 'nome-social', label: 'Terminologia e Pronomes', icon: <Users size={18} /> },
                { id: 'registros', label: 'Registros Escolares', icon: <ClipboardCheck size={18} /> },
                { id: 'mediador', label: 'Mediador', icon: <MessageCircle size={18} /> },
                { id: 'nao-fazer', label: 'O que NÃO fazer', icon: <ShieldAlert size={18} /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                    activeTab === tab.id 
                    ? 'bg-brand-dark text-white shadow-lg' 
                    : 'bg-brand-neutral text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="bg-brand-neutral rounded-3xl p-8 md:p-12 min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'boas-praticas' && (
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-brand-dark">O que isso implica na rotina escolar?</h3>
                        <p className="text-gray-700 leading-relaxed">Algumas vezes a lista oficial ainda traz o nome de registro civil e não o nome social do aluno. Para evitar qualquer situação de constrangimento público podemos tomar algumas boas práticas como:</p>
                        <ul className="space-y-4">
                          <li className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm transition-transform hover:scale-[1.02]">
                            <div className="w-8 h-8 rounded-full bg-brand-soft-green/20 flex-shrink-0 flex items-center justify-center text-brand-soft-green font-bold text-sm">1</div>
                            <p className="text-sm text-gray-600 leading-relaxed font-medium">No primeiro dia, antes de ler a lista em voz alta, você pode passar uma folha de presença onde os alunos assinam ou escrevem como preferem ser chamados.</p>
                          </li>
                          <li className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm transition-transform hover:scale-[1.02]">
                            <div className="w-8 h-8 rounded-full bg-brand-soft-green/20 flex-shrink-0 flex items-center justify-center text-brand-soft-green font-bold text-sm">2</div>
                            <p className="text-sm text-gray-600 leading-relaxed font-medium">Caso você note que o nome de registro não condiz com a expressão de gênero do aluno, pergunte discreta e individualmente para que o aluno se sinta acolhido e respeitado.</p>
                          </li>
                        </ul>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md">
                          <h4 className="font-bold text-brand-purple mb-4 flex items-center gap-2 uppercase text-xs tracking-wider">
                            <MessageCircle size={18} /> Sugestão de Abordagem
                          </h4>
                          <div className="italic text-gray-700 bg-brand-neutral p-5 rounded-xl text-sm leading-relaxed border-l-4 border-brand-purple">
                            "Oi, tudo bem? Notei que no sistema consta um nome, mas quero garantir que eu te chame da forma que você se sente mais confortável e respeitado(a). Como você prefere ser chamado(a) aqui na nossa disciplina?"
                          </div>
                        </div>
                      </div>
                      <div className="relative group hidden md:block">
                        <div className="absolute -inset-1 bg-gradient-to-r from-brand-soft-green to-brand-purple rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <img 
                          src={practicesImg} 
                          alt="Boas Práticas de Acolhimento" 
                          className="relative rounded-3xl shadow-xl w-full object-cover aspect-4/3"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 'nome-social' && (
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      <div className="space-y-8">
                        <div className="space-y-4">
                          <h3 className="text-2xl font-bold text-brand-dark">Terminologia Correta</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            É importante evitar termos como <strong>"nome verdadeiro"</strong> ou <strong>"nome real"</strong>.
                          </p>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 p-4 bg-green-50 text-green-800 rounded-xl border border-green-100">
                              <CheckCircle2 size={18} className="text-green-500" />
                              <span className="text-sm font-bold italic">"Qual é o seu nome social?"</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-green-50 text-green-800 rounded-xl border border-green-100">
                              <CheckCircle2 size={18} className="text-green-500" />
                              <span className="text-sm font-bold italic">"Como você gostaria que eu te apresentasse aos outros professores e alunos?"</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-2xl font-bold text-brand-dark">Pronomes</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">Pergunte discretamente:</p>
                          <div className="p-6 bg-brand-dark text-white rounded-2xl shadow-lg border-b-4 border-brand-purple">
                            <p className="text-base italic font-serif">"Quais pronomes você utiliza? (Ele/Dele, Ela/Dela, Elu/Delu)"</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative group hidden md:block">
                        <div className="absolute -inset-1 bg-gradient-to-r from-brand-purple to-brand-dark rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <img 
                          src={terminologyImg} 
                          alt="Identidade e Pronomes" 
                          className="relative rounded-3xl shadow-xl w-full object-cover aspect-4/3"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 'registros' && (
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-brand-dark">Você sabia?</h3>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6">
                          <p className="text-sm text-gray-600 leading-relaxed">
                            A <strong>Resolução CNE/CP nº 01/2018</strong> estabelece que escolas de todo o país devem garantir o uso do nome social em registros escolares (diários de classe, cadastros, carteirinhas) para alunos maiores de 18 anos ou para menores, mediante solicitação dos responsáveis.
                          </p>
                        </div>
                        <div className="bg-brand-purple shadow-lg p-6 rounded-2xl text-white">
                          <h4 className="font-bold flex items-center gap-2 mb-3 uppercase text-xs tracking-wider">
                            <ClipboardCheck size={18} /> Gestão Escolar
                          </h4>
                          <p className="text-sm leading-relaxed opacity-90">
                            Um ponto a levar em consideração é sempre manter o alinhamento com a Gestão Escolar. A Resolução garante que o nome social já deve constar nos registros internos.
                          </p>
                        </div>
                        <div className="flex items-start gap-4 p-4 bg-brand-soft-green/10 rounded-2xl border border-brand-soft-green/20">
                          <Info size={20} className="text-brand-soft-green flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="block font-bold text-brand-dark text-sm mb-1 uppercase tracking-tight">Atenção! Oriente o aluno:</span>
                            <p className="text-xs text-gray-600 leading-relaxed">
                              Se o aluno expressar o desejo de ser chamado pelo nome social mas ele ainda não estiver na lista, o oriente (e em caso de menor de idade, também aos responsáveis) sobre o direito de solicitar a alteração na secretaria escolar.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="relative group hidden md:block">
                        <div className="absolute -inset-1 bg-gradient-to-r from-brand-soft-green to-brand-dark rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <img 
                          src={recordsImg} 
                          alt="Registros Escolares e Legislação" 
                          className="relative rounded-3xl shadow-xl w-full object-cover aspect-4/3"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 'nao-fazer' && (
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      <div className="grid grid-cols-1 gap-6">
                         <h3 className="text-2xl font-bold text-brand-dark mb-2">O que NÃO fazer:</h3>
                        {[
                          { title: "Exigir Laudos", desc: "Você não precisa de laudo médico ou explicações psicológicas. O direito ao nome social é baseado na autodeclaração." },
                          { title: "Nome de Registro por 'Hábito'", desc: "Não use o nome de registro 'por hábito' ou costume, lembre-se que é garantido o direito a dignidade da pessoa humana." },
                          { title: "Desconsiderar Limites", desc: "Caso o cenário seja em que o aluno peça para usar o nome social apenas com você, mas ainda não se sentir confortável para usar com a turma toda, respeite esse limite." }
                        ].map((item, i) => (
                          <div key={i} className="flex gap-4 p-5 bg-white rounded-2xl border-l-8 border-red-400 shadow-sm transition-all hover:translate-x-2">
                            <ShieldAlert className="text-red-400 flex-shrink-0" />
                            <div>
                              <h4 className="font-black text-brand-dark mb-1 uppercase tracking-tight">{item.title}</h4>
                              <p className="text-xs text-gray-500 leading-relaxed font-bold">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="relative group hidden md:block">
                        <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-orange-400 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <img 
                          src={dontDoImg} 
                          alt="O que NÃO fazer: Barreiras Sociais" 
                          className="relative rounded-3xl shadow-xl w-full object-cover aspect-4/3"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 'mediador' && (
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      <div className="space-y-6">
                        <h3 className="text-2xl font-black text-brand-dark leading-tight uppercase tracking-tight">Postura Mediadora e Ética</h3>
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                          <p className="text-gray-700 leading-relaxed italic border-l-4 border-brand-purple pl-6 py-2">
                            "Sempre que possível é importante a integração dos temas e práticas pedagógicas que promovam os direitos humanos, igualdade e combate ao preconceito (Lei nº 12.852/2013 - Estatuto da Juventude)."
                          </p>
                          <p className="text-sm text-gray-600 font-medium">
                            Isso implica em abordar ativamente em sala temas relacionados à identidade de gênero, visando o combate a preconceitos, bullying e quaisquer ameaças à dignidade da pessoa humana.
                          </p>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex items-center gap-4 p-5 bg-brand-purple/5 rounded-2xl border border-brand-purple/10">
                            <MessageCircle className="text-brand-purple flex-shrink-0" />
                            <span className="text-xs font-bold text-brand-dark uppercase tracking-tight">Fomento à Habilidades Sociais de Empatia</span>
                          </div>
                          <div className="flex items-center gap-4 p-5 bg-brand-soft-green/5 rounded-2xl border border-brand-soft-green/10">
                            <ShieldAlert className="text-brand-soft-green flex-shrink-0" />
                            <span className="text-xs font-bold text-brand-dark uppercase tracking-tight">Tolerância Zero contra Bullying e LGBTIfobia</span>
                          </div>
                        </div>
                      </div>
                      <div className="relative group hidden md:block">
                        <div className="absolute -inset-1 bg-gradient-to-r from-brand-purple to-brand-soft-green rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <img 
                          src={mediatorImg} 
                          alt="Professor Mediador e Direitos Humanos" 
                          className="relative rounded-3xl shadow-xl w-full object-cover aspect-4/3"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* References Section */}
        <section id="referencias" className="py-24 px-4 bg-brand-neutral/50 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-brand-dark mb-12 text-center uppercase tracking-tighter">Curadoria e Referências</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              {/* Bibliographic References */}
              <div>
                <h3 className="text-xl font-black text-brand-dark mb-8 flex items-center gap-2 uppercase tracking-wide border-b-2 border-brand-purple pb-2 inline-block">
                  <BookOpen className="text-brand-purple" /> Referências Acadêmicas e Oficiais
                </h3>
                <div className="space-y-6">
                  {highlightedReferences.map((ref, i) => (
                    <div key={i} className="group flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md hover:translate-x-1">
                      {ref.thumbnail && (
                        <div className="w-full sm:w-[120px] h-[120px] rounded-xl overflow-hidden flex-shrink-0 border border-gray-50">
                          <img 
                            src={ref.thumbnail} 
                            alt="" 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                          />
                        </div>
                      )}
                      <div className="flex flex-col justify-center">
                        <span className="text-sm text-gray-700 leading-relaxed font-medium mb-2">{ref.text}</span>
                        {ref.link && (
                          <a 
                            href={ref.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-brand-purple font-black hover:underline flex items-center gap-1 uppercase tracking-tighter"
                          >
                            Ver documento <ArrowRight size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Simple List References */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Outras Fontes Bibliográficas</h4>
                  <ul className="space-y-3">
                    {simpleReferences.map((text, i) => (
                      <li key={i} className="text-xs text-gray-500 leading-relaxed flex gap-3 italic">
                        <div className="w-1 h-1 bg-gray-300 rounded-full mt-1.5 flex-shrink-0" />
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Audiovisual Materials */}
              <div>
                <h3 className="text-xl font-black text-brand-dark mb-8 flex items-center gap-2 uppercase tracking-wide border-b-2 border-brand-purple pb-2 inline-block">
                  <MessageCircle className="text-brand-purple" /> Materiais Audiovisuais
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  {audiovisualMaterials.map((material, i) => (
                    <div 
                      key={i}
                      className="group flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md hover:translate-x-1"
                    >
                      {material.thumbnail && (
                        <div className="w-full sm:w-[120px] h-[120px] rounded-xl overflow-hidden flex-shrink-0 border border-gray-50 relative">
                          <img 
                            src={material.thumbnail} 
                            alt="" 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                          />
                        </div>
                      )}
                      <div className="flex flex-col justify-center">
                        <span className="text-[10px] font-black text-brand-purple uppercase tracking-widest mb-1">{material.type}</span>
                        <h4 className="text-sm font-bold text-brand-dark group-hover:text-brand-purple transition-colors leading-tight mb-2">
                          {material.title}
                        </h4>
                        <a 
                          href={material.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-brand-purple font-black hover:underline flex items-center gap-1 uppercase tracking-tighter"
                        >
                          Assistir material <ArrowRight size={12} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Team Section */}
            <div className="bg-brand-dark rounded-[40px] p-12 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-brand-purple/20 blur-[100px] rounded-full"></div>
              <h3 className="text-2xl font-black mb-8 uppercase tracking-widest text-center border-b border-white/10 pb-6">Equipe de Elaboração</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {projectTeam.map((member, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm transition-all hover:bg-white/10">
                    <div className="w-2 h-2 rounded-full bg-brand-soft-green"></div>
                    <span className="text-xs font-bold uppercase tracking-tight opacity-90">{member}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark text-white py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="text-xl font-bold">EducaInclusiva</div>
            <p className="text-brand-neutral/60 text-sm">Apoio docente para um ambiente escolar acolhedor.</p>
          </div>
          <div className="text-xs text-brand-neutral/40 text-center md:text-right">
            Site desenvolvido para fins educativos.<br />
            Conteúdo baseado em materiais acadêmicos e legislação vigente.
          </div>
        </div>
      </footer>
    </div>
  );
}
