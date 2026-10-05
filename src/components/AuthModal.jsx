import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Phone, 
  Briefcase, 
  CreditCard, 
  Calendar, 
  KeyRound, 
  Delete,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const AuthModal = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authMode, 
    setAuthMode, 
    login, 
    register, 
    user 
  } = useApp();

  // Login state
  const [loginIdentifier, setLoginIdentifier] = useState(user.telefon || '');
  const [loginPin, setLoginPin] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register state
  const [regData, setRegData] = useState({
    ism: '',
    familiya: '',
    ishlashJoyi: '',
    lavozimi: '',
    oylikDaromad: 14500000,
    oylikKuni: 5,
    telefon: '+998 ',
    jshshir: '',
    pinCode: ''
  });
  const [regStep, setRegStep] = useState(1);
  const [regError, setRegError] = useState('');

  if (!isAuthModalOpen) return null;

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

    if (!regData.ism || !regData.familiya) {
      setRegError("Ism va familiyani to'liq kiriting.");
      return;
    }
    if (!regData.ishlashJoyi) {
      setRegError("Ishlash joyi va lavozimingizni kiriting.");
      return;
    }
    if (!regData.telefon || regData.telefon.length < 9) {
      setRegError("O'zbekiston telefon raqamini kiriting.");
      return;
    }
    if (!regData.jshshir || regData.jshshir.length < 14) {
      setRegError("14 xonali JSHSHIR raqamini kiriting.");
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
    setLoginIdentifier(user.telefon);
    setLoginPin(user.pinCode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Uiverse.io Container Card */}
      <div className="uiverse-container max-h-[95vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Tab switch */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl mb-4 max-w-[240px] mx-auto">
          <button
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

        {/* Heading */}
        <div className="uiverse-heading">
          {authMode === 'login' ? 'Kirish' : 'Ro\'yxatdan o\'tish'}
        </div>

        {/* LOGIN FORM */}
        {authMode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="uiverse-form">
            
            {loginError && (
              <div className="mb-2 p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-medium text-center">
                {loginError}
              </div>
            )}

            <input 
              required
              className="uiverse-input" 
              type="text" 
              name="identifier" 
              value={loginIdentifier}
              onChange={(e) => setLoginIdentifier(e.target.value)}
              placeholder="Telefon raqam yoki JSHSHIR" 
            />

            {/* PIN Code Visual Dots */}
            <div className="mt-3 text-center">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-2">
                4 xonali PIN kod (Click / Payme)
              </span>
              <div className="flex justify-center gap-2.5 mb-3">
                {[0, 1, 2, 3].map((idx) => (
                  <div
                    key={idx}
                    className={`w-3.5 h-3.5 rounded-full transition-all ${
                      loginPin.length > idx
                        ? 'bg-sky-600 scale-125'
                        : 'bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600'
                    }`}
                  />
                ))}
              </div>

              {/* NumPad */}
              <div className="grid grid-cols-3 gap-1.5 max-w-[210px] mx-auto">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    type="button"
                    key={num}
                    onClick={() => handlePinInput(num.toString(), false)}
                    className="h-9 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-800 dark:text-slate-100 hover:bg-slate-50 active:scale-95 transition-all"
                  >
                    {num}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={quickDemoFill}
                  className="h-9 rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-[10px] font-bold text-sky-600 dark:text-sky-400"
                >
                  Demo
                </button>
                <button
                  type="button"
                  onClick={() => handlePinInput("0", false)}
                  className="h-9 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-800 dark:text-slate-100 hover:bg-slate-50 active:scale-95 transition-all"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={() => handlePinBackspace(false)}
                  className="h-9 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-rose-500 flex items-center justify-center active:scale-95 transition-all"
                >
                  <Delete className="w-4 h-4" />
                </button>
              </div>
            </div>

            <span className="block text-right mt-2 text-[11px]">
              <a 
                href="#demo" 
                onClick={(e) => { e.preventDefault(); quickDemoFill(); }} 
                className="text-sky-600 dark:text-sky-400 hover:underline font-semibold"
              >
                Demo hisobni kiritish (PIN: 1234)
              </a>
            </span>

            {/* Login Submit Button */}
            <input className="uiverse-login-button" type="submit" value="Tizimga Kirish" />

            {/* Social Accounts Section (Uiverse.io) */}
            <div className="uiverse-social-container">
              <span className="title">Yoki boshqa xizmatlar orqali:</span>
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
              <a href="#licence" onClick={(e) => e.preventDefault()}>Foydalanish shartlari va Maxfiylik kelishuvi</a>
            </span>
          </form>
        )}

        {/* REGISTER FORM */}
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
                  className="uiverse-login-button"
                >
                  Keyingisi: PIN-kod o'rnatish
                </button>
              </div>
            ) : (
              <div className="text-center space-y-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  4 xonali maxfiy PIN kod tanlang:
                </span>

                <div className="flex justify-center gap-2.5 my-2">
                  {[0, 1, 2, 3].map((idx) => (
                    <div
                      key={idx}
                      className={`w-3.5 h-3.5 rounded-full transition-all ${
                        regData.pinCode.length > idx
                          ? 'bg-sky-600 scale-125'
                          : 'bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600'
                      }`}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-1.5 max-w-[210px] mx-auto">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => handlePinInput(num.toString(), true)}
                      className="h-9 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-800 dark:text-slate-100 hover:bg-slate-50 active:scale-95 transition-all"
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setRegStep(1)}
                    className="h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500"
                  >
                    Orqaga
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePinInput("0", true)}
                    className="h-9 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-800 dark:text-slate-100 hover:bg-slate-50 active:scale-95 transition-all"
                  >
                    0
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePinBackspace(true)}
                    className="h-9 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-rose-500 flex items-center justify-center active:scale-95 transition-all"
                  >
                    <Delete className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleRegisterSubmit}
                  className="uiverse-login-button"
                >
                  Ro'yxatdan o'tishni yakunlash
                </button>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
};

export default AuthModal;
