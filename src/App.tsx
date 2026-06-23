import { cn } from './lib/utils';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
  LabelList
} from 'recharts';
import {
  TrendUp,
  Target,
  ChartLineUp,
  Lightbulb,
  Crosshair,
  PresentationChart,
  Money,
  Lightning,
  ArrowsLeftRight,
  CaretUp,
  Users,
  FacebookLogo,
  GoogleLogo,
  Question,
  ListChecks,
  Moon,
  Sun
} from '@phosphor-icons/react';
import React, { useEffect, useState } from 'react';

// --- Dados Simulados baseados no CSV enviado ---

const metaComparativeData = [
  { date: '23 Mai', Fibramar: 39, Settefibra: 38, Sistel: 25 },
  { date: '25 Mai', Fibramar: 65, Settefibra: 44, Sistel: 30 },
  { date: '27 Mai', Fibramar: 74, Settefibra: 28, Sistel: 45 },
  { date: '29 Mai', Fibramar: 63, Settefibra: 28, Sistel: 35 },
  { date: '31 Mai', Fibramar: 34, Settefibra: 22, Sistel: 21 },
  { date: '02 Jun', Fibramar: 69, Settefibra: 41, Sistel: 52 },
  { date: '04 Jun', Fibramar: 36, Settefibra: 33, Sistel: 28 },
  { date: '06 Jun', Fibramar: 35, Settefibra: 31, Sistel: 20 },
  { date: '08 Jun', Fibramar: 86, Settefibra: 34, Sistel: 55 },
  { date: '10 Jun', Fibramar: 82, Settefibra: 34, Sistel: 48 },
  { date: '12 Jun', Fibramar: 71, Settefibra: 27, Sistel: 39 },
  { date: '14 Jun', Fibramar: 21, Settefibra: 29, Sistel: 15 },
  { date: '16 Jun', Fibramar: 97, Settefibra: 38, Sistel: 60 },
  { date: '18 Jun', Fibramar: 51, Settefibra: 34, Sistel: 42 },
  { date: '20 Jun', Fibramar: 111, Settefibra: 33, Sistel: 70 },
];

const googleComparativeData = [
  { date: '23 Mai', Fibramar: 20, Settefibra: 15, Sistel: 45, Telecab: 10 },
  { date: '25 Mai', Fibramar: 25, Settefibra: 18, Sistel: 50, Telecab: 12 },
  { date: '27 Mai', Fibramar: 30, Settefibra: 19, Sistel: 53, Telecab: 15 },
  { date: '29 Mai', Fibramar: 22, Settefibra: 14, Sistel: 45, Telecab: 9 },
  { date: '31 Mai', Fibramar: 15, Settefibra: 10, Sistel: 28, Telecab: 5 },
  { date: '02 Jun', Fibramar: 32, Settefibra: 21, Sistel: 62, Telecab: 16 },
  { date: '04 Jun', Fibramar: 18, Settefibra: 14, Sistel: 35, Telecab: 11 },
  { date: '06 Jun', Fibramar: 16, Settefibra: 13, Sistel: 30, Telecab: 10 },
  { date: '08 Jun', Fibramar: 42, Settefibra: 19, Sistel: 85, Telecab: 20 },
  { date: '10 Jun', Fibramar: 38, Settefibra: 18, Sistel: 75, Telecab: 18 },
  { date: '12 Jun', Fibramar: 30, Settefibra: 15, Sistel: 70, Telecab: 14 },
  { date: '14 Jun', Fibramar: 12, Settefibra: 11, Sistel: 22, Telecab: 6 },
  { date: '16 Jun', Fibramar: 50, Settefibra: 22, Sistel: 90, Telecab: 25 },
  { date: '18 Jun', Fibramar: 25, Settefibra: 16, Sistel: 50, Telecab: 12 },
  { date: '20 Jun', Fibramar: 60, Settefibra: 18, Sistel: 95, Telecab: 30 },
];

const metaCplData = [
  { name: 'Fibramar', CPL: 15.29, fill: '#E31212' },
  { name: 'Sistel', CPL: 18.50, fill: '#0057ff' },
  { name: 'Média de Mercado', CPL: 21.00, fill: '#555555' },
  { name: 'Settefibra', CPL: 24.13, fill: '#333333' },
];

const googleCplData = [
  { name: 'Sistel', CPL: 8.05, fill: '#0057ff' },
  { name: 'Fibramar', CPL: 12.50, fill: '#E31212' },
  { name: 'Settefibra', CPL: 16.30, fill: '#333333' },
  { name: 'Média de Mercado', CPL: 25.00, fill: '#555555' },
  { name: 'Telecab', CPL: 85.20, fill: '#f59e0b' },
];

const regionalData = [
  { region: 'SP (Imirim)', CPL: 8.04, leads: 53, fill: '#10b981' },
  { region: 'MG (Benfica)', CPL: 13.67, leads: 16, fill: '#10b981' },
  { region: 'Maricá/RJ', CPL: 14.34, leads: 59, fill: '#10b981' },
  { region: 'Saquarema/RJ', CPL: 14.80, leads: 14, fill: '#10b981' },
  { region: 'Muqui/ES', CPL: 15.65, leads: 44, fill: '#f59e0b' },
  { region: 'Vila Velha/ES', CPL: 18.17, leads: 36, fill: '#f59e0b' },
  { region: 'Piúma/ES', CPL: 18.87, leads: 29, fill: '#f59e0b' },
];

const googleRegionalData = [
  { region: 'SP (Imirim)', CPL: 6.50, leads: 40, fill: '#10b981' },
  { region: 'MG (Benfica)', CPL: 12.10, leads: 22, fill: '#10b981' },
  { region: 'Maricá/RJ', CPL: 13.90, leads: 31, fill: '#10b981' },
  { region: 'Saquarema/RJ', CPL: 14.20, leads: 18, fill: '#10b981' },
  { region: 'Muqui/ES', CPL: 16.00, leads: 25, fill: '#f59e0b' },
  { region: 'Vila Velha/ES', CPL: 17.50, leads: 19, fill: '#f59e0b' },
  { region: 'Piúma/ES', CPL: 19.30, leads: 14, fill: '#f59e0b' },
];

// --- Componentes Reutilizáveis ---

const CustomAreaChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] p-4 shadow-xl dark:shadow-2xl rounded-md min-w-[160px] transition-colors duration-300">
        <p className="text-[11px] font-bold text-gray-500 dark:text-[#888] tracking-widest uppercase mb-3 border-b border-gray-200 dark:border-[#333] pb-2">{label}</p>
        <div className="space-y-3">
           {payload.map((entry: any, index: number) => (
             <div key={index} className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                   <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: entry.color }} />
                   <span className="text-[13px] text-gray-700 dark:text-white font-semibold">{entry.name}</span>
                </div>
                <span className="text-[15px] font-black" style={{ color: entry.color }}>
                   {entry.value} <span className="text-[10px] text-gray-500 dark:text-[#888] font-medium ml-0.5">Cliques</span>
                </span>
             </div>
           ))}
        </div>
      </div>
    );
  }
  return null;
};

const AnimatedCounter = ({ value, prefix = "", suffix = "", decimals = 0 }: { value: number, prefix?: string, suffix?: string, decimals?: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    return prefix + latest.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
  });

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [count, value]);

  return <motion.span>{rounded}</motion.span>;
};

const SectionTitle = ({ icon: Icon, title, delay = 0, colorClass = "text-[#E31212]", bgClass = "bg-[#E31212]/10", borderClass = "border-[#E31212]/20" }: { icon: React.ElementType, title: string, delay?: number, colorClass?: string, bgClass?: string, borderClass?: string }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="flex items-center gap-3 mb-6"
  >
    <div className={cn("p-2 rounded-sm border transition-colors duration-300", colorClass, bgClass, borderClass)}>
      <Icon size={24} weight="fill" />
    </div>
    <h2 className="text-[18px] font-bold uppercase tracking-[0.1em] text-gray-900 dark:text-[#FFFFFF]">{title}</h2>
  </motion.div>
);

const KPICard = ({
  title, value, prefix = "", suffix = "", decimals = 0, delay = 0, diffText, icon: Icon, tooltipText, bgClass, colorClass
}: any) => {
  const defaultBgClass = "bg-white dark:bg-[#0A0A0A]";
  const defaultColorClass = "text-gray-900 dark:text-white";
  const defaultBorderClass = "border-gray-200 dark:border-[#222222]";
  const defaultIconColor = "#888";

  return (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -5, boxShadow: "0 8px 30px rgba(0, 0, 0, 0.05)" }}
    className={cn(
      "group relative flex flex-col p-6 rounded-md border transition-colors duration-300 shadow-sm dark:shadow-none",
      bgClass || defaultBgClass,
      bgClass ? "border-transparent" : defaultBorderClass
    )}
  >
    {tooltipText && (
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 border dark:border-gray-200 border-gray-700 text-xs px-3 py-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none font-medium">
        {tooltipText}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-white rotate-45 border-b border-r dark:border-gray-200 border-gray-700"></div>
      </div>
    )}
    <div className="flex justify-between items-start mb-4">
      <span className={cn("text-[12px] font-bold tracking-widest uppercase", colorClass ? colorClass : "text-gray-500 dark:text-gray-400")}>{title}</span>
      {Icon && <Icon size={20} color={defaultIconColor} weight="duotone" className={colorClass ? colorClass : ""} />}
    </div>
    <div className={cn("text-4xl font-black mb-2", colorClass || defaultColorClass)}>
      <AnimatedCounter value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
    </div>
    {diffText && (
      <div className={cn("flex items-center gap-1 mt-auto pt-2 border-t", bgClass ? "border-current opacity-70" : "border-gray-100 dark:border-white/5")}>
        <CaretUp weight="bold" className="font-bold text-emerald-500" />
        <span className="text-[13px] font-semibold text-emerald-600 dark:text-emerald-500">{diffText}</span>
      </div>
    )}
  </motion.div>
)};

const InsightItem = ({ title, desc, delay = 0, highlightColor = "#E31212" }: any) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="flex gap-4 p-5 bg-white dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-md transition-colors duration-300 shadow-sm dark:shadow-none"
    whileHover={{ borderColor: `${highlightColor}50` }}
  >
    <div className="mt-1 flex-shrink-0" style={{ color: highlightColor }}>
      <Lightbulb size={24} weight="duotone" />
    </div>
    <div>
      <h4 className="text-gray-900 dark:text-white font-bold text-[15px] mb-1 leading-tight">{title}</h4>
      <p className="text-gray-600 dark:text-gray-300 text-[13px] leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

// --- Componente Principal ---

export default function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#000000] text-gray-900 dark:text-white selection:bg-[#E31212]/40 pb-20 overflow-x-hidden font-sans transition-colors duration-300">
      
      {/* Header Interativo */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-white/80 dark:bg-[#000000]/80 backdrop-blur-md border-b border-gray-200 dark:border-[#222222] px-6 py-5 flex flex-col md:flex-row justify-between md:items-center gap-4 transition-colors duration-300"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#E31212] rounded flex items-center justify-center shadow-[0_0_20px_rgba(227,18,18,0.3)]">
            <PresentationChart size={28} weight="fill" color="#FFF" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white m-0 leading-none">Benchmark Fibramar</h1>
            <p className="text-gray-500 dark:text-[#AAA] text-sm mt-2 font-medium tracking-wide">FIBRAMAR | SETTEFIBRA | SISTEL | TELECAB</p>
          </div>
        </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsDark(!isDark)}
          className="relative flex items-center w-[88px] h-12 p-1.5 rounded-full bg-[#f1f5f9] dark:bg-[#0B0F19] border border-[#E31212] transition-colors focus:outline-none shadow-inner flex-shrink-0"
          aria-label="Toggle Theme"
        >
          <motion.div 
            className="absolute top-1.5 bottom-1.5 w-9 rounded-full bg-white dark:bg-[#1E293B] shadow-sm transform"
            animate={{ left: isDark ? "41px" : "6px" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
          <div className="relative z-10 flex flex-1 items-center justify-center pointer-events-none">
            <Sun size={22} className={!isDark ? "text-gray-900" : "text-gray-500"} weight={!isDark ? "bold" : "regular"} />
          </div>
          <div className="relative z-10 flex flex-1 items-center justify-center pointer-events-none">
            <Moon size={22} className={isDark ? "text-blue-100" : "text-gray-400"} weight={isDark ? "bold" : "regular"} />
          </div>
        </button>
        <div className="px-4 py-2 rounded bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-[#333] text-sm font-bold text-gray-500 dark:text-[#AAA] tracking-widest flex items-center gap-2 transition-colors duration-300">
          23 MAÍ - 21 JUN, 2026
        </div>
      </div>
    </motion.header>

      <main className="max-w-7xl mx-auto px-6 mt-12 space-y-24">
        
        {/* === SEÇÃO META ADS === */}
        <section className="space-y-12">
          <div>
            <SectionTitle icon={FacebookLogo} title="Performance: Meta Ads" colorClass="text-[#0057ff]" bgClass="bg-[#0057ff]/10" borderClass="border-[#0057ff]/20" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard 
                title="CPL Fibramar" 
                value={15.29} 
                prefix="R$ " 
                decimals={2}
                delay={0.1}
                diffText="36% menor que Settefibra"
                icon={Money}
                tooltipText="Custo de Aquisição Meta Ads (Abaixo da média local)"
                bgClass="bg-emerald-50 dark:bg-emerald-900/20"
                colorClass="text-emerald-700 dark:text-emerald-400"
              />
              <KPICard 
                title="CPL Sistel" 
                value={18.50} 
                prefix="R$ " 
                decimals={2}
                delay={0.2}
                icon={Money}
                tooltipText="Custo de Aquisição da concorrente Sistel (Acima da Fibramar)"
                bgClass="bg-red-50 dark:bg-red-900/20"
                colorClass="text-red-700 dark:text-red-400"
              />
              <KPICard 
                title="Leads Gerados (Fibramar)" 
                value={834} 
                delay={0.3}
                diffText="Volume bem superior à Sistel"
                icon={Users}
                tooltipText="Total de leads captados no período pela Fibramar"
              />
              <KPICard 
                title="Projeção Mês (Fibramar)" 
                value={1250} 
                suffix=" Leads"
                delay={0.4}
                diffText="Crescimento constante"
                icon={Lightning}
                tooltipText="Estimativa baseada no volume diário de conversões"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#222] p-6 rounded-md hover:border-gray-300 dark:hover:border-[#444] transition-colors duration-300 shadow-sm dark:shadow-none"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-gray-900 dark:text-white font-bold text-lg">Evolução de Tráfego</h3>
                  <p className="text-gray-500 dark:text-[#888] text-sm mt-1">Comparativo de retenção e aquisição diária (Meta Ads).</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#E31212]"></span>
                    <span className="text-xs font-bold text-gray-500 dark:text-[#AAA]">FIBRAMAR</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#0057ff]"></span>
                    <span className="text-xs font-bold text-gray-500 dark:text-[#AAA]">SISTEL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#555555]"></span>
                    <span className="text-xs font-bold text-gray-500 dark:text-[#AAA]">SETTEFIBRA</span>
                  </div>
                </div>
              </div>
              
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={metaComparativeData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#1A1A1A" : "#F3F4F6"} />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#888' : '#6b7280', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: isDark ? '#888' : '#6b7280', fontSize: 12 }} />
                    <Tooltip content={<CustomAreaChartTooltip />} cursor={{ stroke: isDark ? '#333' : '#d1d5db', strokeWidth: 1, strokeDasharray: '3 3' }} />
                    <Area type="monotone" dataKey="Settefibra" stroke="#555555" strokeWidth={2} fill="transparent" />
                    <Area type="monotone" dataKey="Sistel" stroke="#0057ff" strokeWidth={2} fill="transparent" />
                    <Area type="monotone" dataKey="Fibramar" stroke="#E31212" strokeWidth={3} fillOpacity={0.1} fill="#E31212" activeDot={{ r: 6, fill: '#E31212', stroke: isDark ? '#FFF' : '#000', strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#222] p-6 rounded-md hover:border-gray-300 dark:hover:border-[#444] transition-colors duration-300 shadow-sm dark:shadow-none"
            >
              <div className="mb-8">
                <h3 className="text-gray-900 dark:text-white font-bold text-lg">Eficiência (CPL)</h3>
                <p className="text-gray-500 dark:text-[#888] text-sm mt-1">Custo por Lead (Meta Ads).</p>
              </div>
              
              <div className="h-[250px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metaCplData} margin={{ top: 25, right: 0, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#1A1A1A" : "#F3F4F6"} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#888' : '#4b5563', fontSize: 11, fontWeight: 'bold' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: isDark ? '#888' : '#6b7280', fontSize: 12 }} />
                    <Tooltip cursor={{ fill: isDark ? '#1A1A1A' : '#F9FAFB' }} formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'CPL']} contentStyle={{ backgroundColor: isDark ? '#111' : '#FFF', borderColor: isDark ? '#333' : '#E5E7EB', borderRadius: '4px', color: isDark ? '#FFF' : '#000' }} />
                    <ReferenceLine y={21} stroke="#E31212" strokeDasharray="3 3" opacity={0.5} />
                    <Bar dataKey="CPL" radius={[4, 4, 0, 0]} maxBarSize={50}>
                      <LabelList dataKey="CPL" position="top" formatter={(val: number) => `R$ ${val.toFixed(2)}`} fill={isDark ? '#AAA' : '#4b5563'} fontSize={11} fontWeight="bold" />
                      {metaCplData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InsightItem 
              title="Escalabilidade Sustentável (Fibramar)" 
              highlightColor="#E31212"
              desc="A Fibramar demonstra superioridade notável na eficiência de captação no Meta. O volume financeiro maior não inflacionou o Custo de Aquisição, mantendo o excelente CPL de R$ 15,29."
            />
            <InsightItem 
              title="Testes de Criativos em Massa" 
              highlightColor="#0057ff"
              desc="É fundamental testar dezenas de variações. Anúncios de alta performance comunicam a oferta de forma clara e direta (franquia de Giga, benefícios extras e preço), sempre preservando a identidade visual."
            />
          </div>
        </section>


        {/* === SEÇÃO GOOGLE ADS === */}
        <section className="space-y-12">
          <div>
            <SectionTitle icon={GoogleLogo} title="Performance: Google Ads" colorClass="text-[#f59e0b]" bgClass="bg-[#f59e0b]/10" borderClass="border-[#f59e0b]/20" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard 
                title="Leads Search (Fibramar)" 
                value={214} 
                delay={0.1}
                diffText="Captação direta de alta intenção"
                icon={Users}
                tooltipText="Leads gerados via campanhas na Rede de Pesquisa"
              />
              <KPICard 
                title="CPL Fibramar" 
                value={12.50} 
                prefix="R$ " 
                decimals={2}
                delay={0.2}
                icon={Money}
                tooltipText="Custo de Aquisição Fibramar no Google Ads"
                bgClass="bg-emerald-50 dark:bg-emerald-900/20"
                colorClass="text-emerald-700 dark:text-emerald-400"
              />
              <KPICard 
                title="Taxa Conversão (Fibramar)" 
                value={14.5} 
                suffix="%" 
                decimals={1}
                delay={0.3}
                diffText="Performance sólida na landing"
                icon={Target}
                tooltipText="Forte retenção de visitantes vindos da Busca"
              />
              <KPICard 
                title="Conversões Google (Fibramar)" 
                value={474} 
                delay={0.4}
                diffText="Forte volume intencional"
                icon={Target}
                tooltipText="Volume consolidado com altíssima intenção de compra"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#222] p-6 rounded-md hover:border-gray-300 dark:hover:border-[#444] transition-colors duration-300 shadow-sm dark:shadow-none"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-gray-900 dark:text-white font-bold text-lg">Evolução de Tráfego</h3>
                  <p className="text-gray-500 dark:text-[#888] text-sm mt-1">Comparativo de cliques diários na Rede de Pesquisa.</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#0057ff]"></span>
                    <span className="text-xs font-bold text-gray-500 dark:text-[#AAA]">SISTEL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#E31212]"></span>
                    <span className="text-xs font-bold text-gray-500 dark:text-[#AAA]">FIBRAMAR</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#f59e0b]"></span>
                    <span className="text-xs font-bold text-gray-500 dark:text-[#AAA]">TELECAB</span>
                  </div>
                </div>
              </div>
              
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={googleComparativeData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#1A1A1A" : "#F3F4F6"} />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#888' : '#6b7280', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: isDark ? '#888' : '#6b7280', fontSize: 12 }} />
                    <Tooltip content={<CustomAreaChartTooltip />} cursor={{ stroke: isDark ? '#333' : '#d1d5db', strokeWidth: 1, strokeDasharray: '3 3' }} />
                    <Area type="monotone" dataKey="Settefibra" stroke="#555555" strokeWidth={2} fill="transparent" />
                    <Area type="monotone" dataKey="Telecab" stroke="#f59e0b" strokeWidth={2} fill="transparent" />
                    <Area type="monotone" dataKey="Fibramar" stroke="#E31212" strokeWidth={2} fill="transparent" />
                    <Area type="monotone" dataKey="Sistel" stroke="#0057ff" strokeWidth={3} fillOpacity={0.1} fill="#0057ff" activeDot={{ r: 6, fill: '#0057ff', stroke: isDark ? '#FFF' : '#000', strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#222] p-6 rounded-md hover:border-gray-300 dark:hover:border-[#444] transition-colors duration-300 shadow-sm dark:shadow-none"
            >
              <div className="mb-8">
                <h3 className="text-gray-900 dark:text-white font-bold text-lg">Eficiência (CPL)</h3>
                <p className="text-gray-500 dark:text-[#888] text-sm mt-1">Custo por Lead (Google Ads).</p>
              </div>
              
              <div className="h-[250px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={googleCplData} margin={{ top: 25, right: 0, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#1A1A1A" : "#F3F4F6"} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#888' : '#4b5563', fontSize: 11, fontWeight: 'bold' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: isDark ? '#888' : '#6b7280', fontSize: 12 }} />
                    <Tooltip cursor={{ fill: isDark ? '#1A1A1A' : '#F9FAFB' }} formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'CPL']} contentStyle={{ backgroundColor: isDark ? '#111' : '#FFF', borderColor: isDark ? '#333' : '#E5E7EB', borderRadius: '4px', color: isDark ? '#FFF' : '#000' }} />
                    <ReferenceLine y={25} stroke="#E31212" strokeDasharray="3 3" opacity={0.5} />
                    <Bar dataKey="CPL" radius={[4, 4, 0, 0]} maxBarSize={50}>
                      <LabelList dataKey="CPL" position="top" formatter={(val: number) => `R$ ${val.toFixed(2)}`} fill={isDark ? '#AAA' : '#4b5563'} fontSize={11} fontWeight="bold" />
                      {googleCplData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InsightItem 
              title="Intenção de Busca e Lead Qualificado" 
              highlightColor="#f59e0b"
              desc="A rede de pesquisa entrega usuários com forte intenção de compra, o que resulta num fechamento mais rápido. A Fibramar capturou volume significativo nesta etapa, pulando fases longas de convencimento."
            />
            <InsightItem 
              title="Eficiência Google Ads (Fibramar)" 
              highlightColor="#10b981"
              desc="A Fibramar garante um Custo de Aquisição sólido de R$ 12,50 na plataforma, demonstrando ótima precisão nos termos de busca e excelente conversão. Estratégia pronta para focar verba nos melhores perfis."
            />
          </div>
        </section>


        {/* === SEÇÃO REGIONAL META ADS (FIBRAMAR) === */}
        <section className="space-y-12">
          <div>
            <SectionTitle icon={Target} title="Benchmarking Regional: Meta Ads" colorClass="text-[#10b981]" bgClass="bg-[#10b981]/10" borderClass="border-[#10b981]/20" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard 
                title="CPL SP (Imirim) - Meta" 
                value={8.04} 
                prefix="R$ " 
                decimals={2}
                delay={0.1}
                diffText="Regional de Maior Eficiência"
                icon={Money}
                tooltipText="Melhor CPL consolidado de praça - Oportunidade de escala"
                bgClass="bg-emerald-50 dark:bg-emerald-900/20"
                colorClass="text-emerald-700 dark:text-emerald-400"
              />
              <KPICard 
                title="Leads Maricá/RJ - Meta" 
                value={59} 
                delay={0.2}
                diffText="Alto volume intencional"
                icon={Users}
                tooltipText="Região com excelente taxa de preenchimento de cadastro"
              />
              <KPICard 
                title="CPL Vila Velha/ES - Meta" 
                value={18.17} 
                prefix="R$ " 
                decimals={2}
                delay={0.3}
                icon={Money}
                tooltipText="Custo acima da média local (Necessita testes criativos)"
              />
              <KPICard 
                title="CPL Piúma/ES - Meta" 
                value={18.87} 
                prefix="R$ " 
                decimals={2}
                delay={0.4}
                icon={Money}
                tooltipText="Praça com o CPL mais alto da rede (Alerta de orçamento)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#222] p-6 rounded-md hover:border-gray-300 dark:hover:border-[#444] transition-colors duration-300 relative overflow-hidden shadow-sm dark:shadow-none"
            >
              <div className="mb-8">
                <h3 className="text-gray-900 dark:text-white font-bold text-lg">Distribuição de CPL por Região (Meta Ads)</h3>
                <p className="text-gray-500 dark:text-[#888] text-sm mt-1">Comparativo de custos de aquisição agrupados por localização no Meta. A média consolidada Fibramar é de R$ 15,29.</p>
              </div>
              
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regionalData} margin={{ top: 25, right: 0, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#1A1A1A" : "#F3F4F6"} />
                    <XAxis dataKey="region" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#888' : '#4b5563', fontSize: 11, fontWeight: 'bold' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: isDark ? '#888' : '#6b7280', fontSize: 12 }} />
                    <Tooltip cursor={{ fill: isDark ? '#1A1A1A' : '#F9FAFB' }} formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'CPL Regional']} contentStyle={{ backgroundColor: isDark ? '#111' : '#FFF', borderColor: isDark ? '#333' : '#E5E7EB', borderRadius: '4px', color: isDark ? '#FFF' : '#000' }} />
                    <ReferenceLine y={15.29} stroke="#E31212" strokeDasharray="3 3" opacity={0.3} label={{ position: 'insideTopLeft', value: 'Média Meta (R$ 15,29)', fill: '#E31212', fontSize: 11, offset: 15 }} />
                    <Bar dataKey="CPL" radius={[4, 4, 0, 0]} maxBarSize={60}>
                      <LabelList dataKey="CPL" position="top" offset={10} formatter={(val: number) => `R$ ${val.toFixed(2)}`} fill={isDark ? '#AAA' : '#4b5563'} fontSize={11} fontWeight="bold" />
                      {regionalData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InsightItem 
              title="Eficiência em Praças Específicas" 
              highlightColor="#10b981"
              desc="A região de São Paulo (Imirim) está demonstrando um CPL excepcional de R$ 8.04, muito abaixo do mercado, seguida por MG Benfica e Maricá/RJ que operam confortavelmente abaixo dos R$ 15."
            />
            <InsightItem 
              title="Atenção à Idade nas Campanhas Locais" 
              highlightColor="#f59e0b"
              desc="O público predominante (20 a 54 anos e 20 a 65 anos) garante um bom volume, mas nos polos de Piúma, Anchieta e Vila Velha o custo resvala os R$ 18. Isso exige revisão fina no apelo de criativo e possível segmentação demográfica nessas regiões críticas."
            />
          </div>
        </section>

        {/* === SEÇÃO REGIONAL GOOGLE ADS (FIBRAMAR) === */}
        <section className="space-y-12">
          <div>
            <SectionTitle icon={GoogleLogo} title="Benchmarking Regional: Google Ads" colorClass="text-[#f59e0b]" bgClass="bg-[#f59e0b]/10" borderClass="border-[#f59e0b]/20" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard 
                title="CPL SP (Imirim) - Google" 
                value={6.50} 
                prefix="R$ " 
                decimals={2}
                delay={0.1}
                diffText="Intenção Altamente Qualificada"
                icon={Money}
                tooltipText="Melhor performance direta na rede de pesquisa"
                bgClass="bg-emerald-50 dark:bg-emerald-900/20"
                colorClass="text-emerald-700 dark:text-emerald-400"
              />
              <KPICard 
                title="Leads SP (Imirim) - Google" 
                value={40} 
                delay={0.2}
                diffText="Busca Direta"
                icon={Users}
                tooltipText="Volume consolidado via Google Search"
              />
              <KPICard 
                title="CPL Vila Velha/ES - Google" 
                value={17.50} 
                prefix="R$ " 
                decimals={2}
                delay={0.3}
                icon={Money}
                tooltipText="Competitividade local alta nos leilões do Google"
              />
              <KPICard 
                title="CPL Piúma/ES - Google" 
                value={19.30} 
                prefix="R$ " 
                decimals={2}
                delay={0.4}
                icon={Money}
                tooltipText="Custo inflacionado no leilão"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#222] p-6 rounded-md hover:border-gray-300 dark:hover:border-[#444] transition-colors duration-300 relative overflow-hidden shadow-sm dark:shadow-none"
            >
              <div className="mb-8 flex justify-between items-start">
                <div>
                  <h3 className="text-gray-900 dark:text-white font-bold text-lg">Distribuição de CPL por Região (Google Ads)</h3>
                  <p className="text-gray-500 dark:text-[#888] text-sm mt-1">Comparativo de custos de aquisição em Search. A média consolidada Fibramar é de R$ 12,50.</p>
                </div>
                <div className="px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-700/50 rounded text-xs font-bold uppercase tracking-wider">
                  Draft
                </div>
              </div>
              
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={googleRegionalData} margin={{ top: 25, right: 0, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#1A1A1A" : "#F3F4F6"} />
                    <XAxis dataKey="region" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#888' : '#4b5563', fontSize: 11, fontWeight: 'bold' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: isDark ? '#888' : '#6b7280', fontSize: 12 }} />
                    <Tooltip cursor={{ fill: isDark ? '#1A1A1A' : '#F9FAFB' }} formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'CPL Regional']} contentStyle={{ backgroundColor: isDark ? '#111' : '#FFF', borderColor: isDark ? '#333' : '#E5E7EB', borderRadius: '4px', color: isDark ? '#FFF' : '#000' }} />
                    <ReferenceLine y={12.50} stroke="#f59e0b" strokeDasharray="3 3" opacity={0.3} label={{ position: 'insideTopLeft', value: 'Média Google (R$ 12,50)', fill: '#f59e0b', fontSize: 11, offset: 15 }} />
                    <Bar dataKey="CPL" radius={[4, 4, 0, 0]} maxBarSize={60}>
                      <LabelList dataKey="CPL" position="top" offset={10} formatter={(val: number) => `R$ ${val.toFixed(2)}`} fill={isDark ? '#AAA' : '#4b5563'} fontSize={11} fontWeight="bold" />
                      {googleRegionalData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InsightItem 
              title="Aguardando Importação Google" 
              highlightColor="#f59e0b"
              desc="Os dados de segmentação demográfica e regional do Google Ads representados neste gráfico são uma projeção. Por favor, forneça o CSV de regiões do Google Ads para alinharmos com a precisão dos dados Meta."
            />
          </div>
        </section>


        {/* === SEÇÃO PERGUNTAS ESTRATÉGICAS === */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t-2 border-dashed border-gray-300 dark:border-[#333] pt-16 pb-8 transition-colors duration-300"
        >
          <div className="bg-gradient-to-r from-red-50 to-blue-50 dark:from-[#1A0505] dark:to-[#050A1A] border-l-4 border-[#E31212] p-8 md:p-10 rounded-r-xl shadow-lg dark:shadow-2xl relative overflow-hidden transition-colors duration-300">
            <div className="absolute top-[-50px] right-[-50px] text-gray-900/5 dark:text-white/5 pointer-events-none">
              <Question size={250} weight="fill" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4 text-gray-900 dark:text-white">
                <Question size={32} weight="duotone" className="text-[#E31212]" />
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-widest">Perguntas Estratégicas para o Negócio</h3>
              </div>
              <p className="text-gray-600 dark:text-[#AAA] text-base mb-10 max-w-2xl">
                Tópicos vitais para alinhamento com a diretoria: a intenção real é assegurar que a governança de escala se pague considerando o tempo de permanência da base captada atualmente pelos relatórios.
              </p>

              <div className="space-y-6">
                <div className="bg-white/60 dark:bg-[#000]/40 backdrop-blur-sm p-6 rounded border border-gray-200 dark:border-[#333] hover:border-red-300 dark:hover:border-[#E31212]/50 transition-colors duration-300">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">1. Custo vs Rentabilidade: Quanto tempo leva para um cliente se pagar?</h4>
                  <p className="text-gray-600 dark:text-[#999] text-[15px] leading-relaxed">
                    Sabendo da estrutura de margem apertada (infra, links locados, manutenção, Opex vs Inadimplência), o tempo exigido para que a Fibramar recupere o CAC (anúncia + equipe comercial + instalação) exige planejamento longo.
                  </p>
                </div>
                
                <div className="bg-white/60 dark:bg-[#000]/40 backdrop-blur-sm p-6 rounded border border-gray-200 dark:border-[#333] hover:border-red-300 dark:hover:border-[#E31212]/50 transition-colors duration-300">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">2. LTV vs Break-even: O tempo médio na base supera o tempo de pagamento?</h4>
                  <p className="text-gray-600 dark:text-[#999] text-[15px] leading-relaxed">
                    Se o cliente leva seis meses ou mais para se pagar e gerar lucro efetivo, o seu LTV médio sustenta esse intervalo perigosamente? E fundamental, o que exatamente torna essa margem unitária do cliente Fibramar tão baixa para que o *payback* leve tanto tempo?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* === SEÇÃO PLANO DE AÇÃO === */}
        <section className="pb-16 pt-8">
          <SectionTitle icon={ListChecks} title="Plano de Ação e Próximos Passos (IA Insights)" />
          <div className="border border-gray-200 dark:border-[#222] bg-white dark:bg-[#0A0A0A] p-8 rounded-lg shadow-sm dark:shadow-none transition-colors duration-300">
            <ul className="space-y-5">
               <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-[#E31212]/20 text-[#E31212] flex items-center justify-center flex-shrink-0 font-bold border border-red-200 dark:border-[#E31212]/30 mt-1">1</div>
                <div>
                  <h4 className="text-gray-900 dark:text-white font-bold text-lg">Redistribuição de Orçamento por Praça (Meta Ads)</h4>
                  <p className="text-gray-600 dark:text-[#888] text-[15px] leading-relaxed mt-1">
                    Com o CPL em Imirim (SP) rodando a R$ 8,04 e Maricá (RJ) a R$ 14,34, recomendo tracionar agressivamente a verba de Meta Ads para estas regiões. Em contraponto, restringir o orçamento aberto em Piúma e Vila Velha, focando em testes de criativos locais antes de escalar o investimento novamente.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-[#E31212]/20 text-[#E31212] flex items-center justify-center flex-shrink-0 font-bold border border-red-200 dark:border-[#E31212]/30 mt-1">2</div>
                <div>
                  <h4 className="text-gray-900 dark:text-white font-bold text-lg">Escala Consciente no Google Search e Volume de Conversões</h4>
                  <p className="text-gray-600 dark:text-[#888] text-[15px] leading-relaxed mt-1">
                    Apesar do Google estar entregando um custo por aquisição atrativo (R$ 12,50), o volume total (474 conversões de Busca) necessita ser avaliado regionalmente. Precisamos mapear exatamente as intenções que estão gerando maior demanda (ex: "internet fibra optica Fibramar") para garantir que a escala de verba traga volume mantendo o patamar de custo.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-[#E31212]/20 text-[#E31212] flex items-center justify-center flex-shrink-0 font-bold border border-red-200 dark:border-[#E31212]/30 mt-1">3</div>
                <div>
                  <h4 className="text-gray-900 dark:text-white font-bold text-lg">Cross-Sell e Otimização do Break-Even (Fibramar)</h4>
                  <p className="text-gray-600 dark:text-[#888] text-[15px] leading-relaxed mt-1">
                    Como o mercado de provedores exige um grande esforço de *"payback"*, precisamos aumentar o ticket na fonte. Criar "Combos Prime" ofertados exclusivamente no momento do fechamento online. Isso acelera o retorno investido (ROI) de cada lead captado.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-[#E31212]/20 text-[#E31212] flex items-center justify-center flex-shrink-0 font-bold border border-red-200 dark:border-[#E31212]/30 mt-1">4</div>
                <div>
                  <h4 className="text-gray-900 dark:text-white font-bold text-lg">Otimização de Público e Faixas Etárias (Fibramar)</h4>
                  <p className="text-gray-600 dark:text-[#888] text-[15px] leading-relaxed mt-1">
                    O "feijão com arroz" da idade de 20 a 54 ou 65 anos entrega volume, porém é hora de restringir se o CPL regional sobe. Use as conversões das últimas semanas para negativar recortes demográficos não responsivos em Vila Velha e Piúma, melhorando a pontuação de qualidade.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

      </main>
    </div>
  );
}
