// تهيئة البيانات الافتراضية في localStorage
export const initializeDefaultData = () => {
    // مسح البيانات القديمة أولاً
    localStorage.removeItem('delegations')
    localStorage.removeItem('members')
    
    // مسح البيانات القديمة من الأحداث أيضاً
    const existingEvents = localStorage.getItem('mainEvents')
    if (existingEvents) {
        try {
            const events = JSON.parse(existingEvents)
            // تحديث إحصائيات الأحداث الفرعية لتكون صفر
            events.forEach(event => {
                if (event.sub_events) {
                    event.sub_events.forEach(subEvent => {
                        subEvent.delegationCount = 0
                        subEvent.membersCount = 0
                    })
                }
            })
            localStorage.setItem('mainEvents', JSON.stringify(events))
        } catch (error) {
            console.error('خطأ في تحديث إحصائيات الأحداث:', error)
        }
    }
    
    // تهيئة الأحداث الرئيسية
    const defaultMainEvents = [
        {
            id: 1,
            name: "ايديكس",
            englishName: "edex",
            icon: "fa-solid:fighter-jet",
            created_at: new Date().toISOString(),
            sub_events: [
                {
                    id: 1,
                    name: "ايديكس 2025",
                    created_at: new Date().toISOString(),
                    delegationCount: 0,
                    membersCount: 0
                },
                {
                    id: 2,
                    name: "ايديكس 2024",
                    created_at: new Date().toISOString(),
                    delegationCount: 0,
                    membersCount: 0
                }
            ]
        },
        {
            id: 2,
            name: "الفروسية",
            englishName: "equestrianism",
            icon: "fa7-solid:horse-head",
            created_at: new Date().toISOString(),
            sub_events: [
                {
                    id: 3,
                    name: "بطولة الفروسية 2025",
                    created_at: new Date().toISOString(),
                    delegationCount: 0,
                    membersCount: 0
                }
            ]
        },
        {
            id: 3,
            name: "النجم الساطع",
            englishName: "brightstar",
            icon: "material-symbols:star-shine-rounded",
            created_at: new Date().toISOString(),
            sub_events: [
                {
                    id: 4,
                    name: "النجم الساطع 2025",
                    created_at: new Date().toISOString(),
                    delegationCount: 0,
                    membersCount: 0
                }
            ]
        },
        {
            id: 4,
            name: "معرض الفضاء",
            englishName: "spaceexpo",
            icon: "material-symbols:rocket-launch",
            created_at: new Date().toISOString(),
            sub_events: [
                {
                    id: 1759770253670,
                    name: "معرض الفضاء 2025",
                    created_at: new Date().toISOString(),
                    delegationCount: 0,
                    membersCount: 0
                }
            ]
        }
    ]

    // حفظ البيانات في localStorage
    // الأحداث: احتفظ بالبيانات الموجودة أو استخدم الافتراضية
    if (!localStorage.getItem('mainEvents') || localStorage.getItem('mainEvents') === '[]') {
        localStorage.setItem('mainEvents', JSON.stringify(defaultMainEvents))
    }
    
    // الوفود: فارغة
    localStorage.setItem('delegations', JSON.stringify([]))
    
    // الأعضاء: فارغة
    localStorage.setItem('members', JSON.stringify([]))

    // تهيئة المناصب العسكرية
    const defaultMilitaryPositions = [
        "قائد وحدة",
        "ضابط عمليات",
        "ضابط استخبارات",
        "ضابط لوجستي",
        "ضابط اتصالات",
        "ضابط طبي",
        "ضابط هندسي",
        "ضابط أمني"
    ]

    if (!localStorage.getItem('militaryPositions')) {
        localStorage.setItem('militaryPositions', JSON.stringify(defaultMilitaryPositions))
    }

    // تهيئة الجنسيات
    const defaultNationalities = [
        "مصري",
        "سعودي",
        "ألماني",
        "تركي",
        "أمريكي",
        "هندي",
        "صيني",
        "فرنسي",
        "قطري",
        "إماراتي"
    ]

    if (!localStorage.getItem('nationalities')) {
        localStorage.setItem('nationalities', JSON.stringify(defaultNationalities))
    }
}