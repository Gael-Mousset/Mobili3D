import { useNavigate } from 'react-router-dom';
import { ScanLine, Box, Eye, ChevronRight } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import { MOCK_FURNITURE } from '../data/furniture';
import type { User } from '../types';

interface Props {
  user: User;
  onLogout: () => void;
}

export default function DashboardPage({ user, onLogout }: Props) {
  const navigate = useNavigate();

  const stats = [
    { label: 'Meubles scannés', value: MOCK_FURNITURE.length, sub: '+3 ce mois' },
    { label: 'Entreprises', value: [...new Set(MOCK_FURNITURE.map((f) => f.company))].length },
    {
      label: 'Valeur estimée',
      value: MOCK_FURNITURE.reduce((s, f) => s + f.price * f.quantity, 0).toLocaleString('fr') + ' €',
    },
    { label: 'Modèles 3D', value: MOCK_FURNITURE.length, sub: '100% traités' },
  ];

  const actions = [
    { path: '/scanner', icon: ScanLine, title: 'Scanner un meuble', desc: 'Créez une fiche 3D en 3 étapes', accent: 'lime-accent' },
    { path: '/catalogue', icon: Box, title: 'Catalogue', desc: 'Parcourir les meubles disponibles', accent: 'cyan-400' },
    { path: '/viewer', icon: Eye, title: 'Visualiseur 3D', desc: 'Modéliser vos espaces', accent: 'amber-400' },
  ];

  return (
    <AppLayout user={user} onLogout={onLogout}>
      <div className="p-8 max-w-[960px]">
        <h1 className="text-2xl font-extrabold mb-1">Tableau de bord</h1>
        <p className="text-[13px] text-gray-600 mb-8">Bienvenue, {user.name}</p>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={i} className="p-6 rounded-2xl bg-dark-surface border border-dark-border">
              <div className="text-[28px] font-extrabold font-mono">{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              {s.sub && <div className="text-[11px] text-lime-accent mt-1">{s.sub}</div>}
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-3 gap-4">
          {actions.map((a) => {
            const Icon = a.icon;
            return (
              <button
                key={a.path}
                onClick={() => navigate(a.path)}
                className="p-7 rounded-2xl bg-dark-surface border border-dark-border text-left cursor-pointer
                           hover:border-dark-hover transition-colors group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-[10px] bg-${a.accent}/15 flex items-center justify-center text-${a.accent}`}>
                    <Icon size={18} />
                  </div>
                  <ChevronRight size={14} className="text-gray-700 group-hover:text-gray-400 transition-colors" />
                </div>
                <div className="text-[15px] font-bold text-white">{a.title}</div>
                <div className="text-xs text-gray-600 mt-1">{a.desc}</div>
              </button>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
