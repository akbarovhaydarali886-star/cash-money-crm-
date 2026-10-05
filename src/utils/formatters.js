export const formatMoney = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return "0 so'm";
  return new Intl.NumberFormat("uz-UZ").format(amount) + " so'm";
};

export const formatNumber = (num) => {
  if (num === undefined || num === null || isNaN(num)) return "0";
  return new Intl.NumberFormat("uz-UZ").format(num);
};

export const generateId = (prefix = "TRX") => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${timestamp}${random}`;
};

export const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const getDaysRemaining = (targetDateString) => {
  if (!targetDateString) return 0;
  const target = new Date(targetDateString);
  const now = new Date();
  const diffTime = target - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Har oyning 1-10 kunlari oylik tushishi statusi
export const getSalaryStatus = (salaryDay = 5) => {
  const now = new Date();
  const currentDay = now.getDate();
  
  // Agar bugun oylik kuni bo'lsa
  if (currentDay === salaryDay) {
    return {
      status: "Bugun tushadi!",
      daysLeft: 0,
      isSalaryDay: true,
      periodText: "1-10 sanalar oralig'ida (Bugun)"
    };
  }
  
  if (currentDay < salaryDay) {
    return {
      status: `${salaryDay - currentDay} kun qoldi`,
      daysLeft: salaryDay - currentDay,
      isSalaryDay: false,
      periodText: `Har oyning ${salaryDay}-sanasida tushadi`
    };
  }

  // Agar bu oyning oylik kuni o'tgan bo'lsa, keyingi oyning salaryDay kunigacha
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, salaryDay);
  const diffTime = nextMonth - now;
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    status: `${daysLeft} kun qoldi (Keyingi oy)`,
    daysLeft,
    isSalaryDay: false,
    periodText: `Oktabr maoshi qabul qilindi. Navbatdagi: ${salaryDay}-sana`
  };
};
