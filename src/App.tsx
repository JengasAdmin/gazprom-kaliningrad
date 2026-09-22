import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import NewsDetailPage from './pages/NewsDetailPage';
import ManagementPage from './pages/ManagementPage';
import EmployeesPage from './pages/EmployeesPage';
import StructurePage from './pages/StructurePage';
import FacilitiesPage from './pages/FacilitiesPage';
import FacilityDetailPage from './pages/FacilityDetailPage';
import MapPage from './pages/MapPage';
import GasificationPage from './pages/GasificationPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import SocialPage from './pages/SocialPage';
import ContactsPage from './pages/ContactsPage';
import SearchPage from './pages/SearchPage';
import DemoAnnaPage from './pages/DemoAnnaPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:slug" element={<NewsDetailPage />} />
        <Route path="/management" element={<ManagementPage />} />
        <Route path="/demo" element={<DemoAnnaPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/structure" element={<StructurePage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/facilities/:slug" element={<FacilityDetailPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/gasification" element={<GasificationPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/social" element={<SocialPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
