import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  INITIAL_USER,
  INITIAL_HOME_SERVICES,
  INITIAL_CAR_SERVICES,
  INITIAL_FAMILY_SERVICES,
  INITIAL_BUSINESS_SERVICES,
  INITIAL_RECEIPTS
} from '../data/mockData';
import { generateId, getCurrentDateTime } from '../utils/formatters';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Dark Mode
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('hamyon_dark_mode');
    return saved ? JSON.parse(saved) : false;
  });

  // User
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('hamyon_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem('hamyon_auth');
    return saved ? JSON.parse(saved) : true;
  });

  // Services
  const [homeServices, setHomeServices] = useState(() => {
    const saved = localStorage.getItem('hamyon_home_services');
    const parsed = saved ? JSON.parse(saved) : INITIAL_HOME_SERVICES;
    if (!parsed.uylar || parsed.uylar.length === 0) {
      parsed.uylar = INITIAL_HOME_SERVICES.uylar;
      parsed.activeHomeId = "home-1";
    }
    return parsed;
  });

  const [carServices, setCarServices] = useState(() => {
    const saved = localStorage.getItem('hamyon_car_services');
    const parsed = saved ? JSON.parse(saved) : INITIAL_CAR_SERVICES;
    if (!parsed.garaj || parsed.garaj.length === 0) {
      parsed.garaj = [
        {
          id: "car-1",
          ...(parsed.avtomobil || INITIAL_CAR_SERVICES.avtomobil),
          pravaRaqam: "AF 1234567",
          texPasport: "AAF 9981240",
          yoqilgi: "Benzin AI-95",
          otKuchi: "132 ot kuchi"
        }
      ];
      parsed.activeCarId = "car-1";
    }
    if (!parsed.avtomobil) {
      parsed.avtomobil = parsed.garaj[0];
    }
    return parsed;
  });

  const [familyServices, setFamilyServices] = useState(() => {
    const saved = localStorage.getItem('hamyon_family_services');
    return saved ? JSON.parse(saved) : INITIAL_FAMILY_SERVICES;
  });

  const [businessServices, setBusinessServices] = useState(() => {
    const saved = localStorage.getItem('hamyon_business_services');
    return saved ? JSON.parse(saved) : INITIAL_BUSINESS_SERVICES;
  });

  const [receipts, setReceipts] = useState(() => {
    const saved = localStorage.getItem('hamyon_receipts');
    return saved ? JSON.parse(saved) : INITIAL_RECEIPTS;
  });

  // Navigation & Modals
  const [activePage, setActivePage] = useState('dashboard');
  const [paymentModalData, setPaymentModalData] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isContactsModalOpen, setIsContactsModalOpen] = useState(false);
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);
  const [isAddHomeModalOpen, setIsAddHomeModalOpen] = useState(false);
  const [alertNotification, setAlertNotification] = useState(null);

  // Apply dark class to both <html> and <body> and set colorScheme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
    localStorage.setItem('hamyon_dark_mode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('hamyon_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('hamyon_auth', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('hamyon_home_services', JSON.stringify(homeServices));
  }, [homeServices]);

  useEffect(() => {
    localStorage.setItem('hamyon_car_services', JSON.stringify(carServices));
  }, [carServices]);

  useEffect(() => {
    localStorage.setItem('hamyon_family_services', JSON.stringify(familyServices));
  }, [familyServices]);

  useEffect(() => {
    localStorage.setItem('hamyon_business_services', JSON.stringify(businessServices));
  }, [businessServices]);

  useEffect(() => {
    localStorage.setItem('hamyon_receipts', JSON.stringify(receipts));
  }, [receipts]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const showNotification = (message, type = 'success') => {
    setAlertNotification({ message, type });
    setTimeout(() => {
      setAlertNotification(null);
    }, 4000);
  };

  // Auth Functions
  const login = (identifier, pin) => {
    const cleanId = (identifier || '').replace(/\s+/g, '');
    const cleanUserPhone = (user.telefon || '').replace(/\s+/g, '');
    
    if (
      cleanId === cleanUserPhone || 
      cleanId === (user.jshshir || '') || 
      cleanId === "admin" || 
      cleanId === "demo" ||
      pin === user.pinCode
    ) {
      setIsAuthenticated(true);
      setIsAuthModalOpen(false);
      showNotification(`Xush kelibsiz, ${user.ism}! Tizimga muvaffaqiyatli kirdingiz.`);
      return { success: true };
    } else {
      return { success: false, error: "Telefon/JSHSHIR yoki maxfiy PIN kod noto'g'ri kiritildi." };
    }
  };

  const register = (newUserData) => {
    const updated = {
      ...INITIAL_USER,
      ...newUserData,
      balans: newUserData.balans || 5000000
    };
    setUser(updated);
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    showNotification(`Tabriklaymiz, ${updated.ism}! Siz muvaffaqiyatli ro'yxatdan o'tdingiz.`);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAuthModalOpen(true);
    setAuthMode('login');
    showNotification("Tizimdan chiqdingiz.", "info");
  };

  // Foydalanuvchining oylik maoshi orqali balansni qabul qilish (Qayta-qayta qabul qilib bo'lmaydi)
  const receiveMonthlySalary = () => {
    if (user.maoshQabulQilingan) {
      showNotification(`Ushbu oy uchun maosh allaqachon qabul qilingan. Navbatdagi maosh sanasi: ${user.keyingiMaoshSanasi || '2026-11-05'} da bo'ladi.`, "warning");
      return;
    }

    const salaryAmount = user.oylikDaromad || 16500000;
    const nextMonthSalaryDate = `2026-11-${String(user.oylikKuni || 5).padStart(2, '0')}`;
    
    setUser(prev => ({
      ...prev,
      balans: prev.balans + salaryAmount,
      maoshQabulQilingan: true,
      oxirgiMaoshSanasi: getCurrentDateTime().split(' ')[0],
      keyingiMaoshSanasi: nextMonthSalaryDate
    }));

    const salaryReceipt = {
      id: generateId("SAL"),
      sanaVaqt: getCurrentDateTime(),
      xizmatNomi: `Oylik maosh tushumi (${user.ishlashJoyi || 'Kompaniya'})`,
      toifa: "Oylik Maosh",
      summa: salaryAmount,
      tolovchi: user.ishlashJoyi || "Ish beruvchi tashkilot",
      tolovchiKarta: "Yagona G'aznachilik / Korporativ hisob",
      qabulQiluvchi: `${user.ism} ${user.familiya} (${user.lavozimi})`,
      qabulQiluvchiHisob: user.kartaRaqam,
      holati: "To'langan (Hisobga tushdi)",
      fiskalBelgi: "SALARY-" + Math.floor(10000000 + Math.random() * 90000000),
      terminal: "CENTRAL-BANK-PAYROLL"
    };

    setReceipts(prev => [salaryReceipt, ...prev]);

    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    showNotification(`Oktabr oyi maoshi (${salaryAmount.toLocaleString()} so'm) qabul qilindi. Navbatdagi maosh: ${nextMonthSalaryDate} da.`);
  };

  // To'lovni amalga oshirish:
  const executePayment = ({ title, category, amount, targetId, recipientName, recipientAccount }) => {
    if (user.balans < amount) {
      showNotification("Hisobingizda mablag' yetarli emas. Iltimos, oylik maoshingizni qabul qiling.", "error");
      return { success: false, error: "Mablag' yetarli emas" };
    }

    setUser(prev => ({
      ...prev,
      balans: prev.balans - amount
    }));

    const newReceipt = {
      id: generateId("TRX"),
      sanaVaqt: getCurrentDateTime(),
      xizmatNomi: title,
      toifa: category,
      summa: amount,
      tolovchi: `${user.ism} ${user.familiya}`,
      tolovchiKarta: user.kartaRaqam,
      qabulQiluvchi: recipientName || "Davlat xizmatlari Yagona Portali",
      qabulQiluvchiHisob: recipientAccount || "20208000994821001",
      holati: "To'langan (Muvaffaqiyatli)",
      fiskalBelgi: Math.floor(100000000000 + Math.random() * 900000000000).toString(),
      terminal: "EPAY-UZ-" + Math.floor(100 + Math.random() * 900)
    };

    setReceipts(prev => [newReceipt, ...prev]);

    // Update service next payment date
    if (category === "Mening uyim") {
      setHomeServices(prev => {
        const updatedKamunal = prev.kamunal.map(item => {
          if (item.id === targetId) {
            return { 
              ...item, 
              balans: item.balans + amount, 
              oxirgiTolanganSana: getCurrentDateTime().split(' ')[0],
              keyingiTolovSanasi: "2026-11-10",
              holati: "To'langan" 
            };
          }
          return item;
        });

        const updatedSoliq = prev.soliqlar.map(item => {
          if (item.id === targetId) {
            const yangiQoldiq = Math.max(0, item.qoldiq - amount);
            return { 
              ...item, 
              tolangan: item.tolangan + amount, 
              qoldiq: yangiQoldiq, 
              holati: "To'langan",
              keyingiTolovSanasi: "2027-04-15"
            };
          }
          return item;
        });

        const updatedBoshqa = prev.boshqa.map(item => {
          if (item.id === targetId) {
            return { 
              ...item, 
              balans: item.balans + amount, 
              qoldiq: 0,
              oxirgiTolanganSana: getCurrentDateTime().split(' ')[0],
              keyingiTolovSanasi: "2026-11-01",
              holati: "To'langan"
            };
          }
          return item;
        });

        return { ...prev, kamunal: updatedKamunal, soliqlar: updatedSoliq, boshqa: updatedBoshqa };
      });
    }

    if (category === "Mening avtomobilim") {
      setCarServices(prev => {
        const updatedJarimalar = prev.jarimalar.map(item => {
          if (item.id === targetId) {
            return { 
              ...item, 
              holati: "To'langan", 
              tolangan: true,
              keyingiTolovSanasi: "To'liq yopildi (Jarima mavjud emas)" 
            };
          }
          return item;
        });

        const updatedXizmatlar = prev.xizmatlar.map(item => {
          if (item.id === targetId) {
            return {
              ...item,
              holati: "To'langan (Amal qilmoqda)",
              tolangan: true,
              keyingiTolovSanasi: "2027-11-20"
            };
          }
          return item;
        });

        return { ...prev, jarimalar: updatedJarimalar, xizmatlar: updatedXizmatlar };
      });
    }

    if (category === "Mening oilam") {
      setFamilyServices(prev => {
        return prev.map(child => {
          if (child.id === targetId) {
            const childReceipt = {
              chekId: newReceipt.id,
              sana: newReceipt.sanaVaqt,
              summa: amount,
              xizmat: title,
              holat: "To'langan"
            };
            return {
              ...child,
              status: "To'langan",
              qarz: 0,
              oxirgiTolanganSana: newReceipt.sanaVaqt.split(' ')[0],
              keyingiTolovSanasi: `2026-11-${String(child.tolovMuddatiKuni).padStart(2, '0')}`,
              cheklar: [childReceipt, ...child.cheklar]
            };
          }
          return child;
        });
      });
    }

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    showNotification(`${title} uchun to'lov muvaffaqiyatli amalga oshirildi. Elektron chek shakllantirildi.`);
    setPaymentModalData(null);
    setSelectedReceipt(newReceipt);
    return { success: true, receipt: newReceipt };
  };

  const withdrawSolarEarnings = () => {
    const available = businessServices.quyoshPaneli.yechibOlinadiganSofQoldiq;
    if (available <= 0) {
      showNotification("Yechib olish uchun quyosh paneli daromadi mavjud emas.", "warning");
      return;
    }

    setUser(prev => ({
      ...prev,
      balans: prev.balans + available
    }));

    setBusinessServices(prev => ({
      ...prev,
      quyoshPaneli: {
        ...prev.quyoshPaneli,
        yechibOlinganDaromad: prev.quyoshPaneli.yechibOlinganDaromad + available,
        yechibOlinadiganSofQoldiq: 0
      }
    }));

    const incomingReceipt = {
      id: generateId("INC"),
      sanaVaqt: getCurrentDateTime(),
      xizmatNomi: "Quyosh panelidan elektr sotuvi tushumi",
      toifa: "Mening bizneslarim",
      summa: available,
      tolovchi: "O'zbekiston Yashil Energiya Yagona Xaridi",
      tolovchiKarta: "Yashil Tarmoq Subsidiyasi",
      qabulQiluvchi: `${user.ism} ${user.familiya}`,
      qabulQiluvchiHisob: user.kartaRaqam,
      holati: "To'langan (Hisobga tushdi)",
      fiskalBelgi: "SOLAR-" + Math.floor(10000000 + Math.random() * 90000000),
      terminal: "SOLAR-GRID-INVERTER"
    };

    setReceipts(prev => [incomingReceipt, ...prev]);

    confetti({ particleCount: 70, spread: 60, origin: { y: 0.5 } });
    showNotification(`${available.toLocaleString()} so'm quyosh paneli daromadi hamyoningizga o'tkazildi.`);
  };

  const updateSolarKwhPrice = (newPrice) => {
    setBusinessServices(prev => {
      const sotilgan = prev.quyoshPaneli.tarmoqqaSotilganKwh;
      const yangiHisoblangan = sotilgan * newPrice;
      return {
        ...prev,
        quyoshPaneli: {
          ...prev.quyoshPaneli,
          narxHarBirKwh: newPrice,
          hisoblanganDaromad: yangiHisoblangan,
          yechibOlinadiganSofQoldiq: yangiHisoblangan - prev.quyoshPaneli.yechibOlinganDaromad
        }
      };
    });
    showNotification(`Quyosh elektr narxi har 1 kVt uchun ${newPrice} so'mga yangilandi.`);
  };

  // 1. Yangi avtomobilni garajga qo'shish
  const addCarToGarage = (newCar) => {
    setCarServices(prev => {
      const existingGaraj = prev.garaj || [];
      const updatedGaraj = [newCar, ...existingGaraj];
      return {
        ...prev,
        garaj: updatedGaraj,
        activeCarId: newCar.id,
        avtomobil: newCar,
        xizmatlar: [...(newCar.xizmatlar || []), ...(prev.xizmatlar || [])],
        jarimalar: [...(newCar.jarimalar || []), ...(prev.jarimalar || [])]
      };
    });
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    showNotification(`${newCar.model} (${newCar.raqam}) garajingizga muvaffaqiyatli qo'shildi!`);
  };

  // Faol avtomobilni almashtirish
  const selectActiveCar = (carId) => {
    setCarServices(prev => {
      const found = prev.garaj?.find(c => c.id === carId);
      if (!found) return prev;
      return {
        ...prev,
        activeCarId: carId,
        avtomobil: found
      };
    });
  };

  // 2. Yangi uy / ko'chmas mulkni qo'shish
  const addHomeProperty = (newHome) => {
    setHomeServices(prev => {
      const existingUylar = prev.uylar || [];
      return {
        ...prev,
        uylar: [newHome, ...existingUylar],
        activeHomeId: newHome.id,
        kamunal: [...(newHome.kamunal || []), ...(prev.kamunal || [])],
        soliqlar: [...(newHome.soliqlar || []), ...(prev.soliqlar || [])],
        boshqa: [...(newHome.boshqa || []), ...(prev.boshqa || [])]
      };
    });
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    showNotification(`${newHome.nomi} mulklar ro'yxatiga muvaffaqiyatli qo'shildi!`);
  };

  // Faol uyni almashtirish
  const selectActiveHome = (homeId) => {
    setHomeServices(prev => ({
      ...prev,
      activeHomeId: homeId
    }));
  };

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        homeServices,
        setHomeServices,
        carServices,
        setCarServices,
        familyServices,
        setFamilyServices,
        businessServices,
        setBusinessServices,
        receipts,
        setReceipts,
        activePage,
        setActivePage,
        paymentModalData,
        setPaymentModalData,
        selectedReceipt,
        setSelectedReceipt,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        isServicesMenuOpen,
        setIsServicesMenuOpen,
        isContactsModalOpen,
        setIsContactsModalOpen,
        isAddCarModalOpen,
        setIsAddCarModalOpen,
        isAddHomeModalOpen,
        setIsAddHomeModalOpen,
        alertNotification,
        showNotification,
        login,
        register,
        logout,
        executePayment,
        withdrawSolarEarnings,
        updateSolarKwhPrice,
        receiveMonthlySalary,
        addCarToGarage,
        selectActiveCar,
        addHomeProperty,
        selectActiveHome
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
