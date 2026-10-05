import React from 'react';
import { 
  Car, 
  ShieldCheck, 
  AlertOctagon, 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  MapPin,
  Calendar,
  AlertCircle,
  Plus,
  FileText,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatMoney } from '../utils/formatters';

const CarServicesPage = () => {
  const { 
    carServices, 
    setPaymentModalData, 
    setIsAddCarModalOpen, 
    selectActiveCar 
  } = useApp();

  const garaj = carServices.garaj || [carServices.avtomobil];
  const auto = carServices.avtomobil || garaj[0];
  const activeCarId = carServices.activeCarId || auto.id;

  const currentJarimalar = carServices.jarimalar?.filter(j => !j.carId || j.carId === auto.id) || [];
  const currentXizmatlar = carServices.xizmatlar?.filter(x => !x.carId || x.carId === auto.id) || [];

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Garage Switcher Row */}
      <div className="clean-card p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 max-w-full">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1.5 flex-shrink-0">
            <Car className="w-4 h-4 text-sky-600" />
            Mening garajim ({garaj.length}):
          </span>

          {garaj.map((car) => {
            const isSelected = (car.id === activeCarId);
            return (
              <button
                key={car.id}
                onClick={() => selectActiveCar(car.id)}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold flex items-center gap-2 transition-all flex-shrink-0 ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{car.model.split(' ')[0]} {car.model.split(' ')[1] || ''}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                  isSelected ? 'bg-sky-700 text-sky-100' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  {car.raqam}
                </span>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setIsAddCarModalOpen(true)}
          className="clean-btn px-3.5 py-2 flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400 hover:border-sky-500 flex-shrink-0 ml-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Yangi avtomobil qo'shish</span>
        </button>
      </div>

      {/* Header Banner - Selected Vehicle Info */}
      <div className="clean-card p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900 flex items-center justify-center flex-shrink-0">
            <Car className="w-7 h-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-800">
                Faol avtomobil
              </span>
              
              {/* Official Plate */}
              <div className="flex items-center border-2 border-slate-900 dark:border-white rounded-md overflow-hidden bg-white text-slate-900 text-xs font-black shadow-xs">
                <span className="bg-slate-900 text-white dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono">
                  {auto.raqam.split(' ')[0] || '01'}
                </span>
                <span className="px-2 py-0.5 tracking-wider font-mono">
                  {auto.raqam.replace(/^[0-9]{2}\s*/, '')}
                </span>
                <span className="bg-sky-600 text-white px-1 text-[9px] font-bold flex items-center">
                  UZ
                </span>
              </div>

              <span className="text-xs font-bold text-slate-400">
                {auto.yil}-yil
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1.5">
              {auto.model}
            </h1>
            
            {/* Prava & Tech Details Row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400 mt-1">
              <span>
                Prava: <strong className="font-mono text-slate-800 dark:text-slate-200">{auto.pravaRaqam || "AF 1234567"}</strong>
              </span>
              <span>
                Tex-pasport: <strong className="font-mono text-slate-800 dark:text-slate-200">{auto.texPasport || "AAF 9981240"}</strong>
              </span>
              <span>
                VIN: <strong className="font-mono text-slate-800 dark:text-slate-200">{auto.vin}</strong>
              </span>
              <span>
                Probeg: <strong className="text-slate-800 dark:text-slate-200">{auto.hozirgiYurganMasofa?.toLocaleString()} km</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-2.5">
          <div className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Jarimalar</span>
            <span className="text-xs font-black text-rose-600 dark:text-rose-400">
              {currentJarimalar.filter(j => j.holati !== "To'langan").length} ta to'lanmagan
            </span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Sug'urta holati</span>
            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
              Faol va to'langan
            </span>
          </div>
        </div>
      </div>

      {/* Jarimalar */}
      <div className="clean-card p-5 space-y-3">
        <div>
          <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-rose-600" />
            Yo'l Harakati Qoidabuzarligi Jarimalari (DYXX Radarlar)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            50% chegirmada to'lash muddati va tafsilotlari
          </p>
        </div>

        <div className="space-y-2.5">
          {currentJarimalar.length === 0 ? (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2.5 text-xs text-emerald-700 dark:text-emerald-300 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Ajoyib! {auto.model} ({auto.raqam}) uchun hech qanday to'lanmagan radar jarimalari mavjud emas.</span>
            </div>
          ) : (
            currentJarimalar.map((jarima) => {
              const isPaid = jarima.holati === "To'langan";

            return (
              <div 
                key={jarima.id} 
                className={`p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                  isPaid ? 'opacity-80' : ''
                }`}
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                      {jarima.qarorRaqami}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                      isPaid 
                        ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
                        : 'bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                    }`}>
                      {isPaid ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      <span>{jarima.holati}</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {jarima.modda}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {jarima.manzil}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {jarima.sanaVaqt}
                    </span>
                  </div>

                  {!isPaid ? (
                    <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold pt-0.5 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>50% chegirmada to'lashning oxirgi kuni: <strong>{jarima.chegirmaOxirgiKuni}</strong></span>
                    </div>
                  ) : (
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold pt-0.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Jarima to'liq to'landi va davlat bazasida yopildi.</span>
                    </div>
                  )}
                </div>

                {/* Amount and Action */}
                <div className="flex md:flex-col items-center md:items-end justify-between gap-2">
                  <div className="text-right">
                    {!isPaid ? (
                      <>
                        <p className="text-base font-black text-rose-600 dark:text-rose-400">
                          {formatMoney(jarima.chegirmaSumma)}
                        </p>
                        <p className="text-[11px] text-slate-400 line-through">
                          Asl: {formatMoney(jarima.aslSumma)}
                        </p>
                      </>
                    ) : (
                      <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>To'liq to'langan</span>
                      </p>
                    )}
                  </div>

                  {!isPaid ? (
                    <button
                      onClick={() => setPaymentModalData({
                        title: `Jarima to'lovi (${jarima.qarorRaqami})`,
                        category: "Mening avtomobilim",
                        amount: jarima.chegirmaSumma,
                        targetId: jarima.id,
                        recipientName: "DYXX Yagona G'aznachiligi",
                        subtitle: jarima.modda
                      })}
                      className="clean-btn-primary px-3 py-1.5 text-xs font-bold flex items-center gap-1.5"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>50% chegirmada to'lash</span>
                    </button>
                  ) : (
                    <span className="text-[11px] text-slate-400 font-medium">
                      Keyingi jarimalar yo'q
                    </span>
                  )}
                </div>
              </div>
            );
          }))}
        </div>
      </div>

      {/* Sug'urta, Texnik ko'rik, Talonlar */}
      <div>
        <h2 className="text-sm font-black text-slate-900 dark:text-white mb-3">
          Hujjatlar, Sug'urtalar va Texnik Ko'rik
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentXizmatlar.map((xizmat) => (
            <div key={xizmat.id} className="clean-card p-5 flex flex-col justify-between space-y-3.5">
              
              <div>
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-800">
                    {xizmat.toifa}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{xizmat.holati}</span>
                  </span>
                </div>

                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white mt-1.5">
                  {xizmat.nomi}
                </h3>
                {xizmat.kompaniya && (
                  <p className="text-xs text-slate-400 mt-0.5">
                    {xizmat.kompaniya} • Polis: <span className="font-mono">{xizmat.polisRaqam}</span>
                  </p>
                )}
                {xizmat.markaz && (
                  <p className="text-xs text-slate-400 mt-0.5">
                    {xizmat.markaz}
                  </p>
                )}
              </div>

              {/* Exact Dates */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs">
                {xizmat.tugashSana && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Tugash sanasi:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {xizmat.tugashSana}
                    </span>
                  </div>
                )}
                {xizmat.qolganKun !== undefined && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Qolgan muddat:</span>
                    <span className="font-extrabold text-sky-600 dark:text-sky-400">
                      {xizmat.qolganKun} kun
                    </span>
                  </div>
                )}
                {xizmat.qolganMasofa !== undefined && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Moy uchun qolgan masofa:</span>
                    <span className="font-extrabold text-amber-500">
                      {xizmat.qolganMasofa} km
                    </span>
                  </div>
                )}
                
                {/* Keyingi to'lov sanasi */}
                <div className="pt-1.5 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">Keyingi to'lov sanasi:</span>
                  <span className="font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {xizmat.keyingiTolovSanasi} da
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Xizmat qiymati:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {formatMoney(xizmat.summa)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setPaymentModalData({
                  title: `${xizmat.nomi} to'lovi`,
                  category: "Mening avtomobilim",
                  amount: xizmat.summa,
                  targetId: xizmat.id,
                  recipientName: xizmat.kompaniya || "Avtotransport Xizmati"
                })}
                className="w-full clean-btn-primary py-2 px-3 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Muddati uzaytirish / To'lash</span>
              </button>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default CarServicesPage;
