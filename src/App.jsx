import React from 'react';
import { useApp, AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AuthModal from './components/AuthModal';
import PaymentModal from './components/PaymentModal';
import ReceiptModal from './components/ReceiptModal';
import ServicesMenuModal from './components/ServicesMenuModal';
import ContactsModal from './components/ContactsModal';
import AddCarModal from './components/AddCarModal';
import AddHomeModal from './components/AddHomeModal';

import DashboardPage from './pages/DashboardPage';
import HomeServicesPage from './pages/HomeServicesPage';
import CarServicesPage from './pages/CarServicesPage';
import FamilyServicesPage from './pages/FamilyServicesPage';
import BusinessServicesPage from './pages/BusinessServicesPage';
import ReceiptsPage from './pages/ReceiptsPage';
import ContactsPage from './pages/ContactsPage';

import { 
  LayoutDashboard, 
  Home, 
  Car, 
  Users, 
  SunMedium, 
  Receipt,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

const MainLayout = () => {
  const { activePage, setActivePage, alertNotification } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-5 pb-24 lg:pb-10">
        <div className="flex flex-col lg:flex-row gap-5">
          
          {/* Left Sidebar */}
          <Sidebar />

          {/* Page Dynamic Content */}
          <div className="flex-1 min-w-0">
            {activePage === 'dashboard' && <DashboardPage />}
            {activePage === 'home' && <HomeServicesPage />}
            {activePage === 'car' && <CarServicesPage />}
            {activePage === 'family' && <FamilyServicesPage />}
            {activePage === 'business' && <BusinessServicesPage />}
            {activePage === 'receipts' && <ReceiptsPage />}
            {activePage === 'contacts' && <ContactsPage />}
          </div>

        </div>
      </main>

      {/* Mobile Bottom Quick Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 p-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-md px-2 flex items-center justify-around">
          <button
            onClick={() => setActivePage('dashboard')}
            className={`p-1.5 rounded-lg flex flex-col items-center gap-0.5 text-[10px] ${
              activePage === 'dashboard' ? 'text-sky-600 dark:text-sky-400 font-bold' : 'text-slate-500'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Hamyon</span>
          </button>

          <button
            onClick={() => setActivePage('home')}
            className={`p-1.5 rounded-lg flex flex-col items-center gap-0.5 text-[10px] ${
              activePage === 'home' ? 'text-sky-600 dark:text-sky-400 font-bold' : 'text-slate-500'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Uyim</span>
          </button>

          <button
            onClick={() => setActivePage('car')}
            className={`p-1.5 rounded-lg flex flex-col items-center gap-0.5 text-[10px] ${
              activePage === 'car' ? 'text-sky-600 dark:text-sky-400 font-bold' : 'text-slate-500'
            }`}
          >
            <Car className="w-5 h-5" />
            <span>Avto</span>
          </button>

          <button
            onClick={() => setActivePage('family')}
            className={`p-1.5 rounded-lg flex flex-col items-center gap-0.5 text-[10px] ${
              activePage === 'family' ? 'text-sky-600 dark:text-sky-400 font-bold' : 'text-slate-500'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Oilam</span>
          </button>

          <button
            onClick={() => setActivePage('business')}
            className={`p-1.5 rounded-lg flex flex-col items-center gap-0.5 text-[10px] ${
              activePage === 'business' ? 'text-sky-600 dark:text-sky-400 font-bold' : 'text-slate-500'
            }`}
          >
            <SunMedium className="w-5 h-5" />
            <span>Biznes</span>
          </button>

          <button
            onClick={() => setActivePage('receipts')}
            className={`p-1.5 rounded-lg flex flex-col items-center gap-0.5 text-[10px] ${
              activePage === 'receipts' ? 'text-sky-600 dark:text-sky-400 font-bold' : 'text-slate-500'
            }`}
          >
            <Receipt className="w-5 h-5" />
            <span>Cheklar</span>
          </button>
        </div>
      </div>

      {/* Global Toast Alert Notification */}
      {alertNotification && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-300">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 flex items-center gap-3 shadow-lg border-l-4 border-l-sky-600 max-w-sm">
            {alertNotification.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
            {alertNotification.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />}
            {alertNotification.type === 'info' && <Info className="w-4 h-4 text-sky-600 flex-shrink-0" />}
            {alertNotification.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />}
            <p className="text-xs font-bold text-slate-900 dark:text-white">
              {alertNotification.message}
            </p>
          </div>
        </div>
      )}

      {/* All Global Modals */}
      <AuthModal />
      <PaymentModal />
      <ReceiptModal />
      <ServicesMenuModal />
      <ContactsModal />
      <AddCarModal />
      <AddHomeModal />

    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
