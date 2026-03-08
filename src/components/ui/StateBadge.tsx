import { STATES } from '../../data/furniture';
import type { FurnitureStateKey } from '../../types';

interface Props {
  stateKey: FurnitureStateKey;
  size?: 'sm' | 'md';
}

export default function StateBadge({ stateKey, size = 'sm' }: Props) {
  const state = STATES.find((s) => s.key === stateKey) ?? STATES[0];

  const colors: Record<string, string> = {
    A: 'bg-lime-accent/15 text-lime-accent',
    B: 'bg-green-500/12 text-green-400',
    C: 'bg-white/5 text-gray-400',
  };

  const sizeClass = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-[13px] px-3 py-1';

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-semibold ${colors[stateKey]} ${sizeClass}`}>
      {'★'.repeat(state.stars)} {state.label}
    </span>
  );
}
