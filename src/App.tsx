import { cn } from './lib/utils';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  ComposedChart,
  Line,
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
  Sun,
  MapPin,
  Warning,
  MagnifyingGlass
} from '@phosphor-icons/react';
import React, { useEffect, useState, useRef } from 'react';

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
  { name: 'Fibramar', CPL: 15.29, fill: '#10b981' },
  { name: 'Sistel', CPL: 18.50, fill: '#333333' },
  { name: 'Média de Mercado', CPL: 21.00, fill: '#555555' },
  { name: 'Settefibra', CPL: 24.13, fill: '#333333' },
];

const googleCplData = [
  { name: 'Sistel', CPL: 8.05, fill: '#333333' },
  { name: 'Fibramar', CPL: 12.50, fill: '#10b981' },
  { name: 'Settefibra', CPL: 16.30, fill: '#333333' },
  { name: 'Média de Mercado', CPL: 25.00, fill: '#555555' },
];

const regionalData = [
  { region: 'Imirim', CPL: 8.04, leads: 53, fill: '#10b981' },
  { region: 'Benfica', CPL: 13.67, leads: 16, fill: '#10b981' },
  { region: 'Maricá', CPL: 14.34, leads: 59, fill: '#10b981' },
  { region: 'Saquarema', CPL: 14.80, leads: 14, fill: '#10b981' },
  { region: 'Muqui', CPL: 15.65, leads: 44, fill: '#f59e0b' },
  { region: 'Vila Velha', CPL: 18.17, leads: 36, fill: '#f59e0b' },
  { region: 'Piúma', CPL: 18.87, leads: 29, fill: '#f59e0b' },
];

const googleRegionalData = [
  { region: 'Maricá', CPL: 8.31, leads: 95, fill: '#10b981' },
  { region: 'Saquarema', CPL: 13.28, leads: 54, fill: '#10b981' },
  { region: 'Muqui/V. Velha', CPL: 16.37, leads: 19, fill: '#f59e0b' },
  { region: 'Santos Dumont', CPL: 21.38, leads: 20, fill: '#f59e0b' },
  { region: 'Mimoso do Sul', CPL: 22.35, leads: 5, fill: '#ef4444' },
  { region: 'Piúma/Anchieta', CPL: 35.58, leads: 14, fill: '#ef4444' },
];

const months = ['Jun', 'Jul', 'Ago', 'Set'];

const generateProjections = (regionalDataList: { region: string; CPL: number }[]) => {
  const investProgression = [600, 1000, 1600, 2500];
  
  return regionalDataList.map((regionData) => {
    return {
      region: regionData.region,
      baseCpl: regionData.CPL,
      data: months.map((month, idx) => {
        const invest = investProgression[idx];
        return {
          month,
          invest,
          leads: Math.round(invest / regionData.CPL),
          cpl: regionData.CPL
        };
      })
    };
  });
};

const metaProjections = generateProjections(regionalData);
const googleProjections = generateProjections(googleRegionalData);

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
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(150px circle at ${e.clientX}px ${e.clientY}px, rgba(255, 255, 255, 0.15) 0%, rgba(16, 185, 129, 0.08) 50%, transparent 100%)`;
      }
    };
    
    // Set initial background off-screen so it doesn't default to center/top-left before mouse moves
    if (spotlightRef.current) {
       spotlightRef.current.style.background = `radial-gradient(150px circle at -1000px -1000px, rgba(255, 255, 255, 0.15) 0%, rgba(16, 185, 129, 0.08) 50%, transparent 100%)`;
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#000000] text-gray-900 dark:text-white selection:bg-[#E31212]/40 pb-20 overflow-x-hidden font-sans transition-colors duration-300 relative">
      
      {/* Spotlight Hover Effect */}
      <div 
        ref={spotlightRef}
        className="pointer-events-none fixed inset-0 z-30 opacity-80 transition-opacity duration-300"
        style={{
          mixBlendMode: isDark ? 'screen' : 'multiply'
        }}
      />
      
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

      <main className="max-w-7xl mx-auto px-6 mt-24 space-y-64">
        
        {/* === HIGHLIGHT: INDICADORES PRINCIPAIS === */}
        <section className="w-full mt-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#111] border border-[#333] rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-2xl"
          >
            {/* CPL Meta */}
            <div className="p-8 md:p-10 flex-1 border-b md:border-b-0 md:border-r border-[#333] relative">
              <FacebookLogo size={24} weight="fill" className="absolute top-8 right-8 text-gray-500" />
              <span className="text-xs font-bold tracking-[0.1em] text-gray-500 uppercase mb-3 block">CPL Meta</span>
              <div className="text-3xl lg:text-4xl font-black text-white mb-3">R$15,29</div>
              <p className="text-sm text-gray-400">Média últimos 30 dias</p>
            </div>

            {/* CPL Google */}
            <div className="p-8 md:p-10 flex-1 border-b md:border-b-0 md:border-r border-[#333] relative">
              <GoogleLogo size={24} weight="fill" className="absolute top-8 right-8 text-gray-500" />
              <span className="text-xs font-bold tracking-[0.1em] text-gray-500 uppercase mb-3 block">CPL Google</span>
              <div className="text-3xl lg:text-4xl font-black text-white mb-3">R$12,50</div>
              <p className="text-sm text-gray-400">Média últimos 30 dias</p>
            </div>

            {/* Volume de Leads */}
            <div className="p-8 md:p-10 flex-1 border-b md:border-b-0 md:border-r border-[#333] relative">
              <Users size={24} weight="fill" className="absolute top-8 right-8 text-gray-500" />
              <span className="text-xs font-bold tracking-[0.1em] text-gray-500 uppercase mb-3 block">Volume de Leads</span>
              <div className="text-3xl lg:text-4xl font-black text-white mb-3">495</div>
              <p className="text-sm text-gray-400">Total captado no período</p>
            </div>

            {/* Volume de Investimento */}
            <div className="p-8 md:p-10 flex-1 relative">
              <Money size={24} weight="fill" className="absolute top-8 right-8 text-gray-500" />
              <span className="text-xs font-bold tracking-[0.1em] text-gray-500 uppercase mb-3 block">Investimento</span>
              <div className="text-3xl lg:text-4xl font-black text-white mb-3">R$ 7.710,36</div>
              <p className="text-sm text-gray-400">Volume dos últimos 30 dias</p>
            </div>
          </motion.div>
        </section>

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
                value={248} 
                delay={0.3}
                diffText="Volume bem superior à Sistel"
                icon={Users}
                tooltipText="Total de leads captados no período pela Fibramar"
              />
              <KPICard 
                title="Taxa de Conversão" 
                value={3.8} 
                suffix="%"
                delay={0.4}
                diffText="Melhoria clara frente à concorrência"
                icon={Lightning}
                tooltipText="Estimativa baseada no volume diário de conversões"
              />
            </div>
          </div>

          <div className="w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#222] p-6 md:p-10 rounded-md hover:border-gray-300 dark:hover:border-[#444] transition-colors duration-300 shadow-sm dark:shadow-none"
            >
              <div className="mb-8">
                <h3 className="text-gray-900 dark:text-white font-bold text-xl">Eficiência por CPL</h3>
                <p className="text-gray-500 dark:text-[#888] text-sm mt-1">Custo por Lead (Meta Ads) comparado aos principais concorrentes e mercado.</p>
              </div>
              
              <div className="h-[350px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metaCplData} margin={{ top: 25, right: 0, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#1A1A1A" : "#F3F4F6"} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#888' : '#4b5563', fontSize: 13, fontWeight: 'bold' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: isDark ? '#888' : '#6b7280', fontSize: 13 }} />
                    <Tooltip cursor={{ fill: isDark ? '#1A1A1A' : '#F9FAFB' }} formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'CPL']} contentStyle={{ backgroundColor: isDark ? '#111' : '#FFF', borderColor: isDark ? '#333' : '#E5E7EB', borderRadius: '4px', color: isDark ? '#FFF' : '#000' }} />
                    <ReferenceLine y={21} stroke="#ef4444" strokeWidth={2} strokeDasharray="3 3" opacity={0.5} />
                    <Bar dataKey="CPL" radius={[4, 4, 0, 0]} maxBarSize={100}>
                      <LabelList dataKey="CPL" position="top" formatter={(val: number) => `R$ ${val.toFixed(2)}`} fill={isDark ? '#AAA' : '#4b5563'} fontSize={13} fontWeight="bold" />
                      {metaCplData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-8 bg-[#10b981]/10 border border-[#10b981]/20 rounded-xl p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#10b981]/20 flex items-center justify-center flex-shrink-0 text-[#10b981]">
                  <Lightning weight="fill" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Custo Mais Baixo do Benchmark</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    A Fibramar apresentou o custo mais baixo no Meta Ads dentro do benchmark de mercado, 
                    representando <strong>R$ 15,29</strong> por lead gerado. Excelente eficiência comparada aos concorrentes diretos.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#111] border border-[#222] p-6 md:p-8 rounded-xl shadow-xl flex flex-col md:flex-row gap-6 items-start"
          >
            <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#0057ff]/10 text-[#0057ff] flex items-center justify-center">
              <Lightbulb size={32} weight="fill" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-black text-white mb-2">Próxima Etapa: Testes Criativos em Massa</h3>
              <p className="text-[#a3a3a3] text-base leading-relaxed">
                Com um CPL bem abaixo da concorrência, temos a folga ideal para testar variações de anúncios em massa (Meta e Google), focando na clareza da oferta e preservando a identidade visual da Fibramar.
              </p>
            </div>
          </motion.div>
        </section>


        {/* === SEÇÃO GOOGLE ADS === */}
        <section className="space-y-12">
          <div>
            <SectionTitle icon={GoogleLogo} title="Performance: Google Ads" colorClass="text-[#f59e0b]" bgClass="bg-[#f59e0b]/10" borderClass="border-[#f59e0b]/20" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard 
                title="CPL Fibramar (Google)" 
                value={12.50} 
                prefix="R$ " 
                decimals={2}
                delay={0.1}
                icon={Money}
                tooltipText="Custo de Aquisição Fibramar no Google Ads"
                bgClass="bg-emerald-50 dark:bg-emerald-900/20"
                colorClass="text-emerald-700 dark:text-emerald-400"
              />
              <KPICard 
                title="CPL Settefibra (Google)" 
                value={16.30} 
                prefix="R$ " 
                decimals={2}
                delay={0.2}
                diffText="Concorrente Direto"
                icon={Money}
                tooltipText="Custo de Aquisição Settefibra no Google Ads"
                bgClass="bg-red-50 dark:bg-red-900/20"
                colorClass="text-red-700 dark:text-red-400"
              />
              <KPICard 
                title="Volume de Leads (Google)" 
                value={231} 
                delay={0.3}
                diffText="Forte volume intencional"
                icon={Users}
                tooltipText="Volume consolidado com altíssima intenção de compra"
              />
              <KPICard 
                title="Taxa Conversão (Google)" 
                value={14.5} 
                suffix="%" 
                decimals={1}
                delay={0.4}
                diffText="Performance sólida na landing"
                icon={Target}
                tooltipText="Forte retenção de visitantes vindos da Busca"
              />
            </div>
          </div>

          <div className="w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#222] p-6 md:p-10 rounded-md hover:border-gray-300 dark:hover:border-[#444] transition-colors duration-300 shadow-sm dark:shadow-none"
            >
              <div className="mb-8">
                <h3 className="text-gray-900 dark:text-white font-bold text-xl">Eficiência por CPL</h3>
                <p className="text-gray-500 dark:text-[#888] text-sm mt-1">Custo por Lead (Google Ads) comparado aos concorrentes.</p>
              </div>
              
              <div className="h-[350px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={googleCplData} margin={{ top: 25, right: 0, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#1A1A1A" : "#F3F4F6"} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#888' : '#4b5563', fontSize: 13, fontWeight: 'bold' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: isDark ? '#888' : '#6b7280', fontSize: 13 }} />
                    <Tooltip cursor={{ fill: isDark ? '#1A1A1A' : '#F9FAFB' }} formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'CPL']} contentStyle={{ backgroundColor: isDark ? '#111' : '#FFF', borderColor: isDark ? '#333' : '#E5E7EB', borderRadius: '4px', color: isDark ? '#FFF' : '#000' }} />
                    <ReferenceLine y={25} stroke="#ef4444" strokeWidth={2} strokeDasharray="3 3" opacity={0.5} />
                    <Bar dataKey="CPL" radius={[4, 4, 0, 0]} maxBarSize={100}>
                      <LabelList dataKey="CPL" position="top" formatter={(val: number) => `R$ ${val.toFixed(2)}`} fill={isDark ? '#AAA' : '#4b5563'} fontSize={13} fontWeight="bold" />
                      {googleCplData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-8 bg-[#10b981]/10 border border-[#10b981]/20 rounded-xl p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#10b981]/20 flex items-center justify-center flex-shrink-0 text-[#10b981]">
                  <Lightning weight="fill" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Custo Abaixo da Média</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Custo interessante abaixo da média (<strong>R$ 12,50</strong>), principalmente em comparação à Settefibra, que é o cliente mais forte do benchmark.
                  </p>
                </div>
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
                title="CPL Imirim - Meta" 
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
                title="Leads Maricá - Meta" 
                value={59} 
                delay={0.2}
                diffText="Alto volume intencional"
                icon={Users}
                tooltipText="Região com excelente taxa de preenchimento de cadastro"
              />
              <KPICard 
                title="CPL Vila Velha - Meta" 
                value={18.17} 
                prefix="R$ " 
                decimals={2}
                delay={0.3}
                icon={Money}
                tooltipText="Custo acima da média local (Necessita testes criativos)"
              />
              <KPICard 
                title="CPL Piúma - Meta" 
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
                <h3 className="text-gray-900 dark:text-white font-bold text-xl uppercase tracking-wider">Distribuição de CPL por Região - Meta Ads (Fibramar)</h3>
              </div>
              
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regionalData} margin={{ top: 25, right: 0, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#1A1A1A" : "#F3F4F6"} />
                    <XAxis dataKey="region" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#888' : '#4b5563', fontSize: 11, fontWeight: 'bold' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: isDark ? '#888' : '#6b7280', fontSize: 12 }} />
                    <Tooltip cursor={{ fill: isDark ? '#1A1A1A' : '#F9FAFB' }} formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'CPL Regional']} contentStyle={{ backgroundColor: isDark ? '#111' : '#FFF', borderColor: isDark ? '#333' : '#E5E7EB', borderRadius: '4px', color: isDark ? '#FFF' : '#000' }} />
                    <ReferenceLine y={15.29} stroke="#ef4444" strokeWidth={2} strokeDasharray="3 3" opacity={0.9} label={{ position: 'insideTopLeft', value: 'Média Meta (R$ 15,29)', fill: '#ef4444', fontSize: 12, fontWeight: 'bold', offset: 15, dy: -30 }} />
                    <Bar dataKey="CPL" radius={[4, 4, 0, 0]} maxBarSize={60}>
                      <LabelList dataKey="CPL" position="top" offset={10} formatter={(val: number) => `R$ ${val.toFixed(2)}`} fill={isDark ? '#AAA' : '#4b5563'} fontSize={11} fontWeight="bold" />
                      {regionalData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} stroke={index === 0 ? "#10b981" : "none"} strokeWidth={index === 0 ? 2 : 0} />)}
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <KPICard 
                title="CPL Imirim - Google" 
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
                title="CPL Vila Velha - Google" 
                value={17.50} 
                prefix="R$ " 
                decimals={2}
                delay={0.3}
                icon={Money}
                tooltipText="Competitividade local alta nos leilões do Google"
              />
              <KPICard 
                title="CPL Piúma - Google" 
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
                  <h3 className="text-gray-900 dark:text-white font-bold text-xl uppercase tracking-wider">Distribuição de CPL por Região - Google Ads (Fibramar)</h3>
                </div>
              </div>
              
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={googleRegionalData} margin={{ top: 25, right: 0, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#1A1A1A" : "#F3F4F6"} />
                    <XAxis dataKey="region" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#888' : '#4b5563', fontSize: 11, fontWeight: 'bold' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: isDark ? '#888' : '#6b7280', fontSize: 12 }} />
                    <Tooltip cursor={{ fill: isDark ? '#1A1A1A' : '#F9FAFB' }} formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'CPL Regional']} contentStyle={{ backgroundColor: isDark ? '#111' : '#FFF', borderColor: isDark ? '#333' : '#E5E7EB', borderRadius: '4px', color: isDark ? '#FFF' : '#000' }} />
                    <ReferenceLine y={12.50} stroke="#ef4444" strokeWidth={2} strokeDasharray="3 3" opacity={0.9} label={{ position: 'insideTopLeft', value: 'Média Google (R$ 12,50)', fill: '#ef4444', fontSize: 12, fontWeight: 'bold', offset: 15, dy: -30 }} />
                    <Bar dataKey="CPL" radius={[4, 4, 0, 0]} maxBarSize={60}>
                      <LabelList dataKey="CPL" position="top" offset={10} formatter={(val: number) => `R$ ${val.toFixed(2)}`} fill={isDark ? '#AAA' : '#4b5563'} fontSize={11} fontWeight="bold" />
                      {googleRegionalData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} stroke={index === 0 ? "#10b981" : "none"} strokeWidth={index === 0 ? 2 : 0} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#111] border border-[#222] p-6 md:p-8 rounded-xl shadow-xl flex flex-col md:flex-row gap-6 items-start"
            >
              <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#10b981]/10 text-[#10b981] flex items-center justify-center">
                <MapPin size={32} weight="fill" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-2">Eficiência Extrema: Maricá</h3>
                <p className="text-[#a3a3a3] text-base leading-relaxed">
                  <strong>Maricá/RJ</strong> é a praça mais rentável (CPL R$ 8,31), com grande volume. O público de 25-44 anos é o motor dessa performance.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#111] border border-[#222] p-6 md:p-8 rounded-xl shadow-xl flex flex-col md:flex-row gap-6 items-start"
            >
              <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#f59e0b]/10 text-[#f59e0b] flex items-center justify-center">
                <Target size={32} weight="fill" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-2">Saquarema: Conversão Público Sênior</h3>
                <p className="text-[#a3a3a3] text-base leading-relaxed">
                  Em Saquarema (CPL R$ 13,28), o público sênior (55-64 anos) bateu incríveis 62,5% de conversão a R$ 5,95/lead.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#111] border border-[#222] p-6 md:p-8 rounded-xl shadow-xl flex flex-col md:flex-row gap-6 items-start"
            >
              <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#ef4444]/10 text-[#ef4444] flex items-center justify-center">
                <Warning size={32} weight="fill" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-2">Atenção: Piúma e Anchieta</h3>
                <p className="text-[#a3a3a3] text-base leading-relaxed">
                  Recomendamos manter/segurar o investimento nessas regiões e revisar com mais detalhe o posicionamento ideal para essas regiões e conferir tamanho total de público, se faz sentido a gente seguir com escala.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-[#111] border border-[#222] p-6 md:p-8 rounded-xl shadow-xl flex flex-col md:flex-row gap-6 items-start"
            >
              <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <MagnifyingGlass size={32} weight="fill" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-2">Ausência de Volume: Benfica</h3>
                <p className="text-[#a3a3a3] text-base leading-relaxed">
                  A região de <strong>Benfica</strong> não obteve volume de buscas relevante na Rede de Pesquisa do Google Ads para ser incluída no comparativo de performance regional.
                </p>
              </div>
            </motion.div>
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

        {/* === MÓDULO: PROJEÇÃO & PRÓXIMOS PASSOS === */}
        <section className="pb-24 pt-8">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight flex items-center justify-center md:justify-start gap-4">
              <ListChecks className="text-[#f97316]" weight="fill" />
              Plano de Ação e Projeção (Fibramar)
            </h2>
            <div className="h-1 w-full max-w-sm bg-gradient-to-r from-[#f97316] to-transparent mt-6 rounded-full mx-auto md:mx-0"></div>
          </div>

          <div className="flex flex-col gap-8 mb-12 w-full">
            
            {/* Meta Projections */}
            <div className="w-full">
              <h3 className="text-2xl font-bold text-gray-300 uppercase tracking-widest mb-6">Meta Ads: Projeções por Região</h3>
              <div className="flex flex-col gap-6">
                {metaProjections.map((proj, idx) => (
                  <motion.div 
                    key={`meta-${proj.region}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="bg-[#111] border border-[#222] p-8 rounded-xl relative overflow-hidden shadow-2xl w-full"
                  >
                    <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                       <h3 className="text-white font-black text-xl flex items-center gap-2"><FacebookLogo className="text-[#1877F2]" weight="fill" /> {proj.region}</h3>
                       <div className="px-4 py-2 bg-[#1877F2]/10 border border-[#1877F2]/30 rounded-lg">
                          <p className="text-[#1877F2] font-bold text-sm">CPL Base: R$ {proj.baseCpl.toFixed(2)}</p>
                       </div>
                    </div>
                    <div className="h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={proj.data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
                          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 11, fontWeight: 'bold' }} dy={10} />
                          <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 11 }} tickFormatter={(val) => `R$${val}`} />
                          <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 11 }} />
                          <Tooltip cursor={{ fill: '#1A1A1A' }} contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '4px', color: '#FFF' }} />
                          <Bar yAxisId="left" dataKey="invest" fill="#1877F2" name="Investimento (R$)" radius={[4, 4, 0, 0]} maxBarSize={40} fillOpacity={0.8} />
                          <Line yAxisId="right" type="monotone" dataKey="leads" name="Volume Leads" stroke="#10b981" strokeWidth={3} strokeDasharray="5 5" activeDot={{ r: 6 }} />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Google Projections */}
            <div className="w-full mt-8">
              <h3 className="text-2xl font-bold text-gray-300 uppercase tracking-widest mb-6">Google Ads: Projeções por Região</h3>
              <div className="flex flex-col gap-6">
                {googleProjections.map((proj, idx) => (
                  <motion.div 
                    key={`google-${proj.region}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="bg-[#111] border border-[#222] p-8 rounded-xl relative overflow-hidden shadow-2xl w-full"
                  >
                     <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                       <h3 className="text-white font-black text-xl flex items-center gap-2"><GoogleLogo className="text-[#EA4335]" weight="fill" /> {proj.region}</h3>
                       <div className="px-4 py-2 bg-[#EA4335]/10 border border-[#EA4335]/30 rounded-lg">
                          <p className="text-[#EA4335] font-bold text-sm">CPL Base: R$ {proj.baseCpl.toFixed(2)}</p>
                       </div>
                    </div>
                    <div className="h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={proj.data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
                          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 11, fontWeight: 'bold' }} dy={10} />
                          <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 11 }} tickFormatter={(val) => `R$${val}`} />
                          <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 11 }} />
                          <Tooltip cursor={{ fill: '#1A1A1A' }} contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '4px', color: '#FFF' }} />
                          <Bar yAxisId="left" dataKey="invest" fill="#EA4335" name="Investimento (R$)" radius={[4, 4, 0, 0]} maxBarSize={40} fillOpacity={0.8} />
                          <Line yAxisId="right" type="monotone" dataKey="leads" name="Volume Leads" stroke="#10b981" strokeWidth={3} strokeDasharray="5 5" activeDot={{ r: 6 }} />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          <div className="mt-16 mb-8">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#f97316] to-transparent opacity-50 mb-8"></div>
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider text-center md:text-left mb-6">Próximas Etapas</h3>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white dark:bg-[#0A0A0A] p-6 rounded-xl border border-gray-200 dark:border-[#222] shadow-sm dark:shadow-none hover:border-[#f97316]/50 transition-colors flex flex-col md:flex-row gap-5 items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-[#f97316]/20 text-orange-600 dark:text-[#f97316] flex items-center justify-center font-bold text-xl">1</div>
              </div>
              <div>
                <h4 className="text-gray-900 dark:text-white font-black text-xl mb-2">Redistribuição de Orçamento</h4>
                <p className="text-gray-600 dark:text-[#888] text-[15px] leading-relaxed">
                  Focar verba em Imirim e Maricá onde o CPL é baixo (R$ 8,04 a R$ 8,31), reduzindo onde o CAC está alto (Vila Velha e Piúma) até testarmos novos formatos.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0A0A0A] p-6 rounded-xl border border-gray-200 dark:border-[#222] shadow-sm dark:shadow-none hover:border-[#f97316]/50 transition-colors flex flex-col md:flex-row gap-5 items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-[#f97316]/20 text-orange-600 dark:text-[#f97316] flex items-center justify-center font-bold text-xl">2</div>
              </div>
              <div>
                <h4 className="text-gray-900 dark:text-white font-black text-xl mb-2">Escala Consciente no Google</h4>
                <p className="text-gray-600 dark:text-[#888] text-[15px] leading-relaxed">
                  Recomendamos aumentar a escala de investimento nessas regiões de métrica de custo por lead mais baixo.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0A0A0A] p-6 rounded-xl border border-gray-200 dark:border-[#222] shadow-sm dark:shadow-none hover:border-[#f97316]/50 transition-colors flex flex-col md:flex-row gap-5 items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-[#10b981]/20 text-emerald-600 dark:text-[#10b981] flex items-center justify-center font-bold text-xl shadow-[0_0_15px_rgba(16,185,129,0.3)]">3</div>
              </div>
              <div>
                <h4 className="text-gray-900 dark:text-white font-black text-xl mb-2">Cross-Sell na Aquisição</h4>
                <p className="text-gray-600 dark:text-[#888] text-[15px] leading-relaxed">
                  Implementar estratégias de ofertas complementares (como pontos extras ou serviços agregados) no momento do fechamento da venda para aumentar o ticket médio e recuperar o custo de aquisição de forma mais acelerada.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0A0A0A] p-6 rounded-xl border border-gray-200 dark:border-[#222] shadow-sm dark:shadow-none hover:border-[#f97316]/50 transition-colors flex flex-col md:flex-row gap-5 items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xl">4</div>
              </div>
              <div>
                <h4 className="text-gray-900 dark:text-white font-black text-xl mb-2">Testes de Criativos por Região</h4>
                <p className="text-gray-600 dark:text-[#888] text-[15px] leading-relaxed">
                  Testar mais criativos com base naqueles que melhor performaram nas melhores regiões. Realizar testes estruturados em relação a eles para escalar e implementar nessas praças com custo e eficiência ainda melhores.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0A0A0A] p-6 rounded-xl border border-gray-200 dark:border-[#222] shadow-sm dark:shadow-none hover:border-[#f97316]/50 transition-colors flex flex-col md:flex-row gap-5 items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-xl">5</div>
              </div>
              <div>
                <h4 className="text-gray-900 dark:text-white font-black text-xl mb-2">Foco em Criativos em Motion</h4>
                <p className="text-gray-600 dark:text-[#888] text-[15px] leading-relaxed">
                  Trabalhar mais criativos animados no formato motion. Vídeos em motion graphics e dinâmicos retêm mais a atenção do usuário no feed, aumentando a taxa de cliques e otimizando o Custo por Lead final.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
