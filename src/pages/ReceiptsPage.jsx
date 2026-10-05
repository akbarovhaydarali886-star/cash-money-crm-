import React, { useState } from 'react';
import { 
  Receipt, 
  Search, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownLeft, 
  QrCode,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatMoney } from '../utils/formatters';

const ReceiptsPage = () => {
  const { receipts, setSelectedReceipt } = useApp();
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'Barchasi' },
    { id: 'Mening uyim', label: 'Mening uyim' },
    { id: 'Mening avtomobilim', label: 'Mening avtomobilim' },
    { id: 'Mening oilam', label: 'Mening oilam' },
    { id: 'Mening bizneslarim', label: 'Mening bizneslarim' }
  ];

  const filteredReceipts = receipts.filter(rec => {
    const matchesCategory = filterCategory === 'all' || rec.toifa === filterCategory;
    const matchesSearch = 
      rec.xizmatNomi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.sanaVaqt.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const totalSpent = receipts
    .filter(r => !r.holati.includes("Tushum"))
    .reduce((sum, r) => sum + r.summa, 0);

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="clean-card p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-800">
              Elektron Kvitansiyalar
            </span>
            <span className="text-xs text-slate-400">
              Yuridik tasdiqlangan cheklar
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1.5 flex items-center gap-2">
            <Receipt className="w-6 h-6 text-sky-600" />
            To'lovlar & Cheklar tarixi
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Barcha amalga oshirilgan to'lovlar, aniq sana va vaqti hamda QR-kodli elektron cheklar
          </p>
        </div>

        <div className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-right">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Jami to'lovlar</span>
          <span className="text-base font-black text-slate-900 dark:text-white">
            {formatMoney(totalSpent)}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="clean-card p-3.5 flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Search */}
        <div className="w-full md:w-80 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Qidiruv: Chek ID, xizmat nomi..."
            className="w-full bg-transparent text-xs font-semibold outline-none text-slate-900 dark:text-white"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                filterCategory === cat.id
                  ? 'clean-btn-primary'
                  : 'clean-btn text-slate-600 dark:text-slate-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

      </div>

      {/* Receipts List */}
      <div className="space-y-2.5">
        {filteredReceipts.length > 0 ? (
          filteredReceipts.map((rec) => {
            const isIncome = rec.holati.includes("Tushum");

            return (
              <div
                key={rec.id}
                onClick={() => setSelectedReceipt(rec)}
                className="clean-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:border-sky-300 dark:hover:border-sky-700 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isIncome 
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900' 
                      : 'bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900'
                  }`}>
                    {isIncome ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                        {rec.id}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
                        {rec.toifa}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-0.5 group-hover:text-sky-600 transition-colors">
                      {rec.xizmatNomi}
                    </h3>

                    <div className="flex items-center gap-2.5 text-xs text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-sky-600" />
                        {rec.sanaVaqt}
                      </span>
                      <span>•</span>
                      <span>To'lovchi: {rec.tolovchi}</span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1">
                  <span className={`text-base font-black ${
                    isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'
                  }`}>
                    {isIncome ? '+' : '-'}{formatMoney(rec.summa)}
                  </span>

                  <span className="text-xs font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1">
                    <QrCode className="w-3.5 h-3.5" />
                    Chekni ochish →
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="clean-card p-10 text-center space-y-2">
            <FileText className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Hech qanday chek topilmadi
            </h3>
          </div>
        )}
      </div>

    </div>
  );
};

export default ReceiptsPage;
