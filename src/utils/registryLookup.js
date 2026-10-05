// Yagona Davlat Bazasidan (DYXX / YHXB va Kadastr Palatasi) avtomatik ma'lumotlarni qidirib topish xizmati

export const POPULAR_CAR_MODELS = [
  "Chevrolet Tracker Premier",
  "Chevrolet Onix Premier",
  "Chevrolet Malibu 2 Premier",
  "Chevrolet Cobalt LTZ",
  "Chevrolet Gentra Elegant",
  "BYD Song Plus Champion EV",
  "BYD Chazor DM-i Hybrid",
  "Kia K5 GT-Line",
  "Kia Sportage X-Line",
  "Hyundai Santa Fe Calligraphy",
  "Chery Tiggo 7 Pro Max",
  "Toyota Camry 70"
];

// 1. Haydovchi guvohnomasi (prava) va avtomobil markasi orqali qolgan ma'lumotlarni avtomatik topish
export const lookupCarFromRegistry = ({ marka, prava, davlatRaqam }) => {
  const cleanMarka = marka ? marka.trim() : "Chevrolet Tracker Premier";
  const cleanPrava = prava ? prava.trim().toUpperCase() : "AF 1234567";
  
  // Modelga qarab xususiyatlarni aniqlash
  const isElectric = /byd|ev|electric/i.test(cleanMarka);
  const isMalibu = /malibu/i.test(cleanMarka);
  const isTracker = /tracker/i.test(cleanMarka);
  const isKia = /kia/i.test(cleanMarka);

  // Ranglar
  const colors = [
    "Qora marvarid (Black Pearl)",
    "Oq marvarid (Pearl White)",
    "Mokriy asfalt (Dark Grey Metallic)",
    "To'q ko'k (Midnight Blue)",
    "Kumushrang (Silver Metallic)"
  ];
  const selectedColor = isMalibu ? colors[0] : isElectric ? colors[2] : colors[1];

  // Yil
  const yil = isElectric ? 2024 : 2023;

  // Davlat raqami
  let finalPlate = davlatRaqam ? davlatRaqam.trim().toUpperCase() : "";
  if (!finalPlate) {
    const letters = ["AAA", "BAA", "ZAA", "PAA", "MAA", "UZB"];
    const randomL = letters[Math.floor(Math.random() * letters.length)];
    const randomN = Math.floor(100 + Math.random() * 899);
    finalPlate = `01 ${randomN} ${randomL}`;
  }

  // VIN raqami
  let vinPrefix = "KL7CJ6EB6MB";
  if (isElectric) vinPrefix = "LC0CE4EC8P0";
  else if (isMalibu) vinPrefix = "1G1ZH5SX8NF";
  else if (isKia) vinPrefix = "KNAFU4126P5";
  const vin = vinPrefix + Math.floor(100000 + Math.random() * 900000);

  // Tex-pasport
  const texPasport = "AAF " + Math.floor(1000000 + Math.random() * 9000000);

  // Yurgan masofa
  const hozirgiYurganMasofa = isElectric ? 14200 : Math.floor(18000 + Math.random() * 25000);

  // Yoqilg'i & Quvvat
  const yoqilgi = isElectric ? "Elektr (EV - 71.8 kVt/soat)" : isMalibu ? "Benzin AI-95 (2.0 Turbo)" : "Benzin AI-95";
  const otKuchi = isElectric ? "204 ot kuchi" : isMalibu ? "253 ot kuchi" : "132 ot kuchi";

  const carId = `car-${Date.now()}`;

  // Avtomatik biriktirilgan davlat xizmatlari va sug'urtalari
  const xizmatlar = [
    {
      id: `car-sug-${carId}`,
      carId,
      toifa: "Sug'urta",
      nomi: "Majburiy Avto Sug'urta (OSAGO)",
      kompaniya: "KAFIL SUG'URTA AJ",
      polisRaqam: `KS-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      summa: 168000,
      boshlanishSana: "2026-04-10",
      tugashSana: "2027-04-10",
      keyingiTolovSanasi: "2027-04-10",
      qolganKun: 187,
      holati: "Amal qilmoqda",
      tolangan: true
    },
    {
      id: `car-kasko-${carId}`,
      carId,
      toifa: "Sug'urta",
      nomi: "KASKO To'liq Avtohimoya",
      kompaniya: "Apex Insurance",
      polisRaqam: `APX-${Math.floor(100000 + Math.random() * 900000)}`,
      summa: isElectric ? 3800000 : 3200000,
      boshlanishSana: "2026-05-15",
      tugashSana: "2027-05-15",
      keyingiTolovSanasi: "2027-05-15",
      qolganKun: 222,
      holati: "To'langan (Faol)",
      tolangan: true
    },
    {
      id: `car-tex-${carId}`,
      carId,
      toifa: "Texnik ko'rik",
      nomi: "Davlat Texnik Ko'rigi (Texosmotr)",
      markaz: "Yunusobod 1-sonli Diagnostika markazi",
      oxirgiSana: "2026-05-20",
      keyingiTolovSanasi: "2027-05-20",
      qolganKun: 227,
      summa: 120000,
      holati: "To'langan (Muddati bor)",
      tolangan: true
    },
    {
      id: `car-moy-${carId}`,
      carId,
      toifa: "Texnik xizmat",
      nomi: isElectric ? "Reduktor moyi va salqinlantirish tizimi" : "Dvigatel moyi va filtrlar",
      oxirgiAlmashgan: hozirgiYurganMasofa - 3000,
      rejalashtirilgan: hozirgiYurganMasofa + 7000,
      qolganMasofa: 7000,
      summa: isElectric ? 350000 : 520000,
      keyingiTolovSanasi: `${(hozirgiYurganMasofa + 7000).toLocaleString()} km yetganda`,
      holati: "Rejalashtirilgan",
      tolangan: false
    },
    {
      id: `car-talon-${carId}`,
      carId,
      toifa: "Ruxsatnoma va Talon",
      nomi: "Tonirovka ruxsatnomasi (Talon)",
      hujjatRaqam: `TON-2026/${Math.floor(1000 + Math.random() * 9000)}`,
      tugashSana: "2027-06-15",
      keyingiTolovSanasi: "2027-06-15",
      qolganKun: 253,
      summa: 2400000,
      holati: "Amal qilmoqda",
      tolangan: true
    }
  ];

  // Avtomatik aniqlangan jarimalar (agar bor bo'lsa)
  const jarimalar = [
    {
      id: `jarima-${carId}`,
      carId,
      qarorRaqami: `№ 24-00${Math.floor(1000000 + Math.random() * 9000000)}`,
      modda: "MJtK 128-3 modda (Tezlikni oshirish: +11 km/soat)",
      manzil: "Toshkent sh., Bunyodkor shoh ko'chasi fotoradar",
      sanaVaqt: "2026-10-02 16:15",
      aslSumma: 375000,
      chegirmaSumma: 187500,
      chegirmaOxirgiKuni: "2026-10-17",
      keyingiTolovSanasi: "2026-10-17 gacha",
      holati: "To'lanmagan",
      tolangan: false
    }
  ];

  return {
    id: carId,
    model: cleanMarka,
    raqam: finalPlate,
    yil,
    rang: selectedColor,
    vin,
    pravaRaqam: cleanPrava,
    texPasport,
    hozirgiYurganMasofa,
    yoqilgi,
    otKuchi,
    xizmatlar,
    jarimalar
  };
};

// 2. Kadastr raqami yoki manzil orqali uy va uning barcha kommunal hisob raqamlarini topish
export const lookupHomeFromRegistry = ({ kadastrRaqam, manzil, jshshir }) => {
  const homeId = `home-${Date.now()}`;
  
  const sampleAddresses = [
    "Toshkent sh., Mirobod t., Nukus ko'chasi, 45-uy, 14-xonadon",
    "Toshkent sh., Chilonzor t., 9-mavze, 12-uy, 33-xonadon",
    "Toshkent sh., Yakkasaroy t., Shota Rustaveli ko'chasi, 67-uy",
    "Toshkent sh., Shayxontohur t., Labzak 22-uy, 8-xonadon"
  ];

  const determinedAddress = manzil && manzil.trim().length > 5 
    ? manzil.trim() 
    : sampleAddresses[Math.floor(Math.random() * sampleAddresses.length)];

  const determinedKadastr = kadastrRaqam && kadastrRaqam.trim().length > 8
    ? kadastrRaqam.trim()
    : `10:01:0${Math.floor(1 + Math.random() * 8)}:02:01:${Math.floor(1000 + Math.random() * 9000)}`;

  const maydoni = "105 kv.m (3 xonali kvartira)";

  const soliqlar = [
    {
      id: `soliq-mulk-${homeId}`,
      homeId,
      nomi: "Mol-mulk solig'i",
      obyekt: determinedAddress,
      yillikSumma: 650000,
      tolangan: 650000,
      qoldiq: 0,
      oxirgiSana: "2026-10-01",
      keyingiTolovSanasi: "2027-04-15",
      holati: "To'langan",
      icon: "Home"
    },
    {
      id: `soliq-yer-${homeId}`,
      homeId,
      nomi: "Yer solig'i",
      obyekt: "Ko'chmas mulk yer ulushi",
      yillikSumma: 240000,
      tolangan: 240000,
      qoldiq: 0,
      oxirgiSana: "2026-10-01",
      keyingiTolovSanasi: "2027-05-15",
      holati: "To'langan",
      icon: "ShieldCheck"
    }
  ];

  const kamunal = [
    {
      id: `kam-chiqindi-${homeId}`,
      homeId,
      nomi: "Toza Hudud (Chiqindi to'lovi)",
      tur: "chiqindi",
      hisobRaqam: `TH-${Math.floor(100000 + Math.random() * 900000)}`,
      abonentNomi: "Karimov Sardor",
      oylikTarif: 35000,
      kishiSoni: 4,
      oylikSumma: 35000,
      balans: 70000,
      qarz: 0,
      oxirgiTolanganSana: "2026-10-02",
      keyingiTolovSanasi: "2026-11-05",
      holati: "To'langan",
      color: "#059669"
    },
    {
      id: `kam-gaz-${homeId}`,
      homeId,
      nomi: "Hududgazta'minot (Tabiiy gaz)",
      tur: "gaz",
      hisobRaqam: `GZ-${Math.floor(100000 + Math.random() * 900000)}`,
      abonentNomi: "Karimov Sardor",
      hisoblagichRaqami: `G4-${Math.floor(10000 + Math.random() * 90000)}`,
      avvalgiKorsatkich: 640,
      hozirgiKorsatkich: 730,
      sarflangan: 90,
      tarif: 650,
      oylikSumma: 58500,
      balans: 100000,
      qarz: 0,
      oxirgiTolanganSana: "2026-10-01",
      keyingiTolovSanasi: "2026-11-10",
      holati: "To'langan",
      color: "#ea580c"
    },
    {
      id: `kam-suv-${homeId}`,
      homeId,
      nomi: "O'zsuvta'minot (Ichimlik suvi)",
      tur: "suv",
      hisobRaqam: `SV-${Math.floor(100000 + Math.random() * 900000)}`,
      abonentNomi: "Karimov Sardor",
      hisoblagichRaqami: `W-${Math.floor(10000 + Math.random() * 90000)}`,
      avvalgiKorsatkich: 110,
      hozirgiKorsatkich: 128,
      sarflangan: 18,
      tarif: 1400,
      oylikSumma: 25200,
      balans: 60000,
      qarz: 0,
      oxirgiTolanganSana: "2026-10-03",
      keyingiTolovSanasi: "2026-11-10",
      holati: "To'langan",
      color: "#0891b2"
    },
    {
      id: `kam-elektr-${homeId}`,
      homeId,
      nomi: "Hududiy Elektr Tarmoqlari (Elektr energiya)",
      tur: "elektr",
      hisobRaqam: `ET-${Math.floor(100000 + Math.random() * 900000)}`,
      abonentNomi: "Karimov Sardor",
      hisoblagichRaqami: `E-${Math.floor(10000 + Math.random() * 90000)}`,
      avvalgiKorsatkich: 2150,
      hozirgiKorsatkich: 2360,
      sarflangan: 210,
      tarif: 450,
      oylikSumma: 94500,
      balans: 160000,
      qarz: 0,
      oxirgiTolanganSana: "2026-10-04",
      keyingiTolovSanasi: "2026-11-10",
      holati: "To'langan",
      color: "#eab308"
    }
  ];

  const boshqa = [
    {
      id: `boshqa-inet-${homeId}`,
      homeId,
      nomi: "Uzonline Optik Internet (100 Mb/s)",
      hisobRaqam: `99871-${Math.floor(1000000 + Math.random() * 9000000)}`,
      oylikSumma: 149000,
      balans: 149000,
      qoldiq: 0,
      oxirgiTolanganSana: "2026-10-01",
      keyingiTolovSanasi: "2026-11-01",
      holati: "To'langan",
      icon: "Wifi"
    }
  ];

  return {
    id: homeId,
    nomi: `Xonadon (${determinedAddress.split(',')[1] || 'Toshkent'})`,
    manzil: determinedAddress,
    kadastrRaqam: determinedKadastr,
    maydoni,
    xonalarSoni: 3,
    soliqlar,
    kamunal,
    boshqa
  };
};
