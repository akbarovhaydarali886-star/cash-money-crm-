import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Calendar, 
  Home, 
  Car, 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Phone, 
  Briefcase, 
  CreditCard,
  Delete,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatMoney } from '../utils/formatters';

const AuthGate = () => {
  const { 
    authMode, 
    setAuthMode, 
    login, 
    register, 
    user 
  } = useApp();

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState(user.telefon || '+998 90 123 45 67');
  const [loginPin, setLoginPin] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register form state
  const [regData, setRegData] = useState({
    ism: '',
    familiya: '',
    ishlashJoyi: '',
    lavozimi: '',
    oylikDaromad: 15000000,
    oylikKuni: 5,
    telefon: '+998 ',
    jshshir: '',
    pinCode: ''
  });
  const [regStep, setRegStep] = useState(1);
  const [regError, setRegError] = useState('');

  const handlePinInput = (num, isRegister = false) => {
    if (isRegister) {
      if (regData.pinCode.length < 4) {
        setRegData(prev => ({ ...prev, pinCode: prev.pinCode + num }));
      }
    } else {
      if (loginPin.length < 4) {
        setLoginPin(prev => prev + num);
      }
    }
  };

  const handlePinBackspace = (isRegister = false) => {
    if (isRegister) {
      setRegData(prev => ({ ...prev, pinCode: prev.pinCode.slice(0, -1) }));
    } else {
      setLoginPin(prev => prev.slice(0, -1));
    }
  };

  const handleLoginSubmit = (e) => {
    if (e) e.preventDefault();
    setLoginError('');

    if (!loginIdentifier) {
      setLoginError("Iltimos, telefon raqam yoki JSHSHIRni kiriting.");
      return;
    }

    if (loginPin.length < 4) {
      setLoginError("4 xonali PIN kodni to'liq kiriting.");
      return;
    }

    const res = login(loginIdentifier, loginPin);
    if (!res.success) {
      setLoginError(res.error);
    }
  };

  const handleRegisterSubmit = (e) => {
    if (e) e.preventDefault();
    setRegError('');

    if (!regData.ism.trim() || !regData.familiya.trim()) {
      setRegError("Ism va familiyani to'liq kiriting.");
      setRegStep(1);
      return;
    }
    if (!regData.ishlashJoyi.trim()) {
      setRegError("Ishlash joyi va lavozimingizni kiriting.");
      setRegStep(1);
      return;
    }
    if (!regData.telefon || regData.telefon.length < 9) {
      setRegError("O'zbekiston telefon raqamini kiriting.");
      setRegStep(1);
      return;
    }
    if (!regData.jshshir || regData.jshshir.length < 14) {
      setRegError("14 xonali JSHSHIR raqamini to'liq kiriting.");
      setRegStep(1);
      return;
    }
    if (regData.pinCode.length < 4) {
      setRegError("Xavfsizlik uchun 4 xonali raqamli PIN kod tanlang.");
      return;
    }

    register({
      ...regData,
      oylikDaromad: Number(regData.oylikDaromad),
      oylikKuni: Number(regData.oylikKuni)
    });
  };

  const quickDemoFill = () => {
    setLoginIdentifier(user.telefon || '+998 90 123 45 67');
    setLoginPin('1234');
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col justify-center animate-in fade-in duration-300">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Brand Hero and Value Props */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span>Markaziy Bank va Davlat Xizmatlariga Mos Tizim</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Barcha moliyangiz va xizmatlaringiz — <span className="text-sky-600 dark:text-sky-400">bitta hamyonda</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Platformadan foydalanish, maosh jadvalini ko'rish va to'lovlarni amalga oshirish uchun avval ro'yxatdan o'ting yoki tizimga kiring. Ma'lumotlaringiz to'liq maxfiy va himoyalangan holda saqlanadi.
            </p>
          </div>

          {/* 4 Core Value Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Oylik maosh jadvali</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  1–10 kunlar oralig'ida maosh tushishi va keyingi oylikkacha qolgan kunlar nazorati.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center flex-shrink-0">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Mening uyim (Kadastr)</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Kadastr raqami orqali gaz, suv, elektr hisoblagichlarini avtomatik topish.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center flex-shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Mening avtomobilim</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Marka va prava orqali sug'urta, texosmotr va DYXX jarimalarini aniqlash.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">4 xonali xavfsiz PIN</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Click va Payme uslubidagi raqamli PIN-kod va QR-kodli elektron fiskal cheklar.
                </p>
              </div>
            </div>

          </div>

          {/* Quick Notice */}
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Ro'yxatdan o'tgach, barcha shaxsiy ma'lumotlar profilingizda to'liq ochiladi.</span>
          </div>

        </div>

        {/* Right Column: Uiverse.io Card Embedded Directly */}
        <div className="lg:col-span-5 flex justify-center">
          
          <div className="uiverse-container shadow-2xl">
            
            {/* Header */}
            <div className="uiverse-heading">
              {authMode === 'login' ? 'Tizimga Kirish' : "Ro'yxatdan O'tish"}
            </div>

            {/* Tab switch */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl mt-3 mb-2 max-w-[260px] mx-auto">
              <button
                type="button"
                onClick={() => { setAuthMode('login'); setLoginError(''); }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  authMode === 'login'
                    ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                Kirish
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode('register'); setRegError(''); }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  authMode === 'register'
                    ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                Ro'yxatdan o'tish
              </button>
            </div>

            {/* 1. LOGIN FORM */}
            {authMode === 'login' && (
              <form onSubmit={handleLoginSubmit} className="uiverse-form">
                
                {loginError && (
                  <div className="mb-2 p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-medium text-center">
                    {loginError}
                  </div>
                )}

                <div>
                  <input
                    required
                    className="uiverse-input"
                    type="text"
                    placeholder="Telefon raqam yoki JSHSHIR"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                  />
                </div>

                {/* PIN Code Interactive Display */}
                <div className="mt-3 text-center">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1.5">
                    4 xonali PIN kodni kiriting:
                  </span>
                  <div className="flex justify-center gap-2.5 my-2">
                    {[0, 1, 2, 3].map((idx) => (
                      <div
                        key={idx}
                        className={`w-3.5 h-3.5 rounded-full transition-all ${
                          loginPin.length > idx
                            ? 'bg-sky-500 scale-125'
                            : 'bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* 1-9 Numeric Keypad */}
                <div className="grid grid-cols-3 gap-1.5 max-w-[210px] mx-auto my-2.5">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => handlePinInput(num.toString(), false)}
                      className="h-9 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950 font-bold text-xs text-slate-800 dark:text-slate-200 transition-colors border border-slate-200/80 dark:border-slate-700"
                    >
                      {num}
                    </button>
                  ))}
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={quickDemoFill}
                      title="Demo ma'lumotlarni to'ldirish"
                      className="text-[10px] font-bold text-sky-600 dark:text-sky-400 hover:underline"
                    >
                      Demo
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => handlePinInput('0', false)}
                    className="h-9 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950 font-bold text-xs text-slate-800 dark:text-slate-200 transition-colors border border-slate-200/80 dark:border-slate-700"
                  >
                    0
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePinBackspace(false)}
                    className="h-9 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950 text-slate-600 dark:text-slate-400 flex items-center justify-center transition-colors border border-slate-200/80 dark:border-slate-700"
                  >
                    <Delete className="w-4 h-4" />
                  </button>
                </div>

                <span className="uiverse-forgot-password">
                  <a href="#reset" onClick={(e) => { e.preventDefault(); setLoginPin('1234'); }}>
                    PIN kodni unutdingizmi? (Tiklash: 1234)
                  </a>
                </span>

                <input className="uiverse-login-button cursor-pointer" type="submit" value="Tizimga Kirish" />

                {/* Social Login Buttons */}
                <div className="uiverse-social-container">
                  <span className="title">Yoki demo hisob orqali:</span>
                  <div className="uiverse-social-accounts">
                    <button type="button" onClick={quickDemoFill} title="Google bilan kirish" className="uiverse-social-button">
                      <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 488 512">
                        <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                      </svg>
                    </button>
                    <button type="button" onClick={quickDemoFill} title="Apple ID bilan kirish" className="uiverse-social-button">
                      <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
                      </svg>
                    </button>
                    <button type="button" onClick={quickDemoFill} title="X (Twitter) bilan kirish" className="uiverse-social-button">
                      <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <span className="uiverse-agreement">
                  <a href="#terms" onClick={(e) => e.preventDefault()}>Maxfiylik kelishuvi va foydalanish shartlari</a>
                </span>
              </form>
            )}

            {/* 2. REGISTER FORM */}
            {authMode === 'register' && (
              <div className="uiverse-form">
                
                {regError && (
                  <div className="mb-2 p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-medium text-center">
                    {regError}
                  </div>
                )}

                {regStep === 1 ? (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Ism"
                        value={regData.ism}
                        onChange={(e) => setRegData({ ...regData, ism: e.target.value })}
                        className="uiverse-input mt-0"
                      />
                      <input
                        type="text"
                        placeholder="Familiya"
                        value={regData.familiya}
                        onChange={(e) => setRegData({ ...regData, familiya: e.target.value })}
                        className="uiverse-input mt-0"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Ishlash joyi (Tashkilot)"
                      value={regData.ishlashJoyi}
                      onChange={(e) => setRegData({ ...regData, ishlashJoyi: e.target.value })}
                      className="uiverse-input mt-0"
                    />

                    <input
                      type="text"
                      placeholder="Lavozimi"
                      value={regData.lavozimi}
                      onChange={(e) => setRegData({ ...regData, lavozimi: e.target.value })}
                      className="uiverse-input mt-0"
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="Oylik maosh"
                        value={regData.oylikDaromad}
                        onChange={(e) => setRegData({ ...regData, oylikDaromad: e.target.value })}
                        className="uiverse-input mt-0"
                      />
                      <select
                        value={regData.oylikKuni}
                        onChange={(e) => setRegData({ ...regData, oylikKuni: Number(e.target.value) })}
                        className="uiverse-input mt-0 text-slate-700 dark:text-slate-200"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(day => (
                          <option key={day} value={day} className="dark:bg-slate-900">
                            {day}-sana
                          </option>
                        ))}
                      </select>
                    </div>

                    <input
                      type="text"
                      placeholder="Telefon: +998..."
                      value={regData.telefon}
                      onChange={(e) => setRegData({ ...regData, telefon: e.target.value })}
                      className="uiverse-input mt-0"
                    />

                    <input
                      type="text"
                      placeholder="14 xonali JSHSHIR / ID"
                      value={regData.jshshir}
                      maxLength={14}
                      onChange={(e) => setRegData({ ...regData, jshshir: e.target.value })}
                      className="uiverse-input mt-0"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        if (!regData.ism || !regData.ishlashJoyi || !regData.jshshir) {
                          setRegError("Iltimos, maydonlarni to'liq to'ldiring.");
                          return;
                        }
                        setRegStep(2);
                      }}
                      className="uiverse-login-button cursor-pointer"
                    >
                      Keyingisi: PIN-kod o'rnatish
                    </button>
                  </div>
                ) : (
                  /* Step 2: 4-digit PIN setup */
                  <div className="space-y-3 text-center">
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">
                        4 xonali raqamli PIN-kod o'rnating
                      </span>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Har safar to'lovlarni tasdiqlash uchun ishlatiladi (Click/Payme kabi)
                      </p>
                    </div>

                    <div className="flex justify-center gap-3 my-2">
                      {[0, 1, 2, 3].map((idx) => (
                        <div
                          key={idx}
                          className={`w-3.5 h-3.5 rounded-full transition-all ${
                            regData.pinCode.length > idx
                              ? 'bg-sky-500 scale-125'
                              : 'bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Numeric Keypad */}
                    <div className="grid grid-cols-3 gap-1.5 max-w-[210px] mx-auto my-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <button
                          type="button"
                          key={num}
                          onClick={() => handlePinInput(num.toString(), true)}
                          className="h-9 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950 font-bold text-xs text-slate-800 dark:text-slate-200 transition-colors border border-slate-200/80 dark:border-slate-700"
                        >
                          {num}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setRegStep(1)}
                        className="text-[10px] font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white"
                      >
                        Ortga
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePinInput('0', true)}
                        className="h-9 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950 font-bold text-xs text-slate-800 dark:text-slate-200 transition-colors border border-slate-200/80 dark:border-slate-700"
                      >
                        0
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePinBackspace(true)}
                        className="h-9 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950 text-slate-600 dark:text-slate-400 flex items-center justify-center transition-colors border border-slate-200/80 dark:border-slate-700"
                      >
                        <Delete className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleRegisterSubmit}
                      disabled={regData.pinCode.length < 4}
                      className="uiverse-login-button cursor-pointer disabled:opacity-50"
                    >
                      Ro'yxatdan o'tish va Hamyonni ochish
                    </button>
                  </div>
                )}

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default AuthGate;
