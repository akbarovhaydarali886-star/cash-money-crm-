import React from 'react';
import { 
  Wallet, 
  CreditCard, 
  TrendingUp, 
  Calendar, 
  SunMedium, 
  Home, 
  Car, 
  Users, 
  Receipt, 
  ArrowDownLeft, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  Clock,
  Briefcase,
  DollarSign
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatMoney, getSalaryStatus } from '../utils/formatters';

const DashboardPage = () => {
  const { 
    user, 
    homeServices, 
    carServices, 
    familyServices, 
    businessServices, 
    receipts, 
    setActivePage, 
    setSelectedReceipt, 
    setPaymentModalData,
    withdrawSolarEarnings,
    receiveMonthlySalary
  } = useApp();

  const salaryInfo = getSalaryStatus(user.oylikKuni || 5);
  const solar = businessServices.quyoshPaneli;

  const familyTotalMonthly = familyServices.reduce((sum, item) => sum + (item.oylikSumma || 0), 0);
  const kamunalMonthly = homeServices.kamunal.reduce((sum, item) => sum + (item.oylikSumma || 0), 0);
  const estimatedExpenses = familyTotalMonthly + kamunalMonthly;
  const remainingSavings = Math.max(0, user.oylikDaromad - estimatedExpenses);

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="clean-card p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-800">
              Shaxsiy Hamyon Tizimi
            </span>
            <span className="text-xs text-slate-400">
              JSHSHIR: <strong className="font-mono text-slate-700 dark:text-slate-300">{user.jshshir || "31204951234567"}</strong>
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1.5">
            {user.ism} {user.familiya}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Ish joyi: <strong className="text-slate-700 dark:text-slate-300">{user.ishlashJoyi || "Kompaniya"}</strong> • Lavozim: <strong className="text-slate-700 dark:text-slate-300">{user.lavozimi || "Mutaxassis"}</strong>
          </p>
        </div>

        {/* Oylik maoshni qabul qilish tugmasi (Qayta-qayta qabul qilib bo'lmaydi) */}
        <div className="flex items-center gap-2">
          {user.maoshQabulQilingan ? (
            <div className="px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Oktabr maoshi qabul qilingan (Keyingi: {user.keyingiMaoshSanasi || '2026-11-05'})</span>
            </div>
          ) : (
            <button
              onClick={receiveMonthlySalary}
              className="clean-btn-primary px-4 py-2.5 flex items-center gap-2 text-xs font-bold shadow-sm"
            >
              <Briefcase className="w-4 h-4" />
              <span>Oylik maoshni qabul qilish ({formatMoney(user.oylikDaromad)})</span>
            </button>
          )}
        </div>
      </div>

      {/* Main 3 Cards: Wallet + Salary + Solar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* 1. Main Wallet Card */}
        <div className="clean-card p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Mavjud Erkin Balans
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-sky-600 dark:text-sky-400 mt-1">
                {formatMoney(user.balans)}
              </h2>
            </div>
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center border border-sky-100 dark:border-sky-900">
              <Wallet className="w-5 h-5" />
            </div>
          </div>

          <div className="my-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Karta raqami:</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                {user.kartaRaqam}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Oylik manbasi:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {user.ishlashJoyi}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Karta egasi:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 uppercase">
                {user.ism} {user.familiya}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Markaziy Bank kafolatlangan</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">EXP: {user.kartaMuddati || "08/28"}</span>
          </div>
        </div>

        {/* 2. Salary Schedule Card (Oylik bilan o'lchanadigan mexanizm) */}
        <div className="clean-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-sky-600" />
                Oylik Maosh Jadvali
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                1-10 kunlar oralig'i
              </span>
            </div>

            <div className="mt-3">
              <span className="text-xs text-slate-400">Oylik belgilangan maosh:</span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                {formatMoney(user.oylikDaromad)}
              </h3>
            </div>

            <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Tushish statusi:</span>
                <span className="font-bold text-sky-600 dark:text-sky-400">
                  {user.maoshQabulQilingan 
                    ? `Oktabr maoshi qabul qilingan` 
                    : `Tushishi kutilmoqda (${user.oylikKuni}-oktabr)`}
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${user.maoshQabulQilingan ? 'bg-emerald-500 w-full' : 'bg-sky-600 w-1/2'}`}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 pt-0.5">
                <span>Keyingi oylik maosh:</span>
                <span className="font-bold text-sky-600 dark:text-sky-400">{user.keyingiMaoshSanasi || '2026-11-05'} da (31 kun qoldi)</span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block">Ortib qoladigan sof jamg'arma:</span>
              <span className="font-black text-emerald-600 dark:text-emerald-400">
                {formatMoney(remainingSavings)}
              </span>
            </div>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
        </div>

        {/* 3. Solar Live Card */}
        <div className="clean-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1">
                <SunMedium className="w-3.5 h-3.5" />
                Quyosh Paneli (Biznes)
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                {solar.stansiyaHolati.split(' ')[0]}
              </span>
            </div>

            <div className="mt-3">
              <span className="text-xs text-slate-400">Quyoshdan to'plangan daromad:</span>
              <h3 className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-0.5">
                {formatMoney(solar.yechibOlinadiganSofQoldiq)}
              </h3>
            </div>

            <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Ishlab chiqarildi:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{solar.oylikIshlabChiqarilganKwh} kVt</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tarmoqqa sotildi:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{solar.tarmoqqaSotilganKwh} kVt</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tarif (har 1 kVt):</span>
                <span className="font-bold text-sky-600 dark:text-sky-400">{solar.narxHarBirKwh} so'm</span>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <button
              onClick={withdrawSolarEarnings}
              disabled={solar.yechibOlinadiganSofQoldiq <= 0}
              className={`w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                solar.yechibOlinadiganSofQoldiq > 0
                  ? 'clean-btn-primary cursor-pointer'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-200 dark:border-slate-700'
              }`}
            >
              <ArrowDownLeft className="w-3.5 h-3.5" />
              <span>Hamyonga yechib olish ({formatMoney(solar.yechibOlinadiganSofQoldiq)})</span>
            </button>
          </div>
        </div>

      </div>

      {/* 4 Section Navigation Cards */}
      <div>
        <h2 className="text-sm font-black text-slate-900 dark:text-white mb-2.5">
          Asosiy Bo'limlar
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          <div 
            onClick={() => setActivePage('home')}
            className="clean-card p-4 cursor-pointer hover:border-sky-300 dark:hover:border-sky-700 transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2.5">
              <Home className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
              Mening uyim
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Elektr, gaz, suv, chiqindi, soliqlar
            </p>
            <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-sky-600 dark:text-sky-400 font-semibold">
              <span>{homeServices.uylar?.length || 1} ta ko'chmas mulk</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          <div 
            onClick={() => setActivePage('car')}
            className="clean-card p-4 cursor-pointer hover:border-sky-300 dark:hover:border-sky-700 transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2.5">
              <Car className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
              Mening avtomobilim
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Sug'urta, texosmotr, jarimalar
            </p>
            <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-sky-600 dark:text-sky-400 font-semibold">
              <span>{carServices.avtomobil?.model?.split(' ')[0]} {carServices.avtomobil?.model?.split(' ')[1] || ''} ({carServices.garaj?.length || 1} ta)</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          <div 
            onClick={() => setActivePage('family')}
            className="clean-card p-4 cursor-pointer hover:border-sky-300 dark:hover:border-sky-700 transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-2.5">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
              Mening oilam
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              4 farzand: maktab, bog'cha, to'garaklar
            </p>
            <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-sky-600 dark:text-sky-400 font-semibold">
              <span>Cheklar bilan</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          <div 
            onClick={() => setActivePage('business')}
            className="clean-card p-4 cursor-pointer hover:border-sky-300 dark:hover:border-sky-700 transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2.5">
              <SunMedium className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
              Mening bizneslarim
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Quyosh paneli & Ijara tushumlari
            </p>
            <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-sky-600 dark:text-sky-400 font-semibold">
              <span>1 kVt sotish</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

        </div>
      </div>

      {/* Overview of Statuses: To'langan va Keyingi to'lovlar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Status of Key Services */}
        <div className="clean-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              To'langan xizmatlar va Keyingi to'lov sanalari
            </h3>
            <span className="text-[11px] font-semibold text-slate-400">Status</span>
          </div>

          <div className="space-y-2">
            {/* 1. Maktab */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  Jasur - 'Smart School' maktab to'lovi
                </p>
                <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3 text-sky-600" />
                  Keyingi to'lov sanasi: <strong className="text-slate-700 dark:text-slate-300">2026-11-05</strong> da
                </p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                To'langan
              </span>
            </div>

            {/* 2. Bog'cha */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  Madina - 'Erkatoy Kids' bog'cha to'lovi
                </p>
                <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3 text-sky-600" />
                  Keyingi to'lov sanasi: <strong className="text-slate-700 dark:text-slate-300">2026-11-10</strong> da
                </p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                To'langan
              </span>
            </div>

            {/* 3. Elektr energiya */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  Hududiy Elektr Tarmoqlari (Elektr)
                </p>
                <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3 text-sky-600" />
                  Keyingi to'lov sanasi: <strong className="text-slate-700 dark:text-slate-300">2026-11-10</strong> da
                </p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                To'langan (+220 000 so'm)
              </span>
            </div>
          </div>
        </div>

        {/* Recent Receipts */}
        <div className="clean-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Receipt className="w-4 h-4 text-sky-600" />
              Oxirgi elektron cheklar
            </h3>
            <button
              onClick={() => setActivePage('receipts')}
              className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline"
            >
              Barchasi
            </button>
          </div>

          <div className="space-y-2">
            {receipts.slice(0, 3).map((rec) => (
              <div 
                key={rec.id}
                onClick={() => setSelectedReceipt(rec)}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[160px] sm:max-w-xs">
                      {rec.xizmatNomi}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {rec.sanaVaqt} • {rec.toifa}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs font-black text-slate-900 dark:text-white">
                    {formatMoney(rec.summa)}
                  </p>
                  <span className="text-[10px] text-sky-600 dark:text-sky-400 font-bold">
                    Chekni ochish
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default DashboardPage;
