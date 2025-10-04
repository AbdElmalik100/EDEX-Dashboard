import { Icon } from "@iconify/react/dist/iconify.js"
import { NavLink, useLocation, useNavigate, useRoutes } from "react-router"
import { navLinks } from "../constants"
import { Button } from "@/components/ui/button"
import AddEventCategory from "./Events/AddEventCategory"

const SideBar = () => {
    const navigate = useNavigate()
    const route = useLocation()
    const handleLogout = () => navigate('/login')    

    // إعادة تحميل الفئات عند إضافة فئة جديدة
    const handleCategoryAdded = () => {
        // يمكن إضافة منطق إعادة التحميل هنا إذا لزم الأمر
    }

    return (
        <nav className="sidebar p-6 w-[350px] bg-neutral-800 text-white rounded-xl flex flex-col gap-6 overflow-auto thin-scrollbar">
            <NavLink to={'/'} className="logo-wrapper mx-auto">
                <img src="/images/logo.png" width={128} alt="Logo Image" />
            </NavLink>
            
            {/* الروابط الثابتة */}
            <ul className="flex flex-col gap-2">
                {
                    navLinks.map((link, index) => (
                        <li key={index}>
                            <NavLink to={link.to} className={`link `}>
                                <Icon icon={link.icon} fontSize={24} />
                                <span>{link.name}</span>
                            </NavLink>
                        </li>
                    ))
                }
            </ul>

            <div className="mt-auto space-y-4">
                {/* زر إضافة فئة جديدة */}
                <AddEventCategory onCategoryAdded={handleCategoryAdded} />
                
                <Button className="bg-transparent border-rose-400 border text-rose-400 hover:bg-rose-400/10 cursor-pointer w-full" onClick={handleLogout}>
                    <Icon icon="solar:logout-outline" />
                    <span>تسجيل خروج</span>
                </Button>
            </div>
        </nav>
    )
}

export default SideBar