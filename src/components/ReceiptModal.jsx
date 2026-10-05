import React from 'react';
import { 
  X, 
  Printer, 
  CheckCircle2, 
  QrCode, 
  ShieldCheck, 
  Calendar,
  CreditCard
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatMoney } from '../utils/formatters';

const ReceiptModal = () => {
  const { selectedReceipt, setSelectedReceipt } = useApp();

  if (!selectedReceipt) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 relative shadow-xl max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedReceipt(null)}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Printable Area */}
        <div id="printable-receipt" className="space-y-4">
          
          {/* Status Header */}
          <div className="text-center pt-1">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mb-2">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              {selectedReceipt.holati || "Muvaffaqiyatli to'landi"}
            </span>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">
              {formatMoney(selectedReceipt.summa)}
            </p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {selectedReceipt.xizmatNomi}
            </p>
          </div>

          {/* Receipt Lines Box */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
            
            <div className="flex justify-between items-center pb-1.5 border-b border-slate-200 dark:border-slate-700">
              <span className="text-slate-400">Chek raqami:</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                {selectedReceipt.id}
              </span>
            </div>

            <div className="flex justify-between items-center pb-1.5 border-b border-slate-200 dark:border-slate-700">
              <span className="text-slate-400">Sana va vaqt:</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-sky-600" />
                {selectedReceipt.sanaVaqt}
              </span>
            </div>

            <div className="flex justify-between items-center pb-1.5 border-b border-slate-200 dark:border-slate-700">
              <span className="text-slate-400">Toifa:</span>
              <span className="font-bold text-sky-600 dark:text-sky-400">
                {selectedReceipt.toifa}
              </span>
            </div>

            <div className="flex justify-between items-center pb-1.5 border-b border-slate-200 dark:border-slate-700">
              <span className="text-slate-400">To'lovchi:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {selectedReceipt.tolovchi}
              </span>
            </div>

            <div className="flex justify-between items-center pb-1.5 border-b border-slate-200 dark:border-slate-700">
              <span className="text-slate-400">Karta:</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                {selectedReceipt.tolovchiKarta || "Hamyon kartasi"}
              </span>
            </div>

            <div className="flex justify-between items-center pb-1.5 border-b border-slate-200 dark:border-slate-700">
              <span className="text-slate-400">Qabul qiluvchi:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 text-right truncate max-w-[200px]">
                {selectedReceipt.qabulQiluvchi}
              </span>
            </div>

            {selectedReceipt.fiskalBelgi && (
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Fiskal belgi:</span>
                <span className="font-mono text-[11px] text-slate-600 dark:text-slate-300">
                  {selectedReceipt.fiskalBelgi}
                </span>
              </div>
            )}

          </div>

          {/* QR Code and verification box */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
            <div className="w-14 h-14 bg-white p-1 rounded-lg border border-slate-200 flex items-center justify-center flex-shrink-0">
              <QrCode className="w-full h-full text-slate-900" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Yuridik Kuchga Ega Kvitansiya</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                Bank va soliq ma'lumotlar bazasi orqali tasdiqlangan elektron to'lov hujjati.
              </p>
            </div>
          </div>

        </div>

        {/* Buttons */}
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handlePrint}
            className="clean-btn py-2 px-3 flex items-center justify-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200"
          >
            <Printer className="w-4 h-4 text-sky-600" />
            <span>Chop etish</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedReceipt(null)}
            className="clean-btn-primary py-2 px-3 text-xs font-bold"
          >
            Yopish
          </button>
        </div>

      </div>
    </div>
  );
};

export default ReceiptModal;
