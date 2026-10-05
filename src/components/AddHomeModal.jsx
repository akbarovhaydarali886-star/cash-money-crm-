import React, { useState } from 'react';
import { 
  X, 
  Home, 
  Search, 
  CheckCircle2, 
  Building, 
  MapPin, 
  Zap, 
  Flame, 
  Droplets, 
  Trash2, 
  FileText,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { lookupHomeFromRegistry } from '../utils/registryLookup';
import { formatMoney } from '../utils/formatters';

const AddHomeModal = () => {
  const { 
    isAddHomeModalOpen, 
    setIsAddHomeModalOpen, 
    addHomeProperty, 
    user 
  } = useApp();

  const [kadastrRaqam, setKadastrRaqam] = useState('');
  const [manzil, setManzil] = useState('');
  const [jshshir, setJshshir] = useState(user.jshshir || '31204951234567');

  const [isSearching, setIsSearching] = useState(false);
  const [searchStep, setSearchStep] = useState('');
  const [detectedHome, setDetectedHome] = useState(null);
  const [error, setError] = useState('');

  if (!isAddHomeModalOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    setError('');

    if (!kadastrRaqam.trim() && !manzil.trim()) {
      setError("Iltimos, Kadastr raqami yoki xonadon manzilini kiriting.");
      return;
    }

    setIsSearching(true);
    setSearchStep("Davlat Kadastrlari Palatasi bazasiga so'rov yuborilmoqda...");

    setTimeout(() => {
      setSearchStep("Ko'chmas mulk huquqi va mulkdor JSHSHIR solishtirilmoqda...");
    }, 400);

    setTimeout(() => {
      setSearchStep("HET, Hududgaz, O'zsuvta'minot kommunal hisoblari ulanmoqda...");
    }, 750);

    setTimeout(() => {
      const home = lookupHomeFromRegistry({ kadastrRaqam, manzil, jshshir });
      setDetectedHome(home);
      setIsSearching(false);
      setSearchStep('');
    }, 1100);
  };

  const handleSaveHome = () => {
    if (!detectedHome) return;
    addHomeProperty(detectedHome);
    setIsAddHomeModalOpen(false);
    setDetectedHome(null);
    setKadastrRaqam('');
    setManzil('');
  };

  const handleClose = () => {
    setIsAddHomeModalOpen(false);
    setDetectedHome(null);
    setError('');
    setIsSearching(false);
  };

  const sampleKadastrs = [
    { kadastr: "10:01:05:02:01:0045", label: "Mirobod, Nukus ko'chasi" },
    { kadastr: "10:07:02:04:03:0119", label: "Chilonzor, 9-mavze" },
    { kadastr: "10:03:01:05:02:0841", label: "Yakkasaroy, Sh.Rustaveli" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 relative shadow-xl max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900 flex items-center justify-center">
            <Home className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Davlat Kadastr Palatasi & Kommunal Tizim
            </span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              Yangi uy / ko'chmas mulk qo'shish
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Kadastr raqami orqali manzil, hisoblagichlar va barcha kommunal to'lovlar avtomatik topiladi
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Search Input Form */}
        {!detectedHome && (
          <form onSubmit={handleSearch} className="space-y-4">
            
            {/* Kadastr raqami */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Ko'chmas mulk kadastr raqami
              </label>
              <input
                type="text"
                value={kadastrRaqam}
                onChange={(e) => setKadastrRaqam(e.target.value)}
                placeholder="10:01:05:02:01:0045"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-900 dark:text-white outline-none focus:border-amber-500"
              />

              {/* Sample Kadastr Pills */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {sampleKadastrs.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setKadastrRaqam(item.kadastr);
                      setManzil(item.label);
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-50 hover:text-amber-700 dark:hover:bg-amber-950/60 dark:hover:text-amber-400 transition-colors"
                  >
                    {item.label} ({item.kadastr})
                  </button>
                ))}
              </div>
            </div>

            {/* Manzil (Ixtiyoriy) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Yoki aniq manzil (viloyat, tuman, ko'cha, xonadon)
              </label>
              <div className="flex items-center px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <MapPin className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
                <input
                  type="text"
                  value={manzil}
                  onChange={(e) => setManzil(e.target.value)}
                  placeholder="Masalan: Toshkent sh., Mirobod t., Nukus ko'chasi 45-uy, 14-xonadon"
                  className="w-full bg-transparent text-xs font-bold text-slate-900 dark:text-white outline-none"
                />
              </div>
            </div>

            {/* Mulkdor JSHSHIR */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Mulk egasining JSHSHIR raqami
              </label>
              <input
                type="text"
                value={jshshir}
                onChange={(e) => setJshshir(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-900 dark:text-white outline-none"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Davlat kadastr reyestridan mulkdorlik huquqini tasdiqlash uchun
              </p>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSearching}
                className="w-full clean-btn-primary py-3 px-4 font-bold text-xs flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                {isSearching ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{searchStep || "Kadastr bazasidan qidirilmoqda..."}</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Davlat kadastr va kommunal bazasidan topish</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

        {/* Detected Home Preview */}
        {detectedHome && (
          <div className="space-y-4 animate-in fade-in duration-300">
            
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Ko'chmas mulk va uning barcha kommunal hisoblari topildi!</span>
            </div>

            {/* Home summary box */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                    Kadastr: {detectedHome.kadastrRaqam}
                  </span>
                  <h3 className="text-base font-black text-slate-900 dark:text-white mt-1.5">
                    {detectedHome.manzil}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Maydoni: <strong className="text-slate-700 dark:text-slate-300">{detectedHome.maydoni}</strong> • {detectedHome.xonalarSoni} xona
                  </p>
                </div>

                <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center">
                  <Home className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Auto attached utility accounts */}
            <div>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Avtomatik biriktirilgan kommunal hisob raqamlari:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {detectedHome.kamunal?.map((item) => (
                  <div 
                    key={item.id}
                    className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 dark:text-white">{item.nomi.split('(')[0]}</span>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Ulangan</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Hisob raqami:</span>
                      <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{item.hisobRaqam}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Soliqlar preview */}
            <div>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Davlat soliqlari:
              </p>
              <div className="flex gap-2">
                {detectedHome.soliqlar?.map((s) => (
                  <div key={s.id} className="flex-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs">
                    <span className="text-[10px] text-slate-400 block">{s.nomi}:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{formatMoney(s.yillikSumma)}/yil</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDetectedHome(null)}
                className="clean-btn py-2.5 px-4 font-bold text-xs"
              >
                Qayta qidirish
              </button>
              <button
                type="button"
                onClick={handleSaveHome}
                className="flex-1 clean-btn-primary py-2.5 px-4 font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mening uylarimga saqlash</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default AddHomeModal;
