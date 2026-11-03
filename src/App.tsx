import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import ErrorBoundary from './components/common/ErrorBoundary';
import Home from './pages/Home';
import Search from './pages/Search';
import Explore from './pages/Explore';
import Library from './pages/Library';
import Playlist from './pages/Playlist';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import { useAuthStore } from './store/authStore';

export default function App() {
  const initialize = useAuthStore((s) => s.initialize);
  useEffect(() => { initialize(); }, [initialize]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ErrorBoundary><MainLayout /></ErrorBoundary>}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/library" element={<Library />} />
          <Route path="/playlist/:id" element={<Playlist />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}