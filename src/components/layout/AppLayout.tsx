import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import type { User } from '../../types';

interface Props {
  user: User;
  onLogout: () => void;
  children: ReactNode;
}

export default function AppLayout({ user, onLogout, children }: Props) {
  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <Sidebar user={user} onLogout={onLogout} />
      <main className="ml-[220px]">{children}</main>
    </div>
  );
}
