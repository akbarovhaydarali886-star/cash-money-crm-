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
import AuthGate from './components/AuthGate';

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
  const { activePage, setActivePage, alertNotification, isAuthenticated } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      
      {/* Top Navigation */}
      <Navbar />

      {/* Agar foydalanuvchi ro'yxatdan o'tmagan bo'lsa - faqat Ro'yxatdan o'tish / Kirish oynasi ko'rinadi */}
      {!isAuthenticated ? (
        <AuthGate />
      ) : (
        /* Ro'yxatdan o'tgandan so'ng barcha shaxsiy ma'lumotlar, profilingiz va xizmatlar ochiladi */
        <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 pb-28 lg:pb-10">
          <div className="flex flex-col lg:flex-row gap-5">
            
            {/* Left Sidebar (Desktop) */}
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
      )}

      {/* Mobile Bottom Quick Navigation (Faqat ro'yxatdan o'tgach ko'rinadi) */}
      {isAuthenticated && (
        <nav 
          aria-label="Mobil menyu"
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-2 py-1.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-xl"
          style={{ paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))' }}
        >
          <div className="mx-auto max-w-md flex items-center justify-between gap-1">
            <button
              onClick={() => setActivePage('dashboard')}
              className={`flex-1 py-1 px-1 rounded-xl flex flex-col items-center gap-0.5 text-[10px] transition-all ${
                activePage === 'dashboard' 
                  ? 'text-sky-600 dark:text-sky-400 font-black bg-sky-50 dark:bg-sky-950/70' 
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="truncate">Hamyon</span>
            </button>

            <button
              onClick={() => setActivePage('home')}
              className={`flex-1 py-1 px-1 rounded-xl flex flex-col items-center gap-0.5 text-[10px] transition-all ${
                activePage === 'home' 
                  ? 'text-sky-600 dark:text-sky-400 font-black bg-sky-50 dark:bg-sky-950/70' 
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="truncate">Uyim</span>
            </button>

            <button
              onClick={() => setActivePage('car')}
              className={`flex-1 py-1 px-1 rounded-xl flex flex-col items-center gap-0.5 text-[10px] transition-all ${
                activePage === 'car' 
                  ? 'text-sky-600 dark:text-sky-400 font-black bg-sky-50 dark:bg-sky-950/70' 
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Car className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="truncate">Avto</span>
            </button>

            <button
              onClick={() => setActivePage('family')}
              className={`flex-1 py-1 px-1 rounded-xl flex flex-col items-center gap-0.5 text-[10px] transition-all ${
                activePage === 'family' 
                  ? 'text-sky-600 dark:text-sky-400 font-black bg-sky-50 dark:bg-sky-950/70' 
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="truncate">Oilam</span>
            </button>

            <button
              onClick={() => setActivePage('business')}
              className={`flex-1 py-1 px-1 rounded-xl flex flex-col items-center gap-0.5 text-[10px] transition-all ${
                activePage === 'business' 
                  ? 'text-sky-600 dark:text-sky-400 font-black bg-sky-50 dark:bg-sky-950/70' 
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <SunMedium className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="truncate">Biznes</span>
            </button>

            <button
              onClick={() => setActivePage('receipts')}
              className={`flex-1 py-1 px-1 rounded-xl flex flex-col items-center gap-0.5 text-[10px] transition-all ${
                activePage === 'receipts' 
                  ? 'text-sky-600 dark:text-sky-400 font-black bg-sky-50 dark:bg-sky-950/70' 
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Receipt className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="truncate">Cheklar</span>
            </button>
          </div>
        </nav>
      )}

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
