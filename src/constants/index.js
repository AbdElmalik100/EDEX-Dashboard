
export const randomImages = [
    '/images/img_1.png',
    '/images/img_4.jpeg',
    '/images/img_5.jpg',
]

export const navLinks = [
    {
        name: "لوحة التحكم",
        icon: "material-symbols:dashboard-rounded",
        to: "/",
    },
    {
        name: "ايديكس",
        icon: "fa-solid:fighter-jet",
        to: "/edex",
        type: "main-event"
    },
    {
        name: "الفروسية",
        icon: "fa7-solid:horse-head",
        to: "/equestrianism",
        type: "main-event"
    },
    {
        name: "النجم الساطع",
        icon: "material-symbols:star-shine-rounded",
        to: "/brightstar",
        type: "main-event"
    },
    {
        name: "إدارة الأحداث",
        icon: "material-symbols:event",
        to: "/events-management",
    },
]

export const events = [
    {
        name: "ايديكس 2025",
        date: new Date().toLocaleString(),
        delegationCount: 132,
        membersCount: 361
    },
    {
        name: "ايديكس 2024",
        date: new Date().toLocaleString(),
        delegationCount: 148,
        membersCount: 256
    },
]

export const moveTypeOptions = [
    {
        label: "وصول",
        value: "وصول"
    },
    {
        label: "مغادرة",
        value: "مغادرة"
    },
]

export const hallOptions = [
    {
        label: "صالة 1",
        value: "صالة 1",
    },
    {
        label: "صالة 2",
        value: "صالة 2",
    },
    {
        label: "صالة 3",
        value: "صالة 3",
    },
]