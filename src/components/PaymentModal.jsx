import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  ShieldCheck, 
  AlertCircle, 
  Delete,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatMoney } from '../utils/formatters';

const PaymentModal = () => {
  const { 
    paymentModalData, 
    setPaymentModalData, 
    user, 
    executePayment 
  } = useApp();

  const [pin, setPin] = useState('');
  const [customAmount, setCustomAmount] = useState(
    paymentModalData ? paymentModalData.amount : 0
  );
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  if (!paymentModalData) return null;

  const currentAmount = customAmount || paymentModalData.amount || 0;
  const isBalanceEnough = user.balans >= currentAmount;

  const handlePinInput = (num) => {
    if (pin.length < 4) {
      setPin(prev => prev + num);
    }
  };

  const handlePinBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handleConfirmPayment = () => {
    setError('');

    if (pin !== user.pinCode) {
      setError("PIN-kod noto'g'ri kiritildi! Iltimos, qaytadan urinib ko'ring.");
      setPin('');
      return;
    }

    executePayment({
      title: paymentModalData.title,
      category: paymentModalData.category,
      amount: currentAmount,
      targetId: paymentModalData.targetId,
      recipientName: paymentModalData.recipientName,
      recipientAccount: paymentModalData.recipientAccount
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 relative shadow-xl max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setPaymentModalData(null)}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <div className="w-12 h-12 mx-auto rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900 flex items-center justify-center mb-2">
            <CreditCard className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            {paymentModalData.category}
          </span>
          <h2 className="text-base font-black text-slate-900 dark:text-white mt-0.5">
            {paymentModalData.title}
          </h2>
          {paymentModalData.subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {paymentModalData.subtitle}
            </p>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {step === 1 ? (
          <div className="space-y-4">
            
            {/* Amount Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                To'lov summasi
              </label>
              <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(Number(e.target.value))}
                  className="w-full bg-transparent text-lg font-black text-slate-900 dark:text-white outline-none"
                />
                <span className="text-xs font-bold text-slate-400 ml-2">so'm</span>
              </div>
            </div>

            {/* Presets */}
            {paymentModalData.presets && (
              <div className="flex gap-1.5">
                {paymentModalData.presets.map((presetVal, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCustomAmount(presetVal)}
                    className="flex-1 py-1.5 px-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    {formatMoney(presetVal)}
                  </button>
                ))}
              </div>
            )}

            {/* Balances detail */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">To'lov manbasi:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Hamyon ({user.kartaRaqam})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Mavjud balans:</span>
                <span className={`font-black ${isBalanceEnough ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>
                  {formatMoney(user.balans)}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1.5 border-t border-slate-200 dark:border-slate-700">
                <span className="text-slate-500">To'lovdan keyingi qoldiq:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {formatMoney(user.balans - currentAmount)}
                </span>
              </div>
            </div>

            {!isBalanceEnough ? (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-400 text-xs">
                Hisobingizda mablag' yetarli emas. Maosh tushishini kuting yoki quyosh paneli daromadini yechib oling.
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-2.5 clean-btn-primary font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <span>Davom etish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

          </div>
        ) : (
          /* Step 2: PIN Verification */
          <div className="text-center space-y-4">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-400">To'lanadigan summa:</span>
              <p className="text-xl font-black text-sky-600 dark:text-sky-400 mt-0.5">
                {formatMoney(currentAmount)}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Tasdiqlash uchun 4 xonali PIN kodni kiriting
              </p>
            </div>

            {/* PIN Dots */}
            <div className="flex justify-center gap-3">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`w-3.5 h-3.5 rounded-full transition-all ${
                    pin.length > idx
                      ? 'bg-sky-600 scale-125'
                      : 'bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600'
                  }`}
                />
              ))}
            </div>

            {/* NumPad */}
            <div className="grid grid-cols-3 gap-2 max-w-[230px] mx-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => handlePinInput(num.toString())}
                  className="h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-sm text-slate-900 dark:text-white transition-colors"
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setStep(1)}
                className="h-10 rounded-xl clean-btn text-xs font-semibold text-slate-500"
              >
                Orqaga
              </button>
              <button
                type="button"
                onClick={() => handlePinInput("0")}
                className="h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-sm text-slate-900 dark:text-white transition-colors"
              >
                0
              </button>
              <button
                type="button"
                onClick={handlePinBackspace}
                className="h-10 rounded-xl clean-btn flex items-center justify-center text-slate-500 hover:text-rose-500"
              >
                <Delete className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              disabled={pin.length < 4}
              onClick={handleConfirmPayment}
              className={`w-full py-2.5 font-bold text-xs rounded-xl transition-all ${
                pin.length === 4
                  ? 'clean-btn-primary cursor-pointer'
                  : 'opacity-50 cursor-not-allowed bg-slate-200 dark:bg-slate-800 text-slate-400'
              }`}
            >
              To'lovni tasdiqlash
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default PaymentModal;
