import React, { useState } from 'react';
import { 
  X, 
  Home, 
  Car, 
  Users, 
  SunMedium, 
  Search, 
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const ServicesMenuModal = () => {
  const { 
    isServicesMenuOpen, 
    setIsServicesMenuOpen, 
    setActivePage, 
    setPaymentModalData 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  if (!isServicesMenuOpen) return null;

  const serviceCategories = [
    {
      title: "Mening uyim",
      page: "home",
      icon: Home,
      color: "text-amber-500",
      items: [
        { name: "Hududiy Elektr Tarmoqlari (Elektr)", amount: 130500, category: "Mening uyim", targetId: "kam-elektr" },
        { name: "Hududgazta'minot (Tabiiy gaz)", amount: 113750, category: "Mening uyim", targetId: "kam-gaz" },
        { name: "O'zsuvta'minot (Sovuq suv)", amount: 33600, category: "Mening uyim", targetId: "kam-suv" },
        { name: "Toza Hudud (Chiqindi to'lovi)", amount: 35000, category: "Mening uyim", targetId: "kam-chiqindi" },
        { name: "Mol-mulk solig'i to'lovi", amount: 360000, category: "Mening uyim", targetId: "soliq-1" },
        { name: "Uy interneti (Uzonline)", amount: 149000, category: "Mening uyim", targetId: "boshqa-internet" },
      ]
    },
    {
      title: "Mening avtomobilim",
      page: "car",
      icon: Car,
      color: "text-blue-500",
      items: [
        { name: "DYXX Radar Jarimasi (50% chegirmada)", amount: 187500, category: "Mening avtomobilim", targetId: "jarima-1" },
        { name: "Majburiy Sug'urta (OSAGO)", amount: 168000, category: "Mening avtomobilim", targetId: "car-sugurta" },
        { name: "KASKO To'liq sug'urta", amount: 3200000, category: "Mening avtomobilim", targetId: "car-kasko" },
        { name: "Texnik ko'rik (Texosmotr)", amount: 120000, category: "Mening avtomobilim", targetId: "car-texosmotr" },
      ]
    },
    {
      title: "Mening oilam",
      page: "family",
      icon: Users,
      color: "text-rose-500",
      items: [
        { name: "Smart School Xususiy maktab to'lovi", amount: 3200000, category: "Mening oilam", targetId: "fam-1" },
        { name: "Erkatoy Kids bog'cha to'lovi", amount: 1800000, category: "Mening oilam", targetId: "fam-2" },
        { name: "IT Dasturlash & Til to'garagi", amount: 1250000, category: "Mening oilam", targetId: "fam-3" },
        { name: "Pianino va Gimnastika to'garagi", amount: 750000, category: "Mening oilam", targetId: "fam-4" },
      ]
    },
    {
      title: "Mening bizneslarim",
      page: "business",
      icon: SunMedium,
      color: "text-emerald-500",
      items: [
        { name: "Quyosh paneli stansiyasi monitoringi", pageDirect: "business" },
        { name: "Yashil elektr energiyasini sotish (har 1 kVt)", pageDirect: "business" },
        { name: "Tijorat obyekti ijara daromadlari", pageDirect: "business" }
      ]
    }
  ];

  const handleSelectService = (item, page) => {
    setIsServicesMenuOpen(false);
    if (item.amount) {
      setPaymentModalData({
        title: item.name,
        category: item.category,
        amount: item.amount,
        targetId: item.targetId
      });
    } else {
      setActivePage(page);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 relative shadow-xl max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setIsServicesMenuOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="mb-4">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">
            Barcha xizmatlar katalogi
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Tezkor to'lov qilish yoki bo'limga o'tish
          </p>

          {/* Search bar */}
          <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Qidiruv: gaz, elektr, maktab, jarima..."
              className="w-full bg-transparent text-xs sm:text-sm font-semibold outline-none text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {serviceCategories.map((cat, idx) => {
            const CatIcon = cat.icon;
            const filteredItems = cat.items.filter(item =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (searchQuery && filteredItems.length === 0) return null;

            return (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
                <div 
                  onClick={() => {
                    setActivePage(cat.page);
                    setIsServicesMenuOpen(false);
                  }}
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <CatIcon className={`w-4 h-4 ${cat.color}`} />
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-sky-600 transition-colors">
                      {cat.title}
                    </h3>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>

                <div className="space-y-1 pt-1">
                  {filteredItems.map((item, itemIdx) => (
                    <button
                      key={itemIdx}
                      onClick={() => handleSelectService(item, cat.page)}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 hover:border-sky-300 transition-colors"
                    >
                      <span className="truncate pr-2 font-medium">{item.name}</span>
                      {item.amount && (
                        <span className="font-bold text-sky-600 dark:text-sky-400 flex-shrink-0">
                          {item.amount.toLocaleString()} so'm
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default ServicesMenuModal;
