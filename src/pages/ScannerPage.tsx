import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Camera, RotateCcw, Search, Target, Package, Upload, Download } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import Stepper from '../components/ui/Stepper';
import StateBadge from '../components/ui/StateBadge';
import Scene3D from '../components/three/Scene3D';
import { CATEGORIES, STATES } from '../data/furniture';
import type { User, ScannerMeta, ProcessingProgress, FurnitureStateKey } from '../types';

interface Props {
  user: User;
  onLogout: () => void;
}

export default function ScannerPage({ user, onLogout }: Props) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [meta, setMeta] = useState<ScannerMeta>({
    category: 'Chaise de bureau',
    brand: 'Steelcase',
    w: '62', h: '118', d: '58',
    qty: '6',
    material: 'Noir / tissu mesh',
    state: 'A',
    notes: '',
  });
  const [progress, setProgress] = useState<ProcessingProgress>({ keys: 0, align: 0, mesh: 0, tex: 0 });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files) return;

  const newImages = Array.from(files).map((file) => URL.createObjectURL(file));

  setImages((prev) => [...prev, ...newImages]);
};

  const stepLabels = ['Photos', 'Métadonnées', 'Traitement 3D', 'Fiche prête'];

  const startProcessing = () => {
    setStep(2);
    const stages: (keyof ProcessingProgress)[] = ['keys', 'align', 'mesh', 'tex'];
    let i = 0;
    const run = () => {
      if (i >= stages.length) {
        setTimeout(() => setStep(3), 500);
        return;
      }
      const s = stages[i];
      let p = 0;
      const iv = setInterval(() => {
        p += Math.random() * 15 + 5;
        if (p >= 100) {
          p = 100;
          clearInterval(iv);
          i++;
          setTimeout(run, 300);
        }
        setProgress((prev) => ({ ...prev, [s]: Math.min(100, Math.round(p)) }));
      }, 120);
    };
    run();
  };

  const result = {
    id: 'new',
    name: `${meta.category.includes('Chaise') ? 'Chaise' : meta.category} ${meta.brand}`,
    category: meta.category,
    brand: meta.brand,
    dimensions: { w: Number(meta.w) || 62, h: Number(meta.h) || 118, d: Number(meta.d) || 58 },
    state: meta.state as FurnitureStateKey,
    company: user.company,
    material: meta.material,
    quantity: Number(meta.qty) || 1,
    assetId: `RF-2026-${String(Math.floor(Math.random() * 9000 + 1000))}`,
    price: 340,
    priceMin: 280,
    priceMax: 420,
    priceRef: 1200,
    salesCount: 47,
    polygons: 47412,
    color: '#2d8a4e',
  };

  const inputClass = `w-full px-4 py-3.5 rounded-[10px] bg-dark-alt border border-dark-border
    text-white text-sm outline-none transition-colors
    focus:border-lime-accent/40 placeholder:text-gray-600`;

  const labelClass = 'block text-[11px] font-bold text-gray-500 mb-2 uppercase tracking-widest';

  return (
    <AppLayout user={user} onLogout={onLogout}>
      <div className="px-10 py-6 max-w-[880px] mx-auto">
        <h1 className="text-[28px] font-black mb-1">Scanner un meuble</h1>
        <p className="text-sm text-gray-600">
          Créez une fiche 3D complète en 3 étapes — moins de 5 minutes
        </p>

        <Stepper steps={stepLabels} current={step} />

        {/* ─── STEP 0: Photos ─── */}
        {step === 0 && (
          <div className="animate-fade-in">
            <div className="py-16 px-10 rounded-2xl border-2 border-dashed border-dark-border bg-dark-surface text-center mb-6">
              <Camera size={40} className="mx-auto mb-4 text-gray-600" />
              <h3 className="text-xl font-bold mb-2">Déposez vos photos ici</h3>
              <p className="text-[13px] text-gray-600 leading-relaxed">
                Prenez 20–40 photos en tournant autour du meuble<br />
                Format JPG, PNG · Max 10 Mo par photo
              </p>
              <input type="file" ref={fileInputRef} multiple accept="image/png, image/jpeg, image/webp " className="hidden" onChange={handleFiles}/>
              <button onClick={() => fileInputRef.current?.click()} className="mt-5 px-8 py-3.5 rounded-[10px] border-none bg-lime-accent text-black text-sm font-bold cursor-pointer uppercase tracking-wider">
                Sélectionner des photos
              </button>
            </div>

            {/* Mock thumbnails */}
            <div className="flex gap-2.5 flex-wrap mb-8">
              {images.map((img, i) => (
               <div
                  key={i}
                  className="w-[100px] h-[100px] rounded-xl border border-dark-border overflow-hidden"
                >
                  <img
                    src={img}
                    alt={`upload-${i}`}
                    className="w-full h-full object-cover"
                />
             </div>
  ))}
</div>

            <div className="flex justify-end">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 px-8 py-3 rounded-[10px] border-none bg-lime-accent text-black text-sm font-bold cursor-pointer"
              >
                Continuer <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 1: Metadata ─── */}
        {step === 1 && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-2 gap-5 mb-5">
              <div>
                <label className={labelClass}>Catégorie *</label>
                <select
                  value={meta.category}
                  onChange={(e) => setMeta({ ...meta, category: e.target.value })}
                  className={`${inputClass} appearance-auto`}
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Marque</label>
                <input value={meta.brand} onChange={(e) => setMeta({ ...meta, brand: e.target.value })} className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 mb-5">
              <div>
                <label className={labelClass}>Largeur (cm)</label>
                <input type="number" value={meta.w} onChange={(e) => setMeta({ ...meta, w: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Hauteur (cm)</label>
                <input type="number" value={meta.h} onChange={(e) => setMeta({ ...meta, h: e.target.value })} className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 mb-5">
              <div>
                <label className={labelClass}>Profondeur (cm)</label>
                <input type="number" value={meta.d} onChange={(e) => setMeta({ ...meta, d: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Quantité disponible</label>
                <input type="number" value={meta.qty} onChange={(e) => setMeta({ ...meta, qty: e.target.value })} className={inputClass} />
              </div>
            </div>

            <div className="mb-5">
              <label className={labelClass}>Couleur / Matière</label>
              <input value={meta.material} onChange={(e) => setMeta({ ...meta, material: e.target.value })} className={inputClass} />
            </div>

            {/* State selector */}
            <div className="mb-7">
              <label className={labelClass}>État du mobier</label>
              <div className="grid grid-cols-3 gap-3">
                {STATES.map((s) => {
                  const active = meta.state === s.key;
                  return (
                    <button
                      key={s.key}
                      onClick={() => setMeta({ ...meta, state: s.key })}
                      className={`py-4 px-3 rounded-xl cursor-pointer text-center text-[13px] font-semibold transition-all
                        ${active
                          ? 'bg-lime-accent/[0.08] border-2 border-lime-accent/40 text-lime-accent'
                          : 'bg-dark-alt border border-dark-border text-gray-500 hover:border-dark-hover'
                        }`}
                    >
                      <div className="mb-1">{'⭐'.repeat(s.stars)}</div>
                      {s.key} — {s.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-7">
              <label className={labelClass}>Notes / Observations</label>
              <textarea
                value={meta.notes}
                onChange={(e) => setMeta({ ...meta, notes: e.target.value })}
                rows={3}
                className={`${inputClass} resize-y`}
                placeholder="Légères traces d'usure sur l'assise..."
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(0)}
                className="flex items-center gap-1.5 px-6 py-3 rounded-[10px] border border-dark-border
                           bg-transparent text-gray-500 text-[13px] cursor-pointer"
              >
                <ChevronLeft size={14} /> Retour
              </button>
              <button
                onClick={startProcessing}
                className="flex items-center gap-2 px-8 py-3 rounded-[10px] border-none bg-lime-accent
                           text-black text-sm font-bold cursor-pointer"
              >
                Lancer le traitement 3D <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 2: Processing ─── */}
        {step === 2 && (
          <div className="p-10 rounded-[20px] bg-dark-surface border border-dark-border text-center animate-fade-in">
            <div className="w-[100px] h-[100px] mx-auto mb-6 relative">
              <svg width="100" height="100" viewBox="0 0 100 100" className="animate-spin-slow">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#2a2a2a" strokeWidth="3" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="#06b6d4" strokeWidth="3" strokeDasharray="80 200" strokeLinecap="round" />
                <circle cx="50" cy="50" r="34" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="60 200" strokeLinecap="round" className="animate-spin-slow-reverse" />
              </svg>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">🪑</div>
            </div>

            <h3 className="text-[22px] font-extrabold mb-2">
              {progress.tex >= 100
                ? 'Finalisation...'
                : progress.mesh > 0
                ? 'Application des textures UV...'
                : progress.align > 0
                ? 'Génération du maillage...'
                : 'Détection des points clés...'}
            </h3>
            <p className="text-[13px] text-gray-600 mb-8">Projection des couleurs</p>

            <div className="max-w-[600px] mx-auto text-left">
              {[
                { label: 'Détection des points clés', val: progress.keys, color: '#c8e630' },
                { label: 'Alignement des images', val: progress.align, color: '#22c55e' },
                { label: 'Génération du maillage', val: progress.mesh, color: '#f59e0b' },
                { label: 'Application des textures', val: progress.tex, color: '#d946ef' },
              ].map((bar, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className={bar.val > 0 ? 'text-gray-500' : 'text-gray-700'}>{bar.label}</span>
                    <span className="font-mono">{bar.val}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-dark-alt overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${bar.val}%`, backgroundColor: bar.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── STEP 3: Fiche prête ─── */}
        {step === 3 && (
          <div className="grid grid-cols-2 gap-6 animate-fade-in">
            {/* 3D preview */}
            <div className="rounded-2xl bg-dark-surface border border-dark-border overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-dark-border">
                <span className="text-sm font-bold">Modèle 3D — {result.name}</span>
                <div className="flex gap-1.5">
                  {[RotateCcw, Search, Target, Package].map((Icon, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer
                        ${i === 0 ? 'bg-lime-accent text-black' : 'bg-dark-alt text-gray-600'}`}
                    >
                      <Icon size={16} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-[360px]">
                <Scene3D furniture={result} />
              </div>
              <div className="flex justify-between px-5 py-2.5 border-t border-dark-border text-[11px] text-gray-600">
                <span>🖱 Glisser pour pivoter · ⚙ Molette pour zoomer</span>
                <span className="text-lime-accent">✓ {result.polygons.toLocaleString('fr')} polygones</span>
              </div>
            </div>

            {/* Product sheet */}
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl bg-dark-surface border border-dark-border p-6">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-5">
                  Fiche produit
                </h4>
                {[
                  ['Catégorie', result.category],
                  ['Marque', result.brand],
                  ['Dimensions', `${result.dimensions.w} × ${result.dimensions.d} × ${result.dimensions.h} cm`],
                  ['Matière', result.material],
                  ['État', '__badge__'],
                  ['Quantité', `${result.quantity} unités`],
                  ['ID actif', result.assetId],
                ].map(([label, val], i) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center py-2.5 ${i < 6 ? 'border-b border-dark-border' : ''}`}
                  >
                    <span className="text-[13px] text-gray-500">{label}</span>
                    {val === '__badge__' ? (
                      <StateBadge stateKey={result.state} />
                    ) : (
                      <span className={`text-sm font-semibold ${val === result.assetId ? 'font-mono' : ''}`}>
                        {val}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* AI Price */}
              <div className="rounded-2xl bg-dark-surface border border-dark-border p-6 text-center">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                  Prix suggéré IA
                </h4>
                <div className="text-[52px] font-black text-lime-accent font-mono leading-none">
                  {result.price} <span className="text-[32px]">€</span>
                </div>
                <div className="text-xs text-gray-600 mt-2">prix unitaire recommandé</div>
                <div className="text-[13px] text-gray-500 mt-2">
                  Min {result.priceMin} € — Max {result.priceMax} €
                </div>
                <div className="text-[11px] text-gray-600 mt-3">
                  Basé sur {result.salesCount} ventes récentes · Neuf à ~{result.priceRef.toLocaleString('fr')} €
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate('/catalogue')}
                  className="flex items-center justify-center gap-2 py-4 rounded-xl border-none
                             bg-lime-accent text-black text-sm font-bold cursor-pointer"
                >
                  <Upload size={16} /> Publier
                </button>
                <button
                  className="flex items-center justify-center gap-2 py-4 rounded-xl
                             border-2 border-cyan-400 bg-transparent text-cyan-400
                             text-sm font-bold cursor-pointer"
                >
                  <Download size={16} /> GLB
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
