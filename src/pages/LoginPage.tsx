import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, ChevronLeft } from 'lucide-react';
import type { User } from '../types';

interface Props {
  onLogin: (user: User) => void;
}

export default function LoginPage({ onLogin }: Props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('demo@mobili3d.fr');
  const [pass, setPass] = useState('demo2026');
  const [loading, setLoading] = useState(false);

  const submit = () => {
    if (!email || !pass) return;
    setLoading(true);
    setTimeout(() => {
      onLogin({ email, name: email.split('@')[0], company: 'Entreprise Demo' });
      navigate('/dashboard');
      setLoading(false);
    }, 600);
  };

  const inputClass = `w-full px-4 py-3 rounded-[10px] bg-dark-alt border border-dark-border
    text-white text-sm outline-none transition-colors
    focus:border-lime-accent/40 placeholder:text-gray-600`;

  return (
    <div className="min-h-screen bg-dark-bg text-white flex items-center justify-center">
      <div className="fixed top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(200,230,48,0.05),transparent_70%)] pointer-events-none" />

      <div className="relative w-full max-w-[380px] px-5">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1 bg-transparent border-none text-gray-600 text-[13px] cursor-pointer mb-8 hover:text-gray-400 transition-colors"
        >
          <ChevronLeft size={14} /> Retour
        </button>

        <div className="p-8 rounded-[20px] bg-dark-surface border border-dark-border">
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-8 h-8 rounded-lg bg-lime-accent flex items-center justify-center text-black">
              <Box size={16} />
            </div>
            <span className="text-base font-extrabold">
              Mobili<span className="text-lime-accent">3D</span>
            </span>
          </div>

          <h2 className="text-[22px] font-extrabold mb-1">Connexion</h2>
          <p className="text-[13px] text-gray-600 mb-7">Accédez à votre espace de gestion</p>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-[11px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">
                Mot de passe
              </label>
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className={inputClass}
              />
            </div>
            <button
              onClick={submit}
              disabled={loading}
              className="py-3.5 rounded-[10px] border-none bg-lime-accent text-black text-sm font-bold
                         cursor-pointer disabled:opacity-60 transition-opacity"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </div>

          <p className="mt-5 text-center text-[11px] text-gray-600">
            Identifiants pré-remplis pour la démo
          </p>
        </div>
      </div>
    </div>
  );
}
