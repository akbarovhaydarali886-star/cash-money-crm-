import React, { useState } from 'react';
import { 
  X, 
  Car, 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle, 
  FileText, 
  Gauge, 
  Calendar,
  Sparkles,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { POPULAR_CAR_MODELS, lookupCarFromRegistry } from '../utils/registryLookup';
import { formatMoney } from '../utils/formatters';

const AddCarModal = () => {
  const { 
    isAddCarModalOpen, 
    setIsAddCarModalOpen, 
    addCarToGarage, 
    showNotification 
  } = useApp();

  const [marka, setMarka] = useState('');
  const [prava, setPrava] = useState('AF 1234567');
  const [davlatRaqam, setDavlatRaqam] = useState('');
  
  const [isSearching, setIsSearching] = useState(false);
  const [searchStep, setSearchStep] = useState('');
  const [detectedCar, setDetectedCar] = useState(null);
  const [error, setError] = useState('');

  if (!isAddCarModalOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    setError('');

    if (!marka.trim()) {
      setError("Iltimos, avtomobil markasi yoki modelini kiriting.");
      return;
    }

    if (!prava.trim()) {
      setError("Iltimos, haydovchilik guvohnomasi (prava) raqamini kiriting.");
      return;
    }

    setIsSearching(true);
    setSearchStep("O'zbekiston Respublikasi IIV YHXX serveri bilan bog'lanmoqda...");

    setTimeout(() => {
      setSearchStep("Haydovchilik guvohnomasi va texnik pasport ma'lumotlari solishtirilmoqda...");
    }, 400);

    setTimeout(() => {
      setSearchStep("Davlat sug'urta va texosmotr bazasidan ma'lumotlar olinmoqda...");
    }, 700);

    setTimeout(() => {
      const car = lookupCarFromRegistry({ marka, prava, davlatRaqam });
      setDetectedCar(car);
      setIsSearching(false);
      setSearchStep('');
    }, 1100);
  };

  const handleSaveCar = () => {
    if (!detectedCar) return;
    addCarToGarage(detectedCar);
    setIsAddCarModalOpen(false);
    setDetectedCar(null);
    setMarka('');
    setDavlatRaqam('');
  };

  const handleClose = () => {
    setIsAddCarModalOpen(false);
    setDetectedCar(null);
    setError('');
    setIsSearching(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 relative shadow-xl max-h-[92vh] overflow-y-auto">
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900 flex items-center justify-center">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              YHXB / DYXX Integratsiyasi
            </span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              Yangi avtomobil qo'shish
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Marka va prava raqamini kiriting, qolgan barcha ma'lumotlar davlat bazasidan avtomatik topiladi
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Input Form */}
        {!detectedCar && (
          <form onSubmit={handleSearch} className="space-y-4">
            
            {/* Marka / Rusum */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Avtomobil markasi / modeli *
              </label>
              <input
                type="text"
                value={marka}
                onChange={(e) => setMarka(e.target.value)}
                placeholder="Masalan: BYD Song Plus, Chevrolet Malibu 2, Tracker..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white outline-none focus:border-sky-500"
              />
              
              {/* Quick Model Pills */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {POPULAR_CAR_MODELS.slice(0, 6).map((modelName) => (
                  <button
                    key={modelName}
                    type="button"
                    onClick={() => setMarka(modelName)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-sky-50 hover:text-sky-600 dark:hover:bg-sky-950/60 dark:hover:text-sky-400 transition-colors"
                  >
                    {modelName}
                  </button>
                ))}
              </div>
            </div>

            {/* Haydovchilik guvohnomasi (Prava) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Haydovchilik guvohnomasi (Prava seriya va raqami) *
              </label>
              <div className="flex items-center px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <FileText className="w-4 h-4 text-slate-400 mr-2" />
                <input
                  type="text"
                  value={prava}
                  onChange={(e) => setPrava(e.target.value.toUpperCase())}
                  placeholder="AF 1234567"
                  className="w-full bg-transparent text-xs font-mono font-bold text-slate-900 dark:text-white outline-none uppercase"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Davlat ro'yxatidan egasini aniqlash va jarimalarni yuklash uchun ishlatiladi
              </p>
            </div>

            {/* Davlat raqami (Ixtiyoriy) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Davlat raqam belgisi (Ixtiyoriy)
              </label>
              <input
                type="text"
                value={davlatRaqam}
                onChange={(e) => setDavlatRaqam(e.target.value.toUpperCase())}
                placeholder="01 A 777 BA yoki bo'sh qoldiring (avtomat topiladi)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-900 dark:text-white outline-none uppercase"
              />
            </div>

            {/* Search Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSearching}
                className="w-full clean-btn-primary py-3 px-4 font-bold text-xs flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                {isSearching ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{searchStep || "DYXX bazasidan qidirilmoqda..."}</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>DYXX / YHXB bazasidan ma'lumotlarni topish</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

        {/* Detected Vehicle Result Preview */}
        {detectedCar && (
          <div className="space-y-4 animate-in fade-in duration-300">
            
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Avtomobil ma'lumotlari davlat bazasidan muvaffaqiyatli aniqlandi!</span>
            </div>

            {/* Main Detected Car Card */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-slate-900 text-white dark:bg-white dark:text-slate-900 border border-slate-700">
                      {detectedCar.raqam}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                      {detectedCar.yil}-yil
                    </span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white mt-1.5">
                    {detectedCar.model}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Rang: <strong className="text-slate-700 dark:text-slate-300">{detectedCar.rang}</strong> • {detectedCar.yoqilgi}
                  </p>
                </div>

                <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center">
                  <Car className="w-5 h-5" />
                </div>
              </div>

              {/* Technical Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200 dark:border-slate-700">
                <div>
                  <span className="text-slate-400 block text-[10px]">VIN kodi:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-[11px] truncate block">
                    {detectedCar.vin}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Tex-pasport seriyasi:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-[11px]">
                    {detectedCar.texPasport}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Haydovchi pravasi:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-[11px]">
                    {detectedCar.pravaRaqam}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Hozirgi probeg:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">
                    {detectedCar.hozirgiYurganMasofa.toLocaleString()} km
                  </span>
                </div>
              </div>

            </div>

            {/* Automatically Attached Services */}
            <div>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Avtomatik biriktirilgan hujjat va xizmatlar:
              </p>
              <div className="space-y-1.5 text-xs">
                {detectedCar.xizmatlar?.map((item) => (
                  <div 
                    key={item.id} 
                    className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200">{item.nomi}</p>
                      <p className="text-[10px] text-slate-400">{item.kompaniya || item.markaz || "Davlat xizmati"}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {item.holati}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDetectedCar(null)}
                className="clean-btn py-2.5 px-4 font-bold text-xs"
              >
                Qayta qidirish
              </button>
              <button
                type="button"
                onClick={handleSaveCar}
                className="flex-1 clean-btn-primary py-2.5 px-4 font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Garajga saqlash va faollashtirish</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default AddCarModal;
