export const delegations = [
  {
    id: "d1",
    nationality: "مصري",
    delegationHead: "عقيد / احمد فوزي",
    membersCount: "10",
    delegationStatus: "all_departed",
    arrivalInfo: {
      arrivalDate: "2025-09-21",
      arrivalTime: "1430",
      arrivalHall: "مطار 1",
      arrivalAirline: "مصر للطيران",
      arrivalFlightNumber: "101",
      arrivalDestination: "القاهرة",
      arrivalReceptor: "ملازم / محمود عادل",
      arrivalShipments: "لا يوجد"
    },
    departureInfo: {
      totalMembers: 10,
      departedMembers: 10,
      departureSessions: [
        {
          id: "dep1",
          date: "2025-09-25",
          time: "16:45",
          hall: "مطار 1",
          airline: "مصر للطيران",
          flightNumber: "MS102",
          destination: "القاهرة",
          receptor: "ملازم / سامي حسن",
          shipments: "معدات عسكرية",
          members: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          notes: "مغادرة كاملة للوفد"
        }
      ]
    }
  },
  {
    id: "d2",
    nationality: "سعودي",
    delegationHead: "رائد / فهد العتيبي",
    membersCount: "8",
    delegationStatus: "partial_departed",
    arrivalInfo: {
      arrivalDate: "2025-09-22",
      arrivalTime: "1645",
      arrivalHall: "مطار 2",
      arrivalAirline: "الخطوط السعودية",
      arrivalFlightNumber: "220",
      arrivalDestination: "الرياض",
      arrivalReceptor: "ملازم اول / احمد منصور",
      arrivalShipments: "معدات"
    },
    departureInfo: {
      totalMembers: 8,
      departedMembers: 5,
      departureSessions: [
        {
          id: "dep2_1",
          date: "2025-09-26",
          time: "18:30",
          hall: "مطار 2",
          airline: "الخطوط السعودية",
          flightNumber: "SV221",
          destination: "الرياض",
          receptor: "ملازم / خالد المطيري",
          shipments: "معدات طبية",
          members: [1, 2, 3, 4, 5],
          notes: "مغادرة أولى - 5 أعضاء"
        }
      ]
    }
  },
  {
    id: "d3",
    nationality: "ألماني",
    delegationHead: "مقدم / هانز مولر",
    membersCount: "12",
    delegationStatus: "not_departed",
    arrivalInfo: {
      arrivalDate: "2025-09-23",
      arrivalTime: "0915",
      arrivalHall: "مطار 3",
      arrivalAirline: "لوفتهانزا",
      arrivalFlightNumber: "330",
      arrivalDestination: "برلين",
      arrivalReceptor: "ملازم / سامي حسن",
      arrivalShipments: "لا يوجد"
    },
    departureInfo: {
      totalMembers: 12,
      departedMembers: 0,
      departureSessions: []
    }
  },
  {
    id: "d4",
    nationality: "تركي",
    delegationHead: "عقيد / علي يلدريم",
    membersCount: "15",
    delegationStatus: "all_departed",
    arrivalInfo: {
      arrivalDate: "2025-09-24",
      arrivalTime: "1120",
      arrivalHall: "مطار 1",
      arrivalAirline: "الخطوط التركية",
      arrivalFlightNumber: "404",
      arrivalDestination: "أنقرة",
      arrivalReceptor: "ملازم / كريم صبري",
      arrivalShipments: "وثائق"
    },
    departureInfo: {
      totalMembers: 15,
      departedMembers: 15,
      departureSessions: [
        {
          id: "dep4_1",
          date: "2025-09-28",
          time: "11:20",
          hall: "مطار 1",
          airline: "الخطوط التركية",
          flightNumber: "TK405",
          destination: "أنقرة",
          receptor: "ملازم / أحمد التركي",
          shipments: "وثائق رسمية",
          members: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
          notes: "مغادرة كاملة للوفد التركي"
        }
      ]
    }
  },
  {
    id: "d5",
    nationality: "امريكي",
    delegationHead: "رائد / جون سميث",
    membersCount: "9",
    delegationStatus: "partial_departed",
    arrivalInfo: {
      arrivalDate: "2025-09-25",
      arrivalTime: "1915",
      arrivalHall: "مطار 2",
      arrivalAirline: "دلتا",
      arrivalFlightNumber: "505",
      arrivalDestination: "واشنطن",
      arrivalReceptor: "ملازم اول / يوسف احمد",
      arrivalShipments: "معدات تقنية"
    },
    departureInfo: {
      totalMembers: 9,
      departedMembers: 6,
      departureSessions: [
        {
          id: "dep5_1",
          date: "2025-09-29",
          time: "19:15",
          hall: "مطار 2",
          airline: "دلتا",
          flightNumber: "DL506",
          destination: "واشنطن",
          receptor: "ملازم / مايكل جونسون",
          shipments: "معدات تقنية متقدمة",
          members: [1, 2, 3, 4, 5, 6],
          notes: "مغادرة أولى - 6 أعضاء"
        }
      ]
    }
  },
  {
    id: "d6",
    nationality: "هندي",
    delegationHead: "مقدم / راجيف كومار",
    membersCount: "11",
    delegationStatus: "not_departed",
    arrivalInfo: {
      arrivalDate: "2025-09-26",
      arrivalTime: "1200",
      arrivalHall: "مطار 3",
      arrivalAirline: "اير انديا",
      arrivalFlightNumber: "606",
      arrivalDestination: "نيودلهي",
      arrivalReceptor: "ملازم / احمد ياسر",
      arrivalShipments: "لا يوجد"
    },
    departureInfo: {
      totalMembers: 11,
      departedMembers: 0,
      departureSessions: []
    }
  },
  {
    id: "d7",
    nationality: "صيني",
    delegationHead: "رائد / لي وانغ",
    membersCount: "13",
    delegationStatus: "all_departed",
    arrivalInfo: {
      arrivalDate: "2025-09-27",
      arrivalTime: "0845",
      arrivalHall: "مطار 1",
      arrivalAirline: "اير تشاينا",
      arrivalFlightNumber: "707",
      arrivalDestination: "بكين",
      arrivalReceptor: "ملازم اول / محمد حسن",
      arrivalShipments: "معدات عسكرية"
    },
    departureInfo: {
      totalMembers: 13,
      departedMembers: 13,
      departureSessions: [
        {
          id: "dep7_1",
          date: "2025-10-01",
          time: "08:45",
          hall: "مطار 1",
          airline: "اير تشاينا",
          flightNumber: "CA708",
          destination: "بكين",
          receptor: "ملازم / تشنغ وي",
          shipments: "معدات عسكرية متطورة",
          members: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          notes: "مغادرة كاملة للوفد الصيني"
        }
      ]
    }
  },
  {
    id: "d8",
    nationality: "فرنسي",
    delegationHead: "عقيد / بيير دوبوا",
    membersCount: "7",
    delegationStatus: "partial_departed",
    arrivalInfo: {
      arrivalDate: "2025-09-28",
      arrivalTime: "1330",
      arrivalHall: "مطار 2",
      arrivalAirline: "اير فرانس",
      arrivalFlightNumber: "808",
      arrivalDestination: "باريس",
      arrivalReceptor: "ملازم / احمد طارق",
      arrivalShipments: "لا يوجد"
    },
    departureInfo: {
      totalMembers: 7,
      departedMembers: 4,
      departureSessions: [
        {
          id: "dep8_1",
          date: "2025-10-02",
          time: "13:30",
          hall: "مطار 2",
          airline: "اير فرانس",
          flightNumber: "AF809",
          destination: "باريس",
          receptor: "ملازم / جان كلود",
          shipments: "وثائق دبلوماسية",
          members: [1, 2, 3, 4],
          notes: "مغادرة جزئية - 3 أعضاء متبقيون للمتابعة"
        }
      ]
    }
  },
  {
    id: "d9",
    nationality: "افريقي",
    delegationHead: "مقدم / جورج اوكافور",
    membersCount: "14",
    delegationStatus: "not_departed",
    arrivalInfo: {
      arrivalDate: "2025-09-29",
      arrivalTime: "0720",
      arrivalHall: "مطار 3",
      arrivalAirline: "ايجيبت اير",
      arrivalFlightNumber: "909",
      arrivalDestination: "لاجوس",
      arrivalReceptor: "ملازم / سامح محمود",
      arrivalShipments: "معدات"
    },
    departureInfo: {
      totalMembers: 14,
      departedMembers: 0,
      departureSessions: []
    }
  },
  {
    id: "d10",
    nationality: "قطري",
    delegationHead: "رائد / خالد الهاجري",
    membersCount: "10",
    delegationStatus: "all_departed",
    arrivalInfo: {
      arrivalDate: "2025-09-30",
      arrivalTime: "1700",
      arrivalHall: "مطار 1",
      arrivalAirline: "اير كايرو",
      arrivalFlightNumber: "110",
      arrivalDestination: "الدوحة",
      arrivalReceptor: "ملازم اول / محمد العجمي",
      arrivalShipments: "لا يوجد"
    },
    departureInfo: {
      totalMembers: 10,
      departedMembers: 10,
      departureSessions: [
        {
          id: "dep10_1",
          date: "2025-10-03",
          time: "17:00",
          hall: "مطار 1",
          airline: "اير كايرو",
          flightNumber: "QR111",
          destination: "الدوحة",
          receptor: "ملازم / عبدالله القطري",
          shipments: "لا يوجد",
          members: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          notes: "مغادرة كاملة للوفد القطري"
        }
      ]
    }
  },
];



export const members = [
  {
    id: "mem1",
    rank: "عقيد",
    name: "احمد عبدالمنعم",
    role: "رئيس الوفد",
    memberStatus: "departed",
    nationality: "مصري",
    arrivalDate: "2025-09-21",
    departureDate: "2025-09-25",
    delegation: {
      id: "d1",
      nationality: "مصري",
      delegationHead: "عقيد / احمد فوزي"
    }
  },
  {
    id: "mem2",
    rank: "مقدم",
    name: "سعيد العبدالله",
    role: "مسافر",
    memberStatus: "not_departed",
    nationality: "مصري",
    arrivalDate: "2025-09-21",
    departureDate: null,
    delegation: {
      id: "d1",
      nationality: "مصري",
      delegationHead: "عقيد / احمد فوزي"
    }
  },
  {
    id: "mem3",
    rank: "نقيب",
    name: "محمود خالد",
    role: "مسافر",
    memberStatus: "departed",
    nationality: "مصري",
    arrivalDate: "2025-09-21",
    departureDate: "2025-09-25",
    delegation: {
      id: "d1",
      nationality: "مصري",
      delegationHead: "عقيد / احمد فوزي"
    }
  },
  {
    id: "mem4",
    rank: "رائد",
    name: "عمر الفقي",
    role: "مسافر",
    memberStatus: "departed",
    nationality: "سعودي",
    arrivalDate: "2025-09-22",
    departureDate: "2025-09-26",
    delegation: {
      id: "d2",
      nationality: "سعودي",
      delegationHead: "رائد / فهد العتيبي"
    }
  },
  {
    id: "mem5",
    rank: "ملازم",
    name: "يوسف عادل",
    role: "مسافر",
    memberStatus: "not_departed",
    nationality: "سعودي",
    arrivalDate: "2025-09-22",
    departureDate: null,
    delegation: {
      id: "d2",
      nationality: "سعودي",
      delegationHead: "رائد / فهد العتيبي"
    }
  },
  {
    id: "mem6",
    rank: "ملازم اول",
    name: "احمد ربيع",
    role: "مسافر",
    memberStatus: "departed",
    nationality: "سعودي",
    arrivalDate: "2025-09-22",
    departureDate: "2025-09-26",
    delegation: {
      id: "d2",
      nationality: "سعودي",
      delegationHead: "رائد / فهد العتيبي"
    }
  },
  {
    id: "mem7",
    rank: "مقدم",
    name: "علي محمود",
    role: "مسافر",
    memberStatus: "departed",
    nationality: "ألماني",
    arrivalDate: "2025-09-23",
    departureDate: "2025-09-27",
    delegation: {
      id: "d3",
      nationality: "ألماني",
      delegationHead: "رائد / هانز مولر"
    }
  },
  {
    id: "mem8",
    rank: "نقيب",
    name: "خالد منصور",
    role: "مسافر",
    memberStatus: "not_departed",
    nationality: "ألماني",
    arrivalDate: "2025-09-23",
    departureDate: null,
    delegation: {
      id: "d3",
      nationality: "ألماني",
      delegationHead: "رائد / هانز مولر"
    }
  },
  {
    id: "mem9",
    rank: "رائد",
    name: "محمد عاطف",
    role: "مسافر",
    memberStatus: "departed",
    nationality: "تركي",
    arrivalDate: "2025-09-24",
    departureDate: "2025-09-28",
    delegation: {
      id: "d4",
      nationality: "تركي",
      delegationHead: "عقيد / أحمد يلماز"
    }
  },
  {
    id: "mem10",
    rank: "ملازم",
    name: "حسن فؤاد",
    role: "مسافر",
    memberStatus: "not_departed",
    nationality: "تركي",
    arrivalDate: "2025-09-24",
    departureDate: null,
    delegation: {
      id: "d4",
      nationality: "تركي",
      delegationHead: "عقيد / أحمد يلماز"
    }
  },
  {
    id: "mem11",
    rank: "عقيد",
    name: "جون سميث",
    role: "رئيس الوفد",
    memberStatus: "departed",
    nationality: "أمريكي",
    arrivalDate: "2025-09-25",
    departureDate: "2025-09-29",
    delegation: {
      id: "d5",
      nationality: "أمريكي",
      delegationHead: "عقيد / جون سميث"
    }
  },
  {
    id: "mem12",
    rank: "مقدم",
    name: "مايكل جونسون",
    role: "مسافر",
    memberStatus: "not_departed",
    nationality: "أمريكي",
    arrivalDate: "2025-09-25",
    departureDate: null,
    delegation: {
      id: "d5",
      nationality: "أمريكي",
      delegationHead: "عقيد / جون سميث"
    }
  },
  {
    id: "mem13",
    rank: "رائد",
    name: "ديفيد ويلسون",
    role: "مسافر",
    memberStatus: "departed",
    nationality: "أمريكي",
    arrivalDate: "2025-09-25",
    departureDate: "2025-09-29",
    delegation: {
      id: "d5",
      nationality: "أمريكي",
      delegationHead: "عقيد / جون سميث"
    }
  },
  {
    id: "mem14",
    rank: "نقيب",
    name: "لي تشينغ",
    role: "رئيس الوفد",
    memberStatus: "departed",
    nationality: "صيني",
    arrivalDate: "2025-09-26",
    departureDate: "2025-09-30",
    delegation: {
      id: "d7",
      nationality: "صيني",
      delegationHead: "عقيد / لي تشينغ"
    }
  },
  {
    id: "mem15",
    rank: "ملازم",
    name: "وانغ وي",
    role: "مسافر",
    memberStatus: "not_departed",
    nationality: "صيني",
    arrivalDate: "2025-09-26",
    departureDate: null,
    delegation: {
      id: "d7",
      nationality: "صيني",
      delegationHead: "عقيد / لي تشينغ"
    }
  },
  {
    id: "mem16",
    rank: "عقيد",
    name: "بيير دوبوا",
    role: "رئيس الوفد",
    memberStatus: "departed",
    nationality: "فرنسي",
    arrivalDate: "2025-09-27",
    departureDate: "2025-10-01",
    delegation: {
      id: "d8",
      nationality: "فرنسي",
      delegationHead: "عقيد / بيير دوبوا"
    }
  },
  {
    id: "mem17",
    rank: "مقدم",
    name: "جان مارتن",
    role: "مسافر",
    memberStatus: "not_departed",
    nationality: "فرنسي",
    arrivalDate: "2025-09-27",
    departureDate: null,
    delegation: {
      id: "d8",
      nationality: "فرنسي",
      delegationHead: "عقيد / بيير دوبوا"
    }
  },
]
