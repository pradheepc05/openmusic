import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MiniPlayer from '../music/MiniPlayer';
import QueuePanel from '../music/QueuePanel';
import { useAudioEvents } from '../../hooks/useAudioEvents';
import { usePlayerStore } from '../../store/playerStore';

export default function MainLayout() {
  useAudioEvents();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [queueOpen, setQueueOpen] = useState(false);
  const hasTrack = usePlayerStore((s) => s.queue.length > 0);

  return (
    <div className="flex h-full">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
        {hasTrack && <MiniPlayer onOpenQueue={() => setQueueOpen(true)} />}
      </div>
      <QueuePanel open={queueOpen} onClose={() => setQueueOpen(false)} />
    </div>
  );
}