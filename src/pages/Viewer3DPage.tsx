import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import Scene3D from '../components/three/Scene3D';
import StateBadge from '../components/ui/StateBadge';
import { MOCK_FURNITURE } from '../data/furniture';
import type { User, Furniture } from '../types';

interface Props {
  user: User;
  onLogout: () => void;
}

export default function Viewer3DPage({ user, onLogout }: Props) {
  const location = useLocation();
  const initialFurniture = (location.state as any)?.furniture as Furniture | undefined;
  const [selected, setSelected] = useState<Furniture | null>(initialFurniture || null);

  return (
    <AppLayout user={user} onLogout={onLogout}>
      <div className="flex flex-col h-screen">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-dark-border">
          <div>
            <h1 className="text-lg font-extrabold mb-0.5">Visualiseur 3D</h1>
            <p className="text-xs text-gray-600">
              Modélisez l'intégration du mobilier dans un espace de travail
            </p>
          </div>
          <div className="text-[11px] text-gray-600 px-3.5 py-2 rounded-lg bg-dark-alt border border-dark-border">
            Clic + glisser · Molette pour zoomer
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Canvas */}
          <div className="flex-1 relative">
            <Scene3D furniture={selected} />
            {!selected && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="w-[60px] h-[60px] rounded-2xl bg-dark-alt border border-dark-border flex items-center justify-center mx-auto mb-4 text-gray-600">
                    <Box size={20} />
                  </div>
                  <p className="text-sm text-gray-500">Sélectionnez un meuble</p>
                  <p className="text-xs text-gray-600 mt-1">pour le visualiser dans l'espace 3D</p>
                </div>
              </div>
            )}
          </div>

          {/* Side panel */}
          <div className="w-[280px] border-l border-dark-border bg-dark-surface overflow-y-auto">
            <div className="px-4 py-3.5 border-b border-dark-border">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                Mobilier disponible
              </span>
            </div>
            <div className="p-2.5">
              {MOCK_FURNITURE.map((item) => {
                const active = selected?.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelected(active ? null : item)}
                    className={`w-full text-left p-3 rounded-xl mb-1 border transition-all cursor-pointer
                      ${active
                        ? 'bg-lime-accent/15 border-lime-accent/40'
                        : 'bg-transparent border-transparent hover:bg-white/[0.02]'
                      }`}
                  >
                    <div className="flex gap-2.5 items-start">
                      <div
                        className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: item.color + '33' }}
                      >
                        <div
                          className="w-2.5 h-2.5 rounded-sm"
                          style={{ backgroundColor: item.color }}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold truncate text-white">{item.name}</div>
                        <div className="text-[11px] text-gray-600 mt-0.5">{item.category}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[13px] font-bold text-lime-accent font-mono">
                            {item.price} €
                          </span>
                          <StateBadge stateKey={item.state} />
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
