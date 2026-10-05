// Boshlang'ich ma'lumotlar bazasi (Toza, tartibli, stikerlarsiz, faqat rasmiy ma'lumotlar)

export const INITIAL_USER = {
  ism: "Sardor",
  familiya: "Karimov",
  ishlashJoyi: "O'zbekiston Milliy Banki",
  lavozimi: "Bosh mutaxassis",
  oylikDaromad: 16500000,
  oylikKuni: 5, // Har oyning 1-10 kunlari oralig'ida (5-sanada tushadi)
  telefon: "+998 90 123 45 67",
  jshshir: "31204951234567",
  idKarta: "AA 1234567",
  pinCode: "1234",
  balans: 9850000,
  kartaRaqam: "8600 •••• •••• 4589",
  kartaMuddati: "08/28",
  maoshQabulQilingan: false,
  oxirgiMaoshSanasi: "2026-09-05",
  keyingiMaoshSanasi: "2026-10-05"
};

export const INITIAL_HOME_SERVICES = {
  activeHomeId: "home-1",
  uylar: [
    {
      id: "home-1",
      nomi: "Asosiy hovli xonadoni",
      manzil: "Toshkent sh., Yunusobod t., 14-mavze, 22-uy",
      kadastrRaqam: "10:01:05:02:01:0045",
      maydoni: "180 kv.m (4 sotix hovli)",
      xonalarSoni: 5
    }
  ],
  soliqlar: [
    {
      id: "soliq-1",
      nomi: "Mol-mulk solig'i",
      obyekt: "Toshkent sh., Yunusobod t., 14-mavze, 22-uy",
      yillikSumma: 720000,
      tolangan: 720000,
      qoldiq: 0,
      oxirgiSana: "2026-10-01",
      keyingiTolovSanasi: "2027-04-15",
      holati: "To'langan",
      icon: "Home"
    },
    {
      id: "soliq-2",
      nomi: "Yer solig'i",
      obyekt: "Hovli yer maydoni (0.04 ga)",
      yillikSumma: 480000,
      tolangan: 480000,
      qoldiq: 0,
      oxirgiSana: "2026-10-01",
      keyingiTolovSanasi: "2027-05-15",
      holati: "To'langan",
      icon: "ShieldCheck"
    }
  ],
  kamunal: [
    {
      id: "kam-chiqindi",
      nomi: "Toza Hudud (Chiqindi to'lovi)",
      tur: "chiqindi",
      hisobRaqam: "TH-994821",
      abonentNomi: "Karimov Sardor",
      oylikTarif: 35000,
      kishiSoni: 6,
      oylikSumma: 35000,
      balans: 70000,
      qarz: 0,
      oxirgiTolanganSana: "2026-10-02",
      keyingiTolovSanasi: "2026-11-05",
      holati: "To'langan",
      color: "#059669"
    },
    {
      id: "kam-gaz",
      nomi: "Hududgazta'minot (Tabiiy gaz)",
      tur: "gaz",
      hisobRaqam: "GZ-550214",
      abonentNomi: "Karimov Sardor",
      hisoblagichRaqami: "G4-098231",
      avvalgiKorsatkich: 1420,
      hozirgiKorsatkich: 1595,
      sarflangan: 175, // m3
      tarif: 650, // so'm / m3
      oylikSumma: 113750,
      balans: 150000,
      qarz: 0,
      oxirgiTolanganSana: "2026-10-01",
      keyingiTolovSanasi: "2026-11-10",
      holati: "To'langan",
      color: "#ea580c"
    },
    {
      id: "kam-suv",
      nomi: "O'zsuvta'minot (Ichimlik suvi)",
      tur: "suv",
      hisobRaqam: "SV-330198",
      abonentNomi: "Karimov Sardor",
      hisoblagichRaqami: "W-77412",
      avvalgiKorsatkich: 310,
      hozirgiKorsatkich: 334,
      sarflangan: 24, // m3
      tarif: 1400, // so'm / m3
      oylikSumma: 33600,
      balans: 85000,
      qarz: 0,
      oxirgiTolanganSana: "2026-10-03",
      keyingiTolovSanasi: "2026-11-10",
      holati: "To'langan",
      color: "#0891b2"
    },
    {
      id: "kam-elektr",
      nomi: "Hududiy Elektr Tarmoqlari (Elektr energiya)",
      tur: "elektr",
      hisobRaqam: "ET-110943",
      abonentNomi: "Karimov Sardor",
      hisoblagichRaqami: "E-55102",
      avvalgiKorsatkich: 5120,
      hozirgiKorsatkich: 5410,
      sarflangan: 290, // kVt
      tarif: 450, // so'm / kVt
      oylikSumma: 130500,
      balans: 220000,
      qarz: 0,
      oxirgiTolanganSana: "2026-10-04",
      keyingiTolovSanasi: "2026-11-10",
      holati: "To'langan",
      color: "#ca8a04"
    }
  ],
  boshqa: [
    {
      id: "boshqa-domkom",
      nomi: "Uy boshqaruvi (Shirkat / Domkom)",
      hisobRaqam: "DK-0042",
      oylikSumma: 85000,
      balans: 85000,
      qoldiq: 0,
      oxirgiTolanganSana: "2026-10-01",
      keyingiTolovSanasi: "2026-11-10",
      holati: "To'langan",
      icon: "Building"
    },
    {
      id: "boshqa-internet",
      nomi: "Uy Optik Interneti (Uzonline GPON 100 Mbps)",
      hisobRaqam: "99871-2244889",
      oylikSumma: 149000,
      balans: 149000,
      qoldiq: 0,
      oxirgiTolanganSana: "2026-10-01",
      keyingiTolovSanasi: "2026-11-01",
      holati: "To'langan",
      icon: "Wifi"
    },
    {
      id: "boshqa-domofon",
      nomi: "Smart Domofon xizmati",
      hisobRaqam: "DMF-9912",
      oylikSumma: 20000,
      balans: 40000,
      qoldiq: 0,
      oxirgiTolanganSana: "2026-10-02",
      keyingiTolovSanasi: "2026-11-01",
      holati: "To'langan",
      icon: "Video"
    }
  ]
};

export const INITIAL_CAR_SERVICES = {
  activeCarId: "car-1",
  avtomobil: {
    id: "car-1",
    model: "Chevrolet Tracker Premier",
    raqam: "01 A 777 BA",
    yil: 2024,
    rang: "Oq marvarid (Pearl White)",
    vin: "KL7CJ6EB6MB128941",
    pravaRaqam: "AF 1234567",
    texPasport: "AAF 9981240",
    hozirgiYurganMasofa: 28450,
    yoqilgi: "Benzin AI-95",
    otKuchi: "132 ot kuchi"
  },
  garaj: [
    {
      id: "car-1",
      model: "Chevrolet Tracker Premier",
      raqam: "01 A 777 BA",
      yil: 2024,
      rang: "Oq marvarid (Pearl White)",
      vin: "KL7CJ6EB6MB128941",
      pravaRaqam: "AF 1234567",
      texPasport: "AAF 9981240",
      hozirgiYurganMasofa: 28450,
      yoqilgi: "Benzin AI-95",
      otKuchi: "132 ot kuchi"
    }
  ],
  xizmatlar: [
    {
      id: "car-sugurta",
      toifa: "Sug'urta",
      nomi: "Majburiy Avto Sug'urta (OSAGO)",
      kompaniya: "KAFIL SUG'URTA AJ",
      polisRaqam: "KS-2025-998241",
      summa: 168000,
      boshlanishSana: "2025-11-20",
      tugashSana: "2026-11-20",
      keyingiTolovSanasi: "2026-11-20",
      qolganKun: 46,
      holati: "Amal qilmoqda",
      tolangan: true
    },
    {
      id: "car-kasko",
      toifa: "Sug'urta",
      nomi: "KASKO To'liq Avtohimoya",
      kompaniya: "Apex Insurance",
      polisRaqam: "APX-884102",
      summa: 3200000,
      boshlanishSana: "2026-03-15",
      tugashSana: "2027-03-15",
      keyingiTolovSanasi: "2027-03-15",
      qolganKun: 161,
      holati: "To'langan (Faol)",
      tolangan: true
    },
    {
      id: "car-texosmotr",
      toifa: "Texnik ko'rik",
      nomi: "Davlat Texnik Ko'rigi (Texosmotr)",
      markaz: "Yunusobod 1-sonli Diagnostika markazi",
      oxirgiSana: "2025-12-10",
      keyingiTolovSanasi: "2026-12-10",
      qolganKun: 66,
      summa: 120000,
      holati: "To'langan (Muddati bor)",
      tolangan: true
    },
    {
      id: "car-moy",
      toifa: "Texnik xizmat",
      nomi: "Dvigatel moyi va filtrlar",
      oxirgiAlmashgan: 22000,
      rejalashtirilgan: 30000,
      qolganMasofa: 1550, // km
      summa: 480000,
      keyingiTolovSanasi: "30 000 km yetganda",
      holati: "Rejalashtirilgan",
      tolangan: false
    },
    {
      id: "car-talon",
      toifa: "Ruxsatnoma va Talon",
      nomi: "Tonirovka ruxsatnomasi",
      hujjatRaqam: "TON-2025/1198",
      tugashSana: "2026-11-05",
      keyingiTolovSanasi: "2026-11-05",
      qolganKun: 31,
      summa: 2400000,
      holati: "Amal qilmoqda",
      tolangan: true
    }
  ],
  jarimalar: [
    {
      id: "jarima-1",
      qarorRaqami: "№ 24-0091823901",
      modda: "MJtK 128-3 modda (Tezlikni oshirish: +14 km/soat)",
      manzil: "Toshkent sh., A.Temur shox ko'chasi, fotoradar 14-b",
      sanaVaqt: "2026-09-29 14:22",
      aslSumma: 375000,
      chegirmaSumma: 187500,
      chegirmaOxirgiKuni: "2026-10-14",
      keyingiTolovSanasi: "2026-10-14 gacha",
      holati: "To'lanmagan",
      tolangan: false
    }
  ]
};

export const INITIAL_FAMILY_SERVICES = [
  {
    id: "fam-1",
    ism: "Jasur Karimov",
    yosh: 15,
    daraja: "9-sinf o'quvchisi",
    muassasa: "'Smart Oxford Academy' Xususiy maktabi",
    xizmatTuri: "Maktab oylik ta'lim shartnomasi",
    oylikSumma: 3200000,
    tolovMuddatiKuni: 5,
    status: "To'langan",
    oxirgiTolanganSana: "2026-10-02",
    keyingiTolovSanasi: "2026-11-05",
    qarz: 0,
    cheklar: [
      {
        chekId: "CHK-MAK-1002",
        sana: "2026-10-02 11:15",
        summa: 3200000,
        xizmat: "Maktab oylik shartnomasi (Oktabr)",
        holat: "To'langan"
      }
    ]
  },
  {
    id: "fam-2",
    ism: "Madina Karimova",
    yosh: 6,
    daraja: "Katta guruh tarbiyalanuvchisi",
    muassasa: "'Erkatoy Kids' Xususiy bolalar bog'chasi",
    xizmatTuri: "Bog'cha to'lovi va 4 mahal ovqatlanish",
    oylikSumma: 1800000,
    tolovMuddatiKuni: 10,
    status: "To'langan",
    oxirgiTolanganSana: "2026-10-02",
    keyingiTolovSanasi: "2026-11-10",
    qarz: 0,
    cheklar: [
      {
        chekId: "CHK-BOG-1002",
        sana: "2026-10-02 09:40",
        summa: 1800000,
        xizmat: "Bog'cha to'lovi (Oktabr)",
        holat: "To'langan"
      }
    ]
  },
  {
    id: "fam-3",
    ism: "Amirxon Karimov",
    yosh: 11,
    daraja: "5-sinf o'quvchisi",
    muassasa: "'Astrum IT Academy' & 'Cambridge Learning'",
    xizmatTuri: "Dasturlash (Kids IT) + Ingliz tili kursi",
    oylikSumma: 1250000,
    tolovMuddatiKuni: 7,
    status: "To'langan",
    oxirgiTolanganSana: "2026-10-03",
    keyingiTolovSanasi: "2026-11-07",
    qarz: 0,
    cheklar: [
      {
        chekId: "CHK-TOG-1003",
        sana: "2026-10-03 16:30",
        summa: 1250000,
        xizmat: "IT Dasturlash & Ingliz tili kursi (Oktabr)",
        holat: "To'langan"
      }
    ]
  },
  {
    id: "fam-4",
    ism: "Nilufar Karimova",
    yosh: 8,
    daraja: "2-sinf o'quvchisi",
    muassasa: "'Ziyo San'at' Musiqa & Gimnastika markazi",
    xizmatTuri: "Fortepiano musiqasi & Badiiy gimnastika",
    oylikSumma: 750000,
    tolovMuddatiKuni: 8,
    status: "To'langan",
    oxirgiTolanganSana: "2026-10-04",
    keyingiTolovSanasi: "2026-11-08",
    qarz: 0,
    cheklar: [
      {
        chekId: "CHK-MUS-1004",
        sana: "2026-10-04 17:10",
        summa: 750000,
        xizmat: "Fortepiano & Gimnastika (Oktabr)",
        holat: "To'langan"
      }
    ]
  }
];

export const INITIAL_BUSINESS_SERVICES = {
  quyoshPaneli: {
    nomi: "Uy Quyosh Fotoelektr Stansiyasi (Yashil Energiya)",
    quvvatKw: 12,
    orqaliKelganBugunKwh: 48.6,
    oylikIshlabChiqarilganKwh: 1350,
    uyIstemoliKwh: 420,
    tarmoqqaSotilganKwh: 930,
    narxHarBirKwh: 1000, // Foydalanuvchi sozlay oladigan har 1 kVt narxi
    hisoblanganDaromad: 930000,
    yechibOlinganDaromad: 0,
    yechibOlinadiganSofQoldiq: 930000,
    stansiyaHolati: "Onlayn (99.2% samaradorlik)",
    invertor: "Huawei SUN2000 Smart Inverter",
    keyingiHisobSanasi: "2026-11-01"
  },
  qoshimchaBiznes: [
    {
      id: "biz-ijara",
      nomi: "Yunusobod tijorat binosi (Do'kon ijarasi)",
      daromadSumma: 5500000,
      tushumSanasi: "Har oyning 1-kunida",
      oxirgiTushum: "2026-10-01",
      keyingiTushumSanasi: "2026-11-01",
      holati: "Muntazam tushmoqda"
    }
  ]
};

export const INITIAL_RECEIPTS = [
  {
    id: "TRX-99812401",
    sanaVaqt: "2026-10-02 09:40:12",
    xizmatNomi: "Erkatoy Kids - Bog'cha to'lovi (Madina)",
    toifa: "Mening oilam",
    summa: 1800000,
    tolovchi: "Sardor Karimov",
    tolovchiKarta: "8600 •••• •••• 4589",
    qabulQiluvchi: "OOO ERKATOY KIDS MCHJ",
    qabulQiluvchiHisob: "20208000400192847001",
    holati: "Muvaffaqiyatli",
    fiskalBelgi: "847192801948",
    terminal: "TERMINAL-UZ-4412"
  },
  {
    id: "TRX-99808945",
    sanaVaqt: "2026-09-30 18:22:45",
    xizmatNomi: "Hududiy Elektr Tarmoqlari to'lovi",
    toifa: "Mening uyim",
    summa: 150000,
    tolovchi: "Sardor Karimov",
    tolovchiKarta: "8600 •••• •••• 4589",
    qabulQiluvchi: "HET AJ Yunusobod TETK",
    qabulQiluvchiHisob: "23402000800100918001",
    holati: "Muvaffaqiyatli",
    fiskalBelgi: "918237190284",
    terminal: "TERMINAL-PAY-008"
  },
  {
    id: "TRX-99794102",
    sanaVaqt: "2026-09-28 12:05:30",
    xizmatNomi: "Toza Hudud chiqindi xizmati",
    toifa: "Mening uyim",
    summa: 35000,
    tolovchi: "Sardor Karimov",
    tolovchiKarta: "8600 •••• •••• 4589",
    qabulQiluvchi: "Toza Hudud DUK",
    qabulQiluvchiHisob: "20208000100928374001",
    holati: "Muvaffaqiyatli",
    fiskalBelgi: "339182049182",
    terminal: "TERMINAL-PAY-003"
  }
];
