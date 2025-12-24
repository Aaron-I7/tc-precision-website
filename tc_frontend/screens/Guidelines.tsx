
import React from 'react';

const Guidelines: React.FC = () => {
  return (
    <div className="flex-1 flex justify-center py-10 px-6 bg-paper-white dark:bg-zinc-950">
      <div className="flex flex-col max-w-[960px] w-full gap-16">
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-industrial-grey dark:text-white w-fit">
              <span className="size-2 rounded-full bg-industrial-grey animate-pulse"></span>
              <span className="text-xs font-bold tracking-wider uppercase">v2.4.0 Updated</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em] text-industrial-grey dark:text-white">
              Visual Guidelines
            </h1>
            <p className="text-steel-blue dark:text-gray-400 text-lg font-normal leading-relaxed max-w-2xl">
              Design standards for Tengchang Precision Machinery interfaces. Emphasizing precision, reliability, and minimalist industrial aesthetics.
            </p>
          </div>
          <div className="h-px w-full bg-gray-200 dark:bg-zinc-800"></div>
        </section>

        {/* Color Palette */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-steel-blue font-mono text-sm font-bold">01</span>
            <h2 className="text-2xl font-bold tracking-tight">Color Palette</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ColorCard 
              bg="bg-primary" 
              name="Precision Silver" 
              hex="#D1D5DB" 
              tag="Primary" 
              desc="Clean, professional emphasis. Used for primary actions and active states."
              icon="bolt"
            />
            <ColorCard 
              bg="bg-industrial-grey" 
              name="Industrial Grey" 
              hex="#1A1A1A" 
              tag="Surface" 
              desc="Core brand color. Used for primary text and dark mode surfaces."
              icon="factory"
              isDark
            />
            <ColorCard 
              bg="bg-steel-blue" 
              name="Steel Blue" 
              hex="#4A5568" 
              tag="Secondary" 
              desc="Technical accent. Used for diagrams and secondary information."
              icon="architecture"
              isDark
            />
            <ColorCard 
              bg="bg-paper-white" 
              name="Paper White" 
              hex="#F8F8F5" 
              tag="Background" 
              desc="Warm off-white background to reduce eye strain in lit workshops."
              icon="check_box_outline_blank"
            />
          </div>
        </section>

        {/* Typography */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-steel-blue font-mono text-sm font-bold">02</span>
            <h2 className="text-2xl font-bold tracking-tight">Typography</h2>
          </div>
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:w-1/3 flex flex-col gap-2">
              <h3 className="text-6xl font-black tracking-tighter text-industrial-grey dark:text-white">Aa</h3>
              <p className="text-lg font-bold mt-2">Spline Sans</p>
              <p className="text-sm text-steel-blue dark:text-gray-400">A grotesque sans-serif designed for legibility in UI interfaces. Technical yet approachable.</p>
              <div className="flex gap-2 mt-4">
                {['400', '500', '700'].map(w => (
                  <span key={w} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-zinc-800 text-xs font-mono">{w}</span>
                ))}
              </div>
            </div>
            <div className="lg:w-2/3 flex flex-col gap-8 bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
              <TypeSample label="Display / H1" text="Precision Machining Center" type="h1" />
              <TypeSample label="Heading / H2" text="Operational efficiency & safety protocols" type="h2" />
              <TypeSample label="Body / Regular" text="All personnel must adhere to the visual safety guidelines when operating heavy machinery." type="body" />
              <TypeSample label="Caption / Mono Data" text="ID: #492-AX  |  STATUS: OPERATIONAL  |  TEMP: 42°C" type="caption" />
            </div>
          </div>
        </section>

        {/* Core Components */}
        <section className="pb-20">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-steel-blue font-mono text-sm font-bold">03</span>
            <h2 className="text-2xl font-bold tracking-tight">Core Components</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
            <div className="flex flex-col gap-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-steel-blue border-b border-gray-200 dark:border-zinc-800 pb-2 mb-2">Interactive Elements</h3>
              <div className="flex flex-wrap items-center gap-4">
                <button className="h-12 px-8 rounded-full bg-primary text-industrial-grey text-sm font-bold shadow-sm hover:brightness-105 active:scale-95 transition-all">Primary Action</button>
                <button className="h-12 px-8 rounded-full bg-industrial-grey text-white text-sm font-bold shadow-sm hover:bg-zinc-800 active:scale-95 transition-all">Secondary Action</button>
                <button className="h-12 px-6 rounded-full border border-gray-200 dark:border-zinc-700 text-industrial-grey dark:text-white text-sm font-bold hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all">Tertiary</button>
                <button className="size-12 rounded-full bg-primary text-industrial-grey flex items-center justify-center hover:rotate-90 transition-transform">
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-steel-blue border-b border-gray-200 dark:border-zinc-800 pb-2 mb-2">Data Surface</h3>
              <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-2 rounded-full">
                      <span className="material-symbols-outlined text-xl">settings_motion_mode</span>
                    </div>
                    <div>
                      <h4 className="font-bold">CNC Lathe M-04</h4>
                      <p className="text-xs text-steel-blue dark:text-gray-400 font-mono">IP: 192.168.0.14</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-primary text-industrial-grey text-xs font-bold">RUNNING</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 bg-paper-white dark:bg-zinc-800 rounded-xl">
                    <span className="text-xs text-steel-blue dark:text-gray-400 uppercase font-bold tracking-wider">RPM</span>
                    <p className="text-xl font-mono font-bold mt-1">2,450</p>
                  </div>
                  <div className="p-3 bg-paper-white dark:bg-zinc-800 rounded-xl">
                    <span className="text-xs text-steel-blue dark:text-gray-400 uppercase font-bold tracking-wider">Load</span>
                    <p className="text-xl font-mono font-bold mt-1">84%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const ColorCard = ({ bg, name, hex, tag, desc, icon, isDark = false }: { bg: string, name: string, hex: string, tag: string, desc: string, icon: string, isDark?: boolean }) => (
  <div className="group flex flex-col gap-3">
    <div className={`aspect-[4/3] rounded-2xl ${bg} shadow-sm flex items-end p-4 transition-transform group-hover:scale-[1.02] border border-black/5`}>
      <span className={`material-symbols-outlined ${isDark ? 'text-white' : 'text-industrial-grey'} text-3xl`}>{icon}</span>
    </div>
    <div>
      <h3 className="font-bold text-lg">{name}</h3>
      <div className="flex justify-between items-center text-sm mt-1">
        <span className="font-mono text-steel-blue dark:text-gray-400">{hex}</span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-500">{tag}</span>
      </div>
      <p className="text-xs text-gray-500 mt-2 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const TypeSample = ({ label, text, type }: { label: string, text: string, type: 'h1' | 'h2' | 'body' | 'caption' }) => (
  <div className="flex flex-col gap-1 border-b border-gray-100 dark:border-zinc-800 pb-6 last:border-0 last:pb-0">
    <span className="text-xs font-mono text-steel-blue dark:text-gray-500 uppercase tracking-wider mb-2">{label}</span>
    {type === 'h1' && <p className="text-4xl font-black leading-tight tracking-[-0.02em]">{text}</p>}
    {type === 'h2' && <p className="text-2xl font-bold leading-tight">{text}</p>}
    {type === 'body' && <p className="text-base font-normal leading-relaxed text-steel-blue dark:text-gray-300">{text}</p>}
    {type === 'caption' && <p className="text-xs font-mono text-steel-blue dark:text-gray-400">{text}</p>}
  </div>
);

export default Guidelines;
