import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

  const values = [
    { icon: '💎', title: 'Valorisation', desc: 'Valorisation des stocks de meubles professionnels dormants' },
    { icon: '♻️', title: 'Optimisation', desc: 'Optimiser et réutiliser le mobilier d\'entreprise existant' },
    { icon: '🏗️', title: 'Visualisation 3D', desc: 'Visualiser l\'intégration du mobilier grâce à la modélisation 3D des espaces de travail' },
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-white overflow-hidden">
      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(200,230,48,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,230,48,0.03) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
      <div className="fixed top-[-20%] left-[30%] w-[600px] h-[600px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(200,230,48,0.06),transparent_70%)]" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-10 py-5 border-b border-dark-border">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-[10px] bg-lime-accent flex items-center justify-center text-black">
            <Box size={18} />
          </div>
          <span className="text-lg font-extrabold tracking-tight">
            Mobili<span className="text-lime-accent">3D</span>
          </span>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2.5 rounded-[10px] border border-dark-border bg-transparent
                     text-white text-[13px] font-medium cursor-pointer
                     hover:border-lime-accent hover:text-lime-accent transition-all"
        >
          Se connecter
        </button>
      </nav>

      {/* Hero */}
      <section
        className={`relative z-10 max-w-[900px] mx-auto px-10 pt-24 pb-16 text-center
                     transition-all duration-[800ms] ease-out
                     ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="inline-block px-4 py-1.5 rounded-full mb-6 bg-lime-accent/15 border border-lime-accent/40 text-lime-accent text-[11px] font-bold tracking-[1.5px] uppercase">
          Plateforme B2B · Mobilier professionnel
        </div>

        <h1 className="text-[56px] font-black leading-[1.1] tracking-[-2px]">
          Donnez une seconde vie
          <br />
          <span className="text-lime-accent">à votre mobilier d'entreprise</span>
        </h1>

        <p className="mt-6 text-[17px] text-gray-500 leading-relaxed max-w-[600px] mx-auto">
          Scannez, cataloguez et visualisez vos stocks de meubles dormants en 3D.
          Optimisez la réutilisation et valorisez vos actifs mobilier.
        </p>

        <div className="mt-10">
          <button
            onClick={() => navigate('/login')}
            className="px-9 py-3.5 rounded-xl border-none bg-lime-accent text-black text-sm font-bold
                       cursor-pointer shadow-[0_8px_32px_rgba(200,230,48,0.15)]
                       hover:-translate-y-0.5 transition-transform"
          >
            Commencer maintenant
          </button>
        </div>
      </section>

      {/* Values */}
      <section
        className={`relative z-10 max-w-[900px] mx-auto px-10 pb-24
                     grid grid-cols-3 gap-5
                     transition-all duration-[800ms] ease-out delay-300
                     ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
      >
        {values.map((v, i) => (
          <div
            key={i}
            className="p-7 rounded-2xl bg-dark-surface border border-dark-border
                       hover:border-lime-accent/40 transition-colors"
          >
            <div className="text-[28px] mb-4">{v.icon}</div>
            <div className="text-[15px] font-bold mb-2">{v.title}</div>
            <div className="text-[13px] text-gray-500 leading-relaxed">{v.desc}</div>
          </div>
        ))}
      </section>

      <footer className="relative z-10 border-t border-dark-border px-10 py-6 text-center text-xs text-gray-700">
        © 2026 Mobili3D — MVP Prototype
      </footer>
    </div>
  );
}
