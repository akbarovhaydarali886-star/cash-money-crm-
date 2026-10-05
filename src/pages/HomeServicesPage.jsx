import React, { useState } from 'react';
import { 
  Home, 
  Trash2, 
  Flame, 
  Droplets, 
  Zap, 
  Building, 
  Wifi, 
  Video, 
  CreditCard, 
  Gauge, 
  Calendar, 
  CheckCircle2, 
  Clock,
  Plus,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatMoney } from '../utils/formatters';

const HomeServicesPage = () => {
  const { 
    homeServices, 
    setPaymentModalData, 
    setHomeServices, 
    showNotification,
    setIsAddHomeModalOpen,
    selectActiveHome 
  } = useApp();

  const [activeTab, setActiveTab] = useState('kamunal');
  const [editingId, setEditingId] = useState(null);
  const [newReading, setNewReading] = useState('');

  const uylar = homeServices.uylar || [
    {
      id: "home-1",
      nomi: "Asosiy hovli xonadoni",
      manzil: "Toshkent sh., Yunusobod t., 14-mavze, 22-uy",
      kadastrRaqam: "10:01:05:02:01:0045",
      maydoni: "180 kv.m (4 sotix hovli)",
      xonalarSoni: 5
    }
  ];
  const activeHomeId = homeServices.activeHomeId || uylar[0]?.id;
  const currentHome = uylar.find(h => h.id === activeHomeId) || uylar[0];

  const currentKamunal = homeServices.kamunal?.filter(k => !k.homeId || k.homeId === currentHome.id) || homeServices.kamunal;
  const currentSoliqlar = homeServices.soliqlar?.filter(s => !s.homeId || s.homeId === currentHome.id) || homeServices.soliqlar;
  const currentBoshqa = homeServices.boshqa?.filter(b => !b.homeId || b.homeId === currentHome.id) || homeServices.boshqa;

  const handleUpdateReading = (item) => {
    const readingNum = Number(newReading);
    if (!readingNum || readingNum <= item.avvalgiKorsatkich) {
      showNotification("Yangi ko'rsatkich avvalgisidan katta bo'lishi kerak.", "warning");
      return;
    }

    const sarflangan = readingNum - item.avvalgiKorsatkich;
    const yangiOylikSumma = sarflangan * item.tarif;

    setHomeServices(prev => ({
      ...prev,
      kamunal: prev.kamunal.map(k => {
        if (k.id === item.id) {
          return {
            ...k,
            hozirgiKorsatkich: readingNum,
            sarflangan,
            oylikSumma: yangiOylikSumma
          };
        }
        return k;
      })
    }));

    showNotification(`${item.nomi} hisoblagichi yangilandi: ${sarflangan} birlik sarflandi.`);
    setEditingId(null);
    setNewReading('');
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Properties Switcher Row */}
      <div className="clean-card p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 max-w-full">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1.5 flex-shrink-0">
            <Home className="w-4 h-4 text-amber-500" />
            Mening ko'chmas mulklarim ({uylar.length}):
          </span>

          {uylar.map((home) => {
            const isSelected = (home.id === activeHomeId);
            return (
              <button
                key={home.id}
                onClick={() => selectActiveHome(home.id)}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold flex items-center gap-2 transition-all flex-shrink-0 ${
                  isSelected
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{home.nomi}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                  isSelected ? 'bg-amber-600 text-amber-100' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  {home.kadastrRaqam || "Kadastr bor"}
                </span>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setIsAddHomeModalOpen(true)}
          className="clean-btn px-3.5 py-2 flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:border-amber-500 flex-shrink-0 ml-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Yangi uy qo'shish</span>
        </button>
      </div>

      {/* Header Banner */}
      <div className="clean-card p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
              Kadastr: {currentHome.kadastrRaqam || "10:01:05:02:01:0045"}
            </span>
            <span className="text-xs text-slate-400">
              {currentHome.maydoni || "180 kv.m"}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1.5 flex items-center gap-2">
            <Home className="w-6 h-6 text-amber-500" />
            {currentHome.nomi}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manzil: <strong className="text-slate-700 dark:text-slate-300">{currentHome.manzil}</strong>
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('kamunal')}
            className={`py-1.5 px-3 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'kamunal' ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Kommunal to'lovlar
          </button>
          <button
            onClick={() => setActiveTab('soliqlar')}
            className={`py-1.5 px-3 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'soliqlar' ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Davlat soliqlari
          </button>
          <button
            onClick={() => setActiveTab('boshqa')}
            className={`py-1.5 px-3 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'boshqa' ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Boshqa xizmatlar
          </button>
        </div>
      </div>

      {/* 1. KOMMUNAL TO'LOVLAR (Chiqindi, Gaz, Suv, Elektr) */}
      {activeTab === 'kamunal' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentKamunal.map((item) => {
            const isEditing = editingId === item.id;

            return (
              <div key={item.id} className="clean-card p-5 flex flex-col justify-between space-y-3.5">
                
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center"
                      style={{ color: item.color }}
                    >
                      {item.tur === 'chiqindi' && <Trash2 className="w-5 h-5" />}
                      {item.tur === 'gaz' && <Flame className="w-5 h-5" />}
                      {item.tur === 'suv' && <Droplets className="w-5 h-5" />}
                      {item.tur === 'elektr' && <Zap className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {item.nomi}
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        Hisob raqam: <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold">{item.hisobRaqam}</span>
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{item.holati}</span>
                  </span>
                </div>

                {/* Details box */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs">
                  {item.tur !== 'chiqindi' ? (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Hisoblagich ko'rsatkichi:</span>
                        <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                          {item.avvalgiKorsatkich} → {item.hozirgiKorsatkich}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Sarflandi:</span>
                        <span className="font-extrabold text-sky-600 dark:text-sky-400">
                          {item.sarflangan} {item.tur === 'elektr' ? 'kVt' : 'm³'}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Tarif (1 birlik):</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {formatMoney(item.tarif)}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Xonadon a'zolari:</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {item.kishiSoni} kishi
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Oylik qat'iy to'lov:</span>
                        <span className="font-extrabold text-sky-600 dark:text-sky-400">
                          {formatMoney(item.oylikTarif)}
                        </span>
                      </div>
                    </>
                  )}

                  <div className="flex justify-between items-center pt-1 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-slate-400">Mavjud abonent balansi:</span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400">
                      +{formatMoney(item.balans)}
                    </span>
                  </div>

                  {/* To'langan va Keyingi to'lov sanasi */}
                  <div className="pt-1.5 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center text-[11px]">
                    <span className="text-slate-400">Keyingi to'lov sanasi:</span>
                    <span className="font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.keyingiTolovSanasi} da
                    </span>
                  </div>
                </div>

                {/* Meter update input */}
                {isEditing && (
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                    <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      Yangi ko'rsatkichni kiriting:
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={newReading}
                        onChange={(e) => setNewReading(e.target.value)}
                        placeholder={`${item.hozirgiKorsatkich + 10}`}
                        className="w-full px-2.5 py-1 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none font-mono"
                      />
                      <button
                        onClick={() => handleUpdateReading(item)}
                        className="clean-btn-primary px-3 py-1 text-xs font-bold whitespace-nowrap"
                      >
                        Saqlash
                      </button>
                      <button
                        onClick={() => { setEditingId(null); setNewReading(''); }}
                        className="clean-btn px-2.5 py-1 text-xs text-slate-400"
                      >
                        Bekor
                      </button>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-1">
                  {item.tur !== 'chiqindi' && !isEditing && (
                    <button
                      onClick={() => { setEditingId(item.id); setNewReading(item.hozirgiKorsatkich.toString()); }}
                      className="clean-btn px-2.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
                    >
                      <Gauge className="w-3.5 h-3.5 text-sky-600" />
                      <span>Ko'rsatkich kiritish</span>
                    </button>
                  )}

                  <button
                    onClick={() => setPaymentModalData({
                      title: `${item.nomi} to'lovi`,
                      category: "Mening uyim",
                      amount: item.oylikSumma,
                      targetId: item.id,
                      subtitle: `Hisob: ${item.hisobRaqam} • Abonent: ${item.abonentNomi}`,
                      presets: [50000, 100000, 200000, item.oylikSumma]
                    })}
                    className="flex-1 clean-btn-primary py-2 px-3 text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>To'ldirish / To'lash</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* 2. DAVLAT SOLIQLARI */}
      {activeTab === 'soliqlar' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentSoliqlar.map((soliq) => (
            <div key={soliq.id} className="clean-card p-5 flex flex-col justify-between space-y-3.5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-800">
                    Davlat Soliq Qo'mitasi
                  </span>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white mt-1.5">
                    {soliq.nomi}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {soliq.obyekt}
                  </p>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{soliq.holati}</span>
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Yillik hisoblangan summa:</span>
                  <span className="font-extrabold text-slate-900 dark:text-white">
                    {formatMoney(soliq.yillikSumma)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">To'langan:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {formatMoney(soliq.tolangan)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Qoldiq to'lov:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {formatMoney(soliq.qoldiq)}
                  </span>
                </div>
                <div className="pt-1.5 border-t border-slate-200 dark:border-slate-700 flex justify-between">
                  <span className="text-slate-400">Keyingi to'lov sanasi:</span>
                  <span className="font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {soliq.keyingiTolovSanasi} da
                  </span>
                </div>
              </div>

              <button
                disabled={soliq.qoldiq <= 0}
                onClick={() => setPaymentModalData({
                  title: soliq.nomi,
                  category: "Mening uyim",
                  amount: soliq.qoldiq || 360000,
                  targetId: soliq.id,
                  recipientName: "Davlat Soliq Boshqarmasi G'aznachiligi",
                  subtitle: soliq.obyekt
                })}
                className={`w-full py-2 px-3 font-bold text-xs flex items-center justify-center gap-1.5 rounded-xl transition-all ${
                  soliq.qoldiq > 0
                    ? 'clean-btn-primary cursor-pointer'
                    : 'clean-btn text-slate-500 hover:text-slate-900'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>{soliq.qoldiq > 0 ? `Soliqni to'lash (${formatMoney(soliq.qoldiq)})` : "Qayta / Oldindan to'lov"}</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 3. BOSHQALAR */}
      {activeTab === 'boshqa' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentBoshqa.map((xizmat) => (
            <div key={xizmat.id} className="clean-card p-5 flex flex-col justify-between space-y-3.5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {xizmat.nomi}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Hisob: {xizmat.hisobRaqam}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sky-600">
                  {xizmat.icon === 'Wifi' && <Wifi className="w-4 h-4" />}
                  {xizmat.icon === 'Building' && <Building className="w-4 h-4" />}
                  {xizmat.icon === 'Video' && <Video className="w-4 h-4" />}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Oylik to'lov:</span>
                  <span className="font-extrabold text-slate-900 dark:text-white">
                    {formatMoney(xizmat.oylikSumma)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Holati:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {xizmat.holati}
                  </span>
                </div>
                <div className="pt-1 border-t border-slate-200 dark:border-slate-700 flex justify-between">
                  <span className="text-slate-400">Keyingi to'lov:</span>
                  <span className="font-semibold text-sky-600 dark:text-sky-400">
                    {xizmat.keyingiTolovSanasi} da
                  </span>
                </div>
              </div>

              <button
                onClick={() => setPaymentModalData({
                  title: xizmat.nomi,
                  category: "Mening uyim",
                  amount: xizmat.oylikSumma,
                  targetId: xizmat.id,
                  subtitle: `Hisob: ${xizmat.hisobRaqam}`
                })}
                className="w-full clean-btn-primary py-2 px-3 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>To'lov qilish ({formatMoney(xizmat.oylikSumma)})</span>
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default HomeServicesPage;
