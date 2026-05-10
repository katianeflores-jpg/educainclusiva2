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
  TrendingDown
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

// --- DATA FROM PDF CONTENT ---

const stats = [
  { label: 'Estudantes trans que sofrem bullying (2025)', value: '82%', source: 'Aliança LGBTI+' },
  { label: 'Evasão antes de concluir Ensino Médio (2026)', value: '70%', source: 'ANTRA' },
  { label: 'Nome social não respeitado em sala (2026)', value: '56%', source: 'ANTRA' },
  { label: 'Insegurança em espaços coletivos (2025)', value: '91%', source: 'Aliança LGBTI+' },
];

const chartData = [
  { reason: 'Bullying Transfóbico', value: 82, color: '#6C5CE7' },
  { reason: 'Insegurança (Vestiários/Banheiros)', value: 74, color: '#1F3A5F' },
  { reason: 'Negação do Nome Social', value: 48, color: '#A29BFE' },
  { reason: 'Falta de Apoio Docente', value: 34, color: '#6FAF8F' },
].sort((a, b) => b.value - a.value);

const references = [
  {
    text: "ANTRA. Dossiê: Assassinatos e violência contra travestis e demais pessoas trans no Brasil em 2025. Associação Nacional de Travestis e Transexuais, 2026.",
    link: "https://antrabrasil.org/wp-content/uploads/2026/01/dossie-antra-2026.pdf"
  },
  {
    text: "ALIANÇA LGBTI+. Panorama da Diversidade Sexual e de Gênero nas Escolas: Desafios e Metas para 2025. Curitiba: Aliança Nacional LGBTI+, 2025.",
    link: "https://aliancalgbti.org.br/wp-content/uploads/2025/04/Apresentacao_Evento-de-Lancamento_Alianca-LGBTI.pdf"
  },
  {
    text: "CORDEIRO, Maria José de Jesus Alves; RODRIGUES, Nadir Pereira. Formação docente na perspectiva da diversidade de gênero e sexualidade: desafios e possibilidades. Revista Observatorio de la Economía Latinoamericana, v. 22, n. 7, 2024."
  },
  {
    text: "SALLES, Suzana de Moura Einloft; GUIMARAES, Willian. O papel da gestão escolar na implementação de políticas de diversidade sexual e de gênero nas escolas escolas públicas. Revista Ação e Reflexão, v. 3, n. 1, p. 1-14, 2025."
  },
  {
    text: "SOUSA, Kelyane Oliveira de. Programa de habilidades sociais na escola: uma forma de combate ao preconceito contra a diversidade sexual. 2017."
  },
  {
    text: "Resolução CNE/CP nº 01/2018 - Nome Social na Educação Básica."
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('boas-praticas');

  const navItems = [
    { id: 'inicio', label: 'Introdução' },
    { id: 'contexto', label: 'Contexto Social' },
    { id: 'professor', label: 'Papel do Professor' },
    { id: 'conteudo', label: 'Explore o Conteúdo' },
    { id: 'referencias', label: 'Referências' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-brand-neutral">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('inicio')}>
            <div className="w-8 h-8 bg-brand-dark rounded flex items-center justify-center text-white">
              <BookOpen size={20} />
            </div>
            <span className="font-bold text-brand-dark text-lg hidden sm:block">EducaInclusiva</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-gray-600 hover:text-brand-purple transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-gray-200 overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left py-2 px-4 hover:bg-brand-neutral rounded-md"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-16">
        {/* Intro Section */}
        <section id="inicio" className="bg-brand-beige py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 bg-brand-purple/10 text-brand-purple px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6"
                >
                  <BookOpen size={14} /> Guia de Formação Docente
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark mb-6 leading-tight"
                >
                  Educação, Identidade e <span className="text-brand-purple">Acolhimento</span> na Escola
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-lg text-gray-700 mb-8 leading-relaxed max-w-xl"
                >
                  A adolescência é uma fase crucial para a consolidação da identidade. O ambiente escolar deve ser um espaço seguro que incentiva a formação integral e o respeito à diversidade de gênero.
                </motion.p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-white/80 backdrop-blur shadow-sm text-brand-dark px-4 py-2 rounded-full text-sm font-semibold border border-gray-100">
                    <CheckCircle2 size={16} className="text-brand-soft-green" /> Baseado em evidências
                  </div>
                  <div className="flex items-center gap-2 bg-white/80 backdrop-blur shadow-sm text-brand-dark px-4 py-2 rounded-full text-sm font-semibold border border-gray-100">
                    <Users size={16} className="text-brand-purple" /> Foco no corpo docente
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
                  <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white">
                    <p className="text-sm font-medium italic">"Garantir a dignidade é o primeiro passo para uma educação transformadora."</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why/Context Section */}
        <section id="contexto" className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4 tracking-tight">Cenário das Pessoas Trans na Escola</h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  No âmbito educacional, o problema do preconceito contra a diversidade sexual e de gênero se manifesta de forma contundente, especialmente na adolescência, período crítico para a formação da identidade e dos valores. Conforme aponta Sousa (2017), parte-se da premissa de que a escola, embora seja um espaço privilegiado para a socialização, muitas vezes atua como reprodutora da heteronormatividade, silenciando discussões sobre sexualidade e gênero. Esse silenciamento contribui diretamente para a exclusão, a violência psicológica e a evasão escolar de jovens LGBTQIAPN+.
                </p>
                <p>
                  Esses dados refletem uma realidade que atravessa a sociedade como um todo e se manifesta também fora dos muros da escola.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-12">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-brand-dark flex items-center gap-2">
                    <BarChart2 className="text-brand-purple" /> Impacto na Permanência Escolar
                  </h3>
                  <div className="h-[400px] w-full bg-brand-neutral/50 p-6 rounded-3xl border border-gray-100">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={chartData} 
                        layout="vertical" 
                        margin={{ left: 10, right: 40, top: 10, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                        <XAxis type="number" hide domain={[0, 100]} />
                        <YAxis 
                          dataKey="reason" 
                          type="category" 
                          width={140} 
                          tick={({ x, y, payload }) => {
                            const lines = payload.value.split(/(?=[(])|(?<=[)])/g); // Split at parentheses or keep as is
                            // Improved splitting logic for the specific labels
                            let labelLines = [payload.value];
                            if (payload.value.includes('(')) {
                              labelLines = payload.value.split(' (');
                              labelLines[1] = '(' + labelLines[1];
                            } else if (payload.value.length > 20) {
                              // Simple split for other long texts if any
                              const mid = Math.floor(payload.value.length / 2);
                              const spaceIndex = payload.value.lastIndexOf(' ', mid);
                              if (spaceIndex !== -1) {
                                labelLines = [payload.value.substring(0, spaceIndex), payload.value.substring(spaceIndex + 1)];
                              }
                            }

                            return (
                              <g transform={`translate(${x},${y})`}>
                                <text x={-10} y={0} textAnchor="end" fill="#1F3A5F" fontSize={11} fontWeight="600">
                                  <tspan x={-10} dy={labelLines.length > 1 ? -6 : 4}>
                                    {payload.index + 1}. {labelLines[0]}
                                  </tspan>
                                  {labelLines.slice(1).map((line: string, i: number) => (
                                    <tspan key={i} x={-10} dy={14}>
                                      {line}
                                    </tspan>
                                  ))}
                                </text>
                              </g>
                            );
                          }}
                        />
                        <Tooltip 
                          cursor={{ fill: 'transparent' }}
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                          formatter={(value: number) => [`${value}%`, 'Impacto']}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                          <LabelList 
                            dataKey="value" 
                            position="right" 
                            formatter={(val: number) => `${val}%`} 
                            style={{ fill: '#1F3A5F', fontSize: 12, fontWeight: 'bold' }} 
                          />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-[10px] text-gray-400 text-right italic">
                    Dados baseados em relatos de barreiras à conclusão dos estudos (Dossiê ANTRA 2026/Aliança LGBTI+ 2025).
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-5 bg-brand-neutral rounded-2xl border border-gray-100 group hover:border-brand-purple/20 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-gray-400 uppercase">{stat.source}</span>
                        <TrendingDown size={14} className="text-red-400" />
                      </div>
                      <div className="text-4xl font-bold text-brand-dark mb-1 group-hover:text-brand-purple transition-colors">{stat.value}</div>
                      <div className="text-xs text-gray-500 leading-tight">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-brand-dark rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/20 blur-3xl -mr-32 -mt-32 rounded-full"></div>
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <AlertTriangle className="text-yellow-400" /> Dossiê ANTRA (2026)
                  </h3>
                  <div className="space-y-6">
                    <p className="text-brand-neutral/80 italic border-l-2 border-brand-purple pl-4 text-sm">
                      "A permanência escolar de travestis e pessoas trans é ameaçada por uma pedagogia do insulto, onde o silenciamento institucional é tão violento quanto a agressão física."
                    </p>
                    <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                      <h4 className="font-bold text-brand-soft-green mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                        Invisibilidade Estatística
                      </h4>
                      <p className="text-xs leading-relaxed text-white/70">
                        O Brasil continua no topo dos rankings de violência, mas 2025 revelou um fenômeno de "apagamento informativo". A falta de dados oficiais qualificados pelo Estado mascara a real evasão escolar, que estimamos atingir 6 em cada 10 estudantes trans.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-brand-neutral p-8 rounded-3xl border border-gray-200">
                  <h3 className="text-lg font-bold text-brand-dark mb-4 flex items-center gap-2">
                    <PieChartIcon className="text-brand-purple" /> Aliança LGBTI+ (2025)
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    A pesquisa realizada em 2025 destaca que o ambiente de maior vulnerabilidade não é apenas a sala de aula, mas os <strong>espaços de transição e privacidade</strong>.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                      <div className="px-2 py-1 bg-brand-dark text-white text-[10px] font-bold rounded">91%</div>
                      <p className="text-xs text-gray-600">Consideram banheiros e vestiários espaços de alto risco de violência ou repressão.</p>
                    </li>
                    <li className="flex items-start gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                      <div className="px-2 py-1 bg-brand-dark text-white text-[10px] font-bold rounded">48%</div>
                      <p className="text-xs text-gray-600">Afirmam que a negação sistemática do Nome Social é o principal gatilho para a desistência dos estudos.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher's Role Section */}
        <section id="professor" className="py-24 px-4 bg-brand-beige">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-brand-dark mb-4">O Papel do Professor</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A educação é um direito garantido pela Constituição. O vínculo entre aluno e professor deve ultrapassar a submissão mecânica, sendo porta para diálogo e afeto.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          </div>
        </section>

        {/* Explore Content Section */}
        <section id="conteudo" className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-brand-dark mb-12 text-center">Guia Prático: Diversidade em Pauta</h2>
            
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {[
                { id: 'boas-praticas', label: 'Boas Práticas', icon: <CheckCircle2 size={18} /> },
                { id: 'nome-social', label: 'Nome e Pronomes', icon: <Users size={18} /> },
                { id: 'registros', label: 'Registros Escolares', icon: <ClipboardCheck size={18} /> },
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
                        <h3 className="text-2xl font-bold text-brand-dark">Acolhimento e Respeito</h3>
                        <p className="text-gray-600">Para evitar constrangimento público, especialmente quando a lista ainda traz o nome de registro civil:</p>
                        <ul className="space-y-4">
                          <li className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-brand-soft-green/20 flex-shrink-0 flex items-center justify-center text-brand-soft-green font-bold text-xs">1</div>
                            <p className="text-sm">No primeiro dia, passe uma folha de presença onde os alunos escrevem como preferem ser chamados.</p>
                          </li>
                          <li className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-brand-soft-green/20 flex-shrink-0 flex items-center justify-center text-brand-soft-green font-bold text-xs">2</div>
                            <p className="text-sm">Se notar divergência entre nome e expressão de gênero, pergunte de forma discreta e individual.</p>
                          </li>
                        </ul>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100">
                          <h4 className="font-bold text-brand-purple mb-4 flex items-center gap-2">
                            <MessageCircle size={18} /> Sugestão de Abordagem
                          </h4>
                          <div className="italic text-gray-600 bg-brand-neutral p-4 rounded-lg text-sm">
                            "Oi, tudo bem? Notei que no sistema consta um nome, mas quero garantir que eu te chame da forma que você se sente mais confortável e respeitado(a). Como você prefere ser chamado(a) aqui na nossa disciplina?"
                          </div>
                        </div>
                      </div>
                      <div className="relative group">
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
                          <h3 className="text-2xl font-bold text-brand-dark">Uso Correto</h3>
                          <p className="text-sm text-gray-600">O direito ao nome social é baseado na autodeclaração. Evite termos como "nome verdadeiro" ou "nome real".</p>
                          <div className="space-y-2">
                            <div className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-100">✔ "Qual é o seu nome social?"</div>
                            <div className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-100">✔ "Como você gostaria que eu te apresentasse?"</div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-2xl font-bold text-brand-dark">Pronomes</h3>
                          <p className="text-sm text-gray-600">Pergunte discretamente:</p>
                          <div className="p-4 bg-brand-dark text-white rounded-xl">
                            <p className="text-sm italic">"Quais pronomes você utiliza? (Ele/Dele, Ela/Dela, Elu/Delu)"</p>
                          </div>
                          <p className="text-xs text-gray-400">Respeite o limite do aluno caso ele queira usar o nome social apenas com você.</p>
                        </div>
                      </div>
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-brand-purple to-brand-dark rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <img 
                          src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800&h=600" 
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
                        <h3 className="text-2xl font-bold text-brand-dark">Diretrizes Institucionais</h3>
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 mb-6">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 bg-brand-purple/10 rounded-lg text-brand-purple">
                              <ClipboardCheck />
                            </div>
                            <div>
                              <h4 className="font-bold text-lg">Resolução CNE/CP nº 01/2018</h4>
                              <p className="text-sm text-gray-500">Garante o uso do nome social em todos os registros escolares (diários, cadastros, carteirinhas).</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            Escolas devem garantir esse uso para maiores de 18 anos ou menores (mediante solicitação dos responsáveis). O nome social já deve constar nos registros internos.
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-brand-purple font-semibold text-sm">
                          <Info size={16} /> Oriente o aluno sobre o direito de solicitar a alteração na secretaria.
                        </div>
                      </div>
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-brand-soft-green to-brand-dark rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <img 
                          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800&h=600" 
                          alt="Registros Escolares e Legislação" 
                          className="relative rounded-3xl shadow-xl w-full object-cover aspect-4/3"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 'nao-fazer' && (
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      <div className="grid grid-cols-1 gap-4">
                        {[
                          { title: "Exigir Laudos", desc: "Você não precisa de laudo médico ou explicações psicológicas para respeitar o nome social." },
                          { title: "Nome de Registro por 'Hábito'", desc: "Não use o nome de registro 'por costume'. Lembre-se da dignidade da pessoa humana." },
                          { title: "Indiscreção", desc: "Nunca questione o aluno ou fale sobre seu nome de registro na frente de outros alunos ou professores." },
                          { title: "Ignorar Gestão", desc: "Não negligencie o alinhamento com a Gestão Escolar sobre as diretrizes da Resolução." }
                        ].map((item, i) => (
                          <div key={i} className="flex gap-4 p-4 bg-white rounded-xl border-l-4 border-red-400">
                            <AlertTriangle className="text-red-400 flex-shrink-0" />
                            <div>
                              <h4 className="font-bold text-brand-dark mb-1">{item.title}</h4>
                              <p className="text-xs text-gray-500">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-orange-400 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <img 
                          src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800&h=600" 
                          alt="O que NÃO fazer: Barreiras Sociais" 
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
        <section id="referencias" className="py-24 px-4 bg-brand-neutral">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-brand-dark mb-8 flex items-center gap-2">
              <BookOpen className="text-brand-purple" /> Referências Acadêmicas e Oficiais
            </h2>
            <div className="space-y-4">
              {references.map((ref, i) => (
                <div key={i} className="p-4 bg-white rounded-xl text-sm text-gray-600 border border-gray-100 shadow-sm flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-brand-purple rounded-full mt-1.5 flex-shrink-0" />
                  <div>
                    <span className="leading-relaxed">{ref.text}</span>
                    {ref.link && (
                      <a 
                        href={ref.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block mt-2 text-brand-purple font-semibold hover:underline flex items-center gap-1"
                      >
                        Acessar documento completo <ArrowRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
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
