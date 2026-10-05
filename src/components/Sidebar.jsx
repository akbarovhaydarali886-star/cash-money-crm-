import React from 'react';
import { 
  LayoutDashboard, 
  Home, 
  Car, 
  Users, 
  SunMedium, 
  Receipt, 
  PhoneCall,
  Calendar,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getSalaryStatus, formatMoney } from '../utils/formatters';

const Sidebar = () => {
  const { activePage, setActivePage, user } = useApp();
  const salaryInfo = getSalaryStatus(user.oylikKuni || 5);

  const navItems = [
    {
      id: 'dashboard',
      label: 'Asosiy Hamyon',
      sublabel: 'Umumiy hisobot va balans',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'home',
      label: 'Mening uyim',
      sublabel: 'Elektr, gaz, suv, chiqindi, soliq',
      icon: Home,
      badge: '4 xizmat'
    },
    {
      id: 'car',
      label: 'Mening avtomobilim',
      sublabel: "Sug'urta, texosmotr, jarimalar",
      icon: Car,
      badge: 'Tracker 2'
    },
    {
      id: 'family',
      label: 'Mening oilam',
      sublabel: "4 farzand, maktab, to'garaklar",
      icon: Users,
      badge: '4 farzand'
    },
    {
      id: 'business',
      label: 'Mening bizneslarim',
      sublabel: 'Quyosh paneli (1 kVt narxi) & Ijara',
      icon: SunMedium,
      badge: '12 kW'
    },
    {
      id: 'receipts',
      label: 'To\'lovlar & Cheklar',
      sublabel: 'Kvitansiyalar va QR-kodlar',
      icon: Receipt,
      badge: 'Arxiv'
    },
    {
      id: 'contacts',
      label: 'Kontaktlar & Yordam',
      sublabel: '24/7 Aloqa markazi',
      icon: PhoneCall,
      badge: null
    }
  ];

  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="clean-card p-4 space-y-4">
        
        {/* Salary Status Info Box */}
        <div className="clean-box p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Oylik maosh statusi
            </span>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-900/60 text-sky-700 dark:text-sky-300">
              1-10 kunlar
            </span>
          </div>

          <div>
            <p className="text-base font-black text-slate-900 dark:text-white">
              {formatMoney(user.oylikDaromad)}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              {user.ishlashJoyi || 'Kompaniya'} • {user.lavozimi || 'Mutaxassis'}
            </p>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">
              {user.maoshQabulQilingan ? "Keyingi maosh:" : "Tushish vaqti:"}
            </span>
            <span className="font-bold text-sky-600 dark:text-sky-400">
              {user.maoshQabulQilingan ? `${user.keyingiMaoshSanasi || '2026-11-05'} da` : `Har oyning ${user.oylikKuni}-kuni`}
            </span>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full text-left p-2.5 rounded-xl flex items-center gap-3 transition-colors select-none ${
                  isActive
                    ? 'bg-sky-50 dark:bg-sky-950/70 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    isActive
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs sm:text-sm font-semibold truncate">
                      {item.label}
                    </p>
                    {item.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hidden xl:inline-block">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 truncate">
                    {item.sublabel}
                  </p>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Security badge */}
        <div className="pt-2">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Sparkles className="w-4 h-4 text-sky-500 flex-shrink-0" />
            <span className="text-[11px] leading-tight">Har bir to'lov yuridik tasdiqlangan elektron chek beradi</span>
          </div>
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;
