import React, { useState } from 'react';
import { 
  Users, 
  CreditCard, 
  Receipt, 
  Calendar, 
  Plus, 
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatMoney } from '../utils/formatters';

const FamilyServicesPage = () => {
  const { familyServices, setFamilyServices, setPaymentModalData, setSelectedReceipt, showNotification } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newChild, setNewChild] = useState({
    ism: '',
    yosh: 7,
    daraja: "1-sinf o'quvchisi",
    muassasa: '',
    xizmatTuri: "Oylik to'garak / maktab",
    oylikSumma: 500000,
    tolovMuddatiKuni: 5
  });

  const handleAddChild = (e) => {
    e.preventDefault();
    if (!newChild.ism || !newChild.muassasa) {
      showNotification("Farzand ismi va muassasa nomini kiriting.", "warning");
      return;
    }

    const created = {
      id: `fam-${Date.now()}`,
      ...newChild,
      status: "To'lov kutilmoqda",
      qarz: Number(newChild.oylikSumma),
      cheklar: [],
      keyingiTolovSanasi: `2026-11-${String(newChild.tolovMuddatiKuni).padStart(2, '0')}`
    };

    setFamilyServices(prev => [...prev, created]);
    setShowAddModal(false);
    showNotification(`${newChild.ism} uchun ta'lim xizmati muvaffaqiyatli qo'shildi.`);
    setNewChild({
      ism: '',
      yosh: 7,
      daraja: "1-sinf o'quvchisi",
      muassasa: '',
      xizmatTuri: "Oylik to'garak / maktab",
      oylikSumma: 500000,
      tolovMuddatiKuni: 5
    });
  };

  const totalFamilyCost = familyServices.reduce((acc, curr) => acc + (curr.oylikSumma || 0), 0);

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="clean-card p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-800">
              Oila & Ta'lim
            </span>
            <span className="text-xs text-slate-400">
              4 nafar farzand ro'yxatda
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1.5 flex items-center gap-2">
            <Users className="w-6 h-6 text-rose-500" />
            Mening oilam
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Xususiy maktab, bolalar bog'chasi, to'garaklar to'lovlari hamda to'lov cheklari
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-right">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Oylik jami ta'lim harajati</span>
            <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
              {formatMoney(totalFamilyCost)}
            </span>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="clean-btn px-3.5 py-2 flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400"
          >
            <Plus className="w-4 h-4" />
            <span>Qo'shish</span>
          </button>
        </div>
      </div>

      {/* Children Cards List (4 Farzand) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {familyServices.map((child) => {
          const isPaid = child.status === "To'langan";

          return (
            <div key={child.id} className="clean-card p-5 flex flex-col justify-between space-y-3.5">
              
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-black text-sm">
                    {child.ism[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                        {child.ism}
                      </h3>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
                        {child.yosh} yosh
                      </span>
                    </div>
                    <p className="text-xs text-sky-600 dark:text-sky-400 font-semibold mt-0.5">
                      {child.daraja}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{child.status}</span>
                </span>
              </div>

              {/* Details box */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <div>
                  <span className="text-slate-400">Muassasa:</span>
                  <p className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm mt-0.5">
                    {child.muassasa}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-1 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400">Xizmat turi:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {child.xizmatTuri}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Oylik to'lov summasi:</span>
                  <span className="text-sm sm:text-base font-black text-sky-600 dark:text-sky-400">
                    {formatMoney(child.oylikSumma)}
                  </span>
                </div>

                {/* Keyingi to'lov sanasi */}
                <div className="pt-1.5 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">Keyingi to'lov sanasi:</span>
                  <span className="font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {child.keyingiTolovSanasi} da
                  </span>
                </div>
              </div>

              {/* Receipts */}
              <div>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Receipt className="w-3.5 h-3.5 text-sky-600" />
                  Mavjud to'lov cheklari:
                </p>

                {child.cheklar && child.cheklar.length > 0 ? (
                  <div className="space-y-1">
                    {child.cheklar.map((chk, i) => (
                      <div 
                        key={i}
                        onClick={() => setSelectedReceipt({
                          id: chk.chekId,
                          sanaVaqt: chk.sana,
                          summa: chk.summa,
                          xizmatNomi: `${child.ism} - ${chk.xizmat}`,
                          toifa: "Mening oilam",
                          tolovchi: "Sardor Karimov",
                          tolovchiKarta: "8600 •••• •••• 4589",
                          qabulQiluvchi: child.muassasa,
                          holati: "To'langan (Tasdiqlangan)",
                          fiskalBelgi: "CHL-" + Math.floor(100000000 + Math.random() * 900000000)
                        })}
                        className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs cursor-pointer hover:border-sky-300 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white truncate max-w-[160px]">
                              {chk.xizmat}
                            </p>
                            <p className="text-[10px] text-slate-400">{chk.sana}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {formatMoney(chk.summa)}
                          </span>
                          <p className="text-[10px] text-sky-600 dark:text-sky-400 font-semibold">Chekni ko'rish</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-400 italic">Chek mavjud emas</p>
                )}
              </div>

              {/* Action */}
              <div className="pt-1">
                <button
                  onClick={() => setPaymentModalData({
                    title: `${child.ism} - ${child.muassasa} to'lovi`,
                    category: "Mening oilam",
                    amount: child.oylikSumma,
                    targetId: child.id,
                    recipientName: child.muassasa,
                    subtitle: child.xizmatTuri
                  })}
                  className="w-full clean-btn-primary py-2 px-3 text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>
                    {isPaid ? "Qayta / Oldindan to'lov qilish" : `To'lov qilish (${formatMoney(child.oylikSumma)})`}
                  </span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 relative shadow-xl">
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-3">
              Yangi farzand / to'garak qo'shish
            </h3>
            
            <form onSubmit={handleAddChild} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Farzand ismi
                </label>
                <input
                  type="text"
                  value={newChild.ism}
                  onChange={(e) => setNewChild({ ...newChild, ism: e.target.value })}
                  placeholder="Jasur"
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Yoshi
                  </label>
                  <input
                    type="number"
                    value={newChild.yosh}
                    onChange={(e) => setNewChild({ ...newChild, yosh: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    To'lov kuni (1-10)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={newChild.tolovMuddatiKuni}
                    onChange={(e) => setNewChild({ ...newChild, tolovMuddatiKuni: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Ta'lim muassasasi / To'garak nomi
                </label>
                <input
                  type="text"
                  value={newChild.muassasa}
                  onChange={(e) => setNewChild({ ...newChild, muassasa: e.target.value })}
                  placeholder="Cambridge Academy"
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Oylik to'lov summasi (so'm)
                </label>
                <input
                  type="number"
                  value={newChild.oylikSumma}
                  onChange={(e) => setNewChild({ ...newChild, oylikSumma: Number(e.target.value) })}
                  placeholder="800000"
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 clean-btn-primary font-bold text-xs"
                >
                  Qo'shish
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="clean-btn px-4 py-2 text-xs font-semibold text-slate-500"
                >
                  Bekor qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default FamilyServicesPage;
