import React from 'react';
import { 
  Wallet, 
  Sun, 
  Moon, 
  Grid, 
  PhoneCall, 
  LogOut, 
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatMoney } from '../utils/formatters';

const Navbar = () => {
  const { 
    darkMode, 
    toggleDarkMode, 
    user, 
    isAuthenticated, 
    logout, 
    setIsAuthModalOpen, 
    setAuthMode,
    setIsServicesMenuOpen,
    setIsContactsModalOpen,
    setActivePage
  } = useApp();

  return (
    <header className="sticky top-0 z-30 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActivePage('dashboard')}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-sm">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Hamyon<span className="text-sky-600 dark:text-sky-400">.uz</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800">
                PORTAL
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              Shaxsiy moliya va xizmatlar boshqaruvi
            </p>
          </div>
        </div>

        {/* Center Nav: Xizmatlar & Kontaktlar */}
        <div className="hidden md:flex items-center gap-2">
          {isAuthenticated && (
            <button
              onClick={() => setIsServicesMenuOpen(true)}
              className="clean-btn px-3.5 py-2 flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400"
            >
              <Grid className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>Xizmatlar</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>
          )}

          <button
            onClick={() => setIsContactsModalOpen(true)}
            className="clean-btn px-3.5 py-2 flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400"
          >
            <PhoneCall className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Kontaktlar</span>
          </button>
        </div>

        {/* Right Section: Balance, Mode, User Profile */}
        <div className="flex items-center gap-3">
          
          {/* Balance Display (Plus tugmasi olib tashlandi, oylik bilan boshqariladi) */}
          {isAuthenticated && (
            <div className="bg-slate-50 dark:bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] uppercase font-bold text-slate-400 block leading-tight">
                Mavjud Balans
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-sky-600 dark:text-sky-400">
                {formatMoney(user.balans)}
              </span>
            </div>
          )}

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="w-9 h-9 clean-btn flex items-center justify-center text-slate-600 dark:text-amber-400"
            title={darkMode ? "Yorug' rejimga o'tish" : "Qorong'i rejimga o'tish"}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* User Auth */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <div 
                onClick={() => setActivePage('dashboard')}
                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl clean-btn cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold text-xs flex items-center justify-center">
                  {user.ism ? user.ism[0] : 'U'}
                </div>
                <div className="text-left hidden lg:block leading-tight">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {user.ism} {user.familiya}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate max-w-[110px]">
                    {user.lavozimi || user.ishlashJoyi}
                  </p>
                </div>
              </div>

              <button
                onClick={logout}
                title="Chiqish"
                className="w-9 h-9 clean-btn flex items-center justify-center text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setAuthMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="clean-btn px-3 py-1.5 text-xs font-bold"
              >
                Kirish
              </button>
              <button
                onClick={() => {
                  setAuthMode('register');
                  setIsAuthModalOpen(true);
                }}
                className="clean-btn-primary px-3 py-1.5 text-xs font-bold"
              >
                Ro'yxatdan o'tish
              </button>
            </div>
          )}

        </div>

      </div>
    </header>
  );
};

export default Navbar;
