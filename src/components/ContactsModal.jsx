import React, { useState } from 'react';
import { 
  X, 
  PhoneCall, 
  Send, 
  Mail, 
  MapPin, 
  MessageSquare, 
  CheckCircle,
  Headphones
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const ContactsModal = () => {
  const { isContactsModalOpen, setIsContactsModalOpen, showNotification } = useApp();
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!isContactsModalOpen) return null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
    showNotification("Xabaringiz qo'llab-quvvatlash markaziga yetkazildi. Tez orada javob beramiz!");
    setTimeout(() => {
      setMessage('');
      setSent(false);
      setIsContactsModalOpen(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 relative shadow-xl max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setIsContactsModalOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="text-center mb-5">
          <div className="w-12 h-12 mx-auto rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900 flex items-center justify-center mb-2">
            <Headphones className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white">
            Biz bilan bog'lanish
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            24/7 Yagona Qo'llab-quvvatlash va Maslahat Markazi
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
          
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400 mb-0.5">
              <PhoneCall className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold">Call-markaz (24/7)</span>
            </div>
            <a 
              href="tel:+998712000000" 
              className="text-xs font-black text-slate-900 dark:text-white hover:text-sky-600"
            >
              +998 (71) 200-00-00
            </a>
            <p className="text-[10px] text-slate-400">Bepul qo'ng'iroq</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-1.5 text-blue-500 mb-0.5">
              <Send className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold">Telegram Bot</span>
            </div>
            <a 
              href="https://t.me/HamyonUzBot" 
              target="_blank" 
              rel="noreferrer"
              className="text-xs font-black text-slate-900 dark:text-white hover:text-sky-600"
            >
              @HamyonSupport_Bot
            </a>
            <p className="text-[10px] text-slate-400">Onlayn javob</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 mb-0.5">
              <Mail className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold">Elektron pochta</span>
            </div>
            <p className="text-xs font-black text-slate-900 dark:text-white">
              support@hamyon.uz
            </p>
            <p className="text-[10px] text-slate-400">Rasmiy murojaat</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-1.5 text-rose-500 mb-0.5">
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold">Bosh ofis</span>
            </div>
            <p className="text-xs font-black text-slate-900 dark:text-white">
              Toshkent, A.Temur 108
            </p>
            <p className="text-[10px] text-slate-400">09:00 - 18:00</p>
          </div>

        </div>

        {/* Message form */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2.5">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-sky-600" />
            Operatorga to'g'ridan-to'g'ri xabar yozish
          </h3>
          <form onSubmit={handleSendMessage} className="space-y-2.5">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Savolingiz yoki murojaatingizni yozing..."
              rows={3}
              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs outline-none resize-none text-slate-900 dark:text-white"
            />
            <button
              type="submit"
              disabled={sent}
              className="w-full py-2 clean-btn-primary font-bold text-xs flex items-center justify-center gap-2"
            >
              {sent ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Xabar yuborildi!</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Xabarni jo'natish</span>
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactsModal;
