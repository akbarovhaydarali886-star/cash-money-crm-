import React, { useState } from 'react';
import { 
  SunMedium, 
  Zap, 
  ArrowDownLeft, 
  Settings, 
  Building2, 
  Briefcase,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatMoney, getSalaryStatus } from '../utils/formatters';

const BusinessServicesPage = () => {
  const { 
    businessServices, 
    withdrawSolarEarnings, 
    updateSolarKwhPrice, 
    user 
  } = useApp();

  const solar = businessServices.quyoshPaneli;
  const [customPrice, setCustomPrice] = useState(solar.narxHarBirKwh.toString());
  const [isEditingPrice, setIsEditingPrice] = useState(false);

  const salaryInfo = getSalaryStatus(user.oylikKuni || 5);

  const handlePriceSave = (e) => {
    e.preventDefault();
    const priceNum = Number(customPrice);
    if (!isNaN(priceNum) && priceNum >= 0) {
      updateSolarKwhPrice(priceNum);
      setIsEditingPrice(false);
    }
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="clean-card p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
              Yashil Energiya & Biznes
            </span>
            <span className="text-xs text-slate-400">
              Quyosh paneli va tijorat faoliyati
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1.5 flex items-center gap-2">
            <SunMedium className="w-6 h-6 text-amber-500" />
            Mening bizneslarim
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Quyosh elektr stansiyasi (har 1 kVt narxi bilan sotish) va tijorat ijara daromadlari
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={withdrawSolarEarnings}
            disabled={solar.yechibOlinadiganSofQoldiq <= 0}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all ${
              solar.yechibOlinadiganSofQoldiq > 0
                ? 'clean-btn-primary cursor-pointer'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-200 dark:border-slate-700'
            }`}
          >
            <ArrowDownLeft className="w-4 h-4" />
            <span>Hamyonga yechib olish ({formatMoney(solar.yechibOlinadiganSofQoldiq)})</span>
          </button>
        </div>
      </div>

      {/* Solar Panel Card */}
      <div className="clean-card p-5 sm:p-6 space-y-4">
        
        {/* Title and Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white">
                {solar.nomi}
              </h2>
              <p className="text-xs text-slate-400">
                Invertor: {solar.invertor} • Quvvat: <strong>{solar.quvvatKw} kW</strong>
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{solar.stansiyaHolati}</span>
          </span>
        </div>

        {/* 4 Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Bugungi ishlab chiqarish</span>
            <p className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
              {solar.orqaliKelganBugunKwh} <span className="text-xs font-normal text-slate-400">kVt/soat</span>
            </p>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
              Samaradorlik: 99.2%
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Oylik ishlab chiqarildi</span>
            <p className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
              {solar.oylikIshlabChiqarilganKwh} <span className="text-xs font-normal text-slate-400">kVt</span>
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Uy iste'moli: {solar.uyIstemoliKwh} kVt
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Tarmoqqa sotilgan elektr</span>
            <p className="text-lg font-black text-sky-600 dark:text-sky-400 mt-0.5">
              {solar.tarmoqqaSotilganKwh} <span className="text-xs font-normal text-slate-400">kVt</span>
            </p>
            <p className="text-[10px] text-sky-600 dark:text-sky-400 font-semibold mt-0.5">
              HET tarmog'iga uzatildi
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Sof foyda qoldig'i</span>
            <p className="text-lg font-black text-amber-600 dark:text-amber-400 mt-0.5">
              {formatMoney(solar.yechibOlinadiganSofQoldiq)}
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Jami daromad: {formatMoney(solar.hisoblanganDaromad)}
            </p>
          </div>

        </div>

        {/* Tariff & Price setting (Har 1 kVt narxi) */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                <Settings className="w-4 h-4 text-sky-600" />
                Elektr sotish tarifi (Har 1 kVt narxi)
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Tarmoqqa berilgan har 1 kVt elektr uchun belgilanadigan to'lov qiymati
              </p>
            </div>

            {!isEditingPrice ? (
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-sm font-black text-sky-600 dark:text-sky-400">
                    {solar.narxHarBirKwh} so'm / kVt
                  </span>
                </div>
                <button
                  onClick={() => setIsEditingPrice(true)}
                  className="clean-btn px-2.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  O'zgartirish
                </button>
              </div>
            ) : (
              <form onSubmit={handlePriceSave} className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <input
                    type="number"
                    value={customPrice}
                    onChange={(e) => setCustomPrice(e.target.value)}
                    className="w-20 bg-transparent text-xs font-black outline-none"
                    placeholder="1"
                  />
                  <span className="text-xs text-slate-400">so'm</span>
                </div>
                <button
                  type="submit"
                  className="clean-btn-primary px-3 py-1 text-xs font-bold"
                >
                  Saqlash
                </button>
                <button
                  type="button"
                  onClick={() => { setIsEditingPrice(false); setCustomPrice(solar.narxHarBirKwh.toString()); }}
                  className="clean-btn px-2 py-1 text-xs text-slate-400"
                >
                  Bekor
                </button>
              </form>
            )}
          </div>

          <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1">
            <div className="flex justify-between">
              <span>Tarmoqqa berilgan quvvat:</span>
              <strong className="font-mono">{solar.tarmoqqaSotilganKwh} kVt</strong>
            </div>
            <div className="flex justify-between">
              <span>{solar.narxHarBirKwh} so'm tarifi bo'yicha daromad:</span>
              <strong className="text-amber-600 dark:text-amber-400 font-mono">
                {solar.tarmoqqaSotilganKwh} × {solar.narxHarBirKwh} = {formatMoney(solar.tarmoqqaSotilganKwh * solar.narxHarBirKwh)}
              </strong>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-100 dark:border-slate-700">
              <span className="text-slate-400">Keyingi oylik hisob sanasi:</span>
              <span className="font-bold text-sky-600 dark:text-sky-400">{solar.keyingiHisobSanasi} da</span>
            </div>
          </div>
        </div>

      </div>

      {/* Salary & Commercial details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Salary Status */}
        <div className="clean-card p-5 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950 text-sky-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Ish joyi va Oylik daromadi
              </h3>
              <p className="text-[11px] text-slate-400">JSHSHIR orqali tasdiqlangan</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Ish joyi:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{user.ishlashJoyi}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Lavozimi:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{user.lavozimi}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Oylik sof daromad:</span>
              <span className="font-black text-sky-600 dark:text-sky-400 text-sm">
                {formatMoney(user.oylikDaromad)}
              </span>
            </div>
            <div className="pt-1.5 border-t border-slate-200 dark:border-slate-700 flex justify-between">
              <span className="text-slate-400">Oylik tushish davri:</span>
              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-sky-600" />
                Har oyning 1-10 kunlari ({user.oylikKuni}-sana)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Tushum holati:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {salaryInfo.status}
              </span>
            </div>
          </div>
        </div>

        {/* Commercial Property */}
        <div className="clean-card p-5 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Tijorat Ijara & Boshqa Bizneslar
              </h3>
              <p className="text-[11px] text-slate-400">Qo'shimcha daromad manbalari</p>
            </div>
          </div>

          <div className="space-y-2">
            {businessServices.qoshimchaBiznes.map((biz) => (
              <div key={biz.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{biz.nomi}</p>
                    <p className="text-[10px] text-slate-400">{biz.tushumSanasi}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {biz.holati}
                  </span>
                </div>

                <div className="pt-1.5 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                  <span className="text-slate-400">Oylik ijara:</span>
                  <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
                    +{formatMoney(biz.daromadSumma)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">Keyingi tushum sanasi:</span>
                  <span className="font-bold text-sky-600 dark:text-sky-400">{biz.keyingiTushumSanasi} da</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default BusinessServicesPage;
