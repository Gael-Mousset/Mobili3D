import { Check } from 'lucide-react';

interface Props {
  steps: string[];
  current: number;
}

export default function Stepper({ steps, current }: Props) {
  return (
    <div className="flex items-center justify-center py-8">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        const isLast = i === steps.length - 1;

        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center min-w-[80px]">
              {/* Circle */}
              <div
                className={`
                  w-[42px] h-[42px] rounded-full flex items-center justify-center
                  text-[15px] font-bold transition-all duration-400
                  ${done ? 'bg-lime-accent text-black' : ''}
                  ${active ? 'border-2 border-lime-accent text-lime-accent bg-transparent' : ''}
                  ${!done && !active ? 'border-2 border-dark-hover text-gray-600 bg-dark-alt' : ''}
                `}
              >
                {done ? (
                  <Check size={16} strokeWidth={3} />
                ) : isLast && !active && !done ? (
                  <Check size={16} strokeWidth={3} />
                ) : (
                  i + 1
                )}
              </div>
              {/* Label */}
              <span
                className={`
                  mt-2 text-xs transition-all
                  ${active ? 'text-white font-semibold' : ''}
                  ${done ? 'text-lime-accent font-normal' : ''}
                  ${!done && !active ? 'text-gray-600 font-normal' : ''}
                `}
              >
                {label}
              </span>
            </div>

            {/* Connector line */}
            {!isLast && (
              <div
                className={`
                  w-20 h-0.5 mx-1 mb-6 transition-all duration-400
                  ${done ? 'bg-lime-accent' : 'bg-dark-border'}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
