import React, { useState } from 'react';
import { 
  PhoneCall, 
  Send, 
  Mail, 
  MapPin, 
  HelpCircle, 
  CheckCircle, 
  MessageSquare
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const ContactsPage = () => {
  const { showNotification } = useApp();
  const [formData, setFormData] = useState({ ism: '', telefon: '', mavzu: '', xabar: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.ism || !formData.xabar) {
      showNotification("Ismingiz va murojaat matnini kiriting!", "warning");
      return;
    }
    setSubmitted(true);
    showNotification("Murojaatingiz qabul qilindi! Operatorlarimiz tez orada bog'lanishadi.");
    setTimeout(() => {
      setFormData({ ism: '', telefon: '', mavzu: '', xabar: '' });
      setSubmitted(false);
    }, 2000);
  };

  const faqs = [
    {
      q: "Oylik tushish muddati qanday belgilanadi?",
      a: "Oylik maosh har oyning 1-kunidan 10-kunigacha bo'lgan davrda bank va korxona o'rtasidagi shartnomaga muvofiq avtomatik hamyonga tushadi. Ro'yxatdan o'tganingizda JSHSHIR orqali bu ma'lumotlar tasdiqlanadi."
    },
    {
      q: "Quyosh paneli daromadini qanday yechib olish mumkin?",
      a: "'Mening bizneslarim' sahifasida tarmoqqa sotilgan har 1 kVt uchun belgilangan narx bo'yicha to'plangan summani 'Hamyonga yechib olish' tugmasi orqali bir zumda asosiy hisobingizga o'tkazishingiz mumkin."
    },
    {
      q: "To'lov chekini soliq yoki maktab idorasiga taqdim etsa bo'ladimi?",
      a: "Ha, Hamyon ilovasi orqali shakllantirilgan har bir chek yuridik kuchga ega va Davlat Soliq Qo'mitasining Yagona Fiskal bazasi orqali tasdiqlangan maxsus QR-kodga ega."
    },
    {
      q: "Jarimalarni 50% chegirma bilan to'lash muddati qancha?",
      a: "Qaror chiqarilgan kundan boshlab 15 kalendar kuni ichida 50% chegirma amal qiladi. Ilovamizda bu muddat aniq ko'rsatiladi."
    }
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="clean-card p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
              Mijozlar xizmati
            </span>
            <span className="text-xs text-slate-400">
              24/7 uzluksiz texnik yordam
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1.5 flex items-center gap-2">
            <PhoneCall className="w-6 h-6 text-emerald-600" />
            Kontaktlar va Qo'llab-quvvatlash
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Yordam kerakmi? Biz bilan istalgan qulay usulda bog'laning yoki xabar qoldiring.
          </p>
        </div>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        <div className="clean-card p-4 space-y-1.5">
          <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 flex items-center justify-center">
            <PhoneCall className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-slate-900 dark:text-white">
            Call-markaz (24/7)
          </h3>
          <a href="tel:+998712000000" className="text-sm font-black text-sky-600 dark:text-sky-400 hover:underline block">
            +998 (71) 200-00-00
          </a>
          <p className="text-[10px] text-slate-400">Barcha tarmoqlardan bepul</p>
        </div>

        <div className="clean-card p-4 space-y-1.5">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
            <Send className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-slate-900 dark:text-white">
            Telegram Yordam Boti
          </h3>
          <a href="https://t.me/HamyonSupport_Bot" target="_blank" rel="noreferrer" className="text-sm font-black text-blue-600 dark:text-blue-400 hover:underline block">
            @HamyonSupport_Bot
          </a>
          <p className="text-[10px] text-slate-400">Onlayn tezkor operator</p>
        </div>

        <div className="clean-card p-4 space-y-1.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-slate-900 dark:text-white">
            Elektron Pochta
          </h3>
          <p className="text-xs font-black text-emerald-600 dark:text-emerald-400">
            support@hamyon.uz
          </p>
          <p className="text-[10px] text-slate-400">Rasmiy murojaatlar uchun</p>
        </div>

        <div className="clean-card p-4 space-y-1.5">
          <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-slate-900 dark:text-white">
            Bosh Vakolatxona
          </h3>
          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Toshkent, Amir Temur 108
          </p>
          <p className="text-[10px] text-slate-400">09:00 - 18:00</p>
        </div>

      </div>

      {/* Form and FAQ Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Support Message Form */}
        <div className="clean-card p-5 space-y-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-sky-600" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              To'g'ridan-to'g'ri murojaat yuborish
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                F.I.O yoki Ismingiz
              </label>
              <input
                type="text"
                value={formData.ism}
                onChange={(e) => setFormData({ ...formData, ism: e.target.value })}
                placeholder="Sardor Karimov"
                className="w-full px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Telefon
                </label>
                <input
                  type="text"
                  value={formData.telefon}
                  onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
                  placeholder="+998 90 123 45 67"
                  className="w-full px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Mavzu
                </label>
                <input
                  type="text"
                  value={formData.mavzu}
                  onChange={(e) => setFormData({ ...formData, mavzu: e.target.value })}
                  placeholder="To'lov / Quyosh paneli"
                  className="w-full px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Xabar matni
              </label>
              <textarea
                value={formData.xabar}
                onChange={(e) => setFormData({ ...formData, xabar: e.target.value })}
                rows={3}
                placeholder="Savolingizni yozing..."
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full py-2.5 clean-btn-primary font-bold text-xs flex items-center justify-center gap-2"
            >
              {submitted ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Murojaat yuborildi!</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Xabarni yuborish</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* FAQs */}
        <div className="clean-card p-5 space-y-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Ko'p beriladigan savollar (FAQ)
            </h3>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-start gap-1.5">
                  <span className="text-sky-600 font-bold">Q:</span>
                  <span>{faq.q}</span>
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 pl-3 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default ContactsPage;
