import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Box } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import StateBadge from '../components/ui/StateBadge';
import { MOCK_FURNITURE } from '../data/furniture';
import type { User } from '../types';

interface Props {
  user: User;
  onLogout: () => void;
}

export default function CataloguePage({ user, onLogout }: Props) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Tous');

  const categories = ['Tous', ...new Set(MOCK_FURNITURE.map((f) => f.category))];
  const filtered = filter === 'Tous' ? MOCK_FURNITURE : MOCK_FURNITURE.filter((f) => f.category === filter);

  return (
    <AppLayout user={user} onLogout={onLogout}>
      <div className="p-8 max-w-[1100px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold mb-1">Catalogue</h1>
            <p className="text-[13px] text-gray-600">
              {filtered.length} meuble{filtered.length > 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={() => navigate('/scanner')}
            className="flex items-center gap-2 px-6 py-3 rounded-[10px] border-none bg-lime-accent
                       text-black text-[13px] font-bold cursor-pointer"
          >
            <Plus size={16} /> Scanner un meuble
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all
                ${filter === c
                  ? 'bg-lime-accent/15 text-lime-accent border border-lime-accent/40'
                  : 'bg-dark-alt text-gray-500 border border-dark-border hover:border-dark-hover'
                }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate('/viewer', { state: { furniture: item } })}
              className="rounded-2xl bg-dark-surface border border-dark-border overflow-hidden
                         cursor-pointer hover:border-lime-accent/40 transition-colors"
            >
              {/* Preview */}
              <div
                className="h-[140px] flex items-center justify-center relative"
                style={{ background: `linear-gradient(135deg, ${item.color}22, ${item.color}08)` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-gray-600"
                  style={{ backgroundColor: item.color + '33' }}
                >
                  <Box size={18} />
                </div>
                <div className="absolute top-3 right-3">
                  <StateBadge stateKey={item.state} />
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="text-[11px] text-lime-accent font-semibold uppercase tracking-wider mb-1">
                  {item.category}
                </div>
                <div className="text-sm font-bold mb-2">{item.name}</div>
                <div className="text-xs text-gray-500 mb-1">{item.company}</div>
                <div className="text-[11px] text-gray-600">
                  {item.dimensions.w} × {item.dimensions.h} × {item.dimensions.d} cm · {item.brand}
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-dark-border">
                  <span className="text-lg font-extrabold text-lime-accent font-mono">
                    {item.price} €
                  </span>
                  <span className="text-[11px] text-gray-600">{item.quantity} dispo.</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
