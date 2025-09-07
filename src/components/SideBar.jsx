import { Icon } from "@iconify/react/dist/iconify.js"
import { NavLink, useLocation, useNavigate, useRoutes } from "react-router"
import { navLinks } from "../constants"
import { Button } from "@/components/ui/button"

const SideBar = () => {
    const navigate = useNavigate()
    const route = useLocation()
    const handleLogout = () => navigate('/login')    

    return (
        <nav className="sidebar p-6 w-[350px] bg-neutral-800 text-white rounded-xl flex flex-col gap-6 overflow-auto thin-scrollbar">
            <NavLink to={'/'} className="logo-wrapper mx-auto">
                <img src="/images/logo.png" width={128} alt="Logo Image" />
            </NavLink>
            <ul className="flex flex-col gap-6">
                {
                    navLinks.map((link, index) => (
                        <li key={index}>
                            <NavLink to={link.to} className={`link ${route.pathname.includes('/') ? 'active' : ''}`}>
                                <Icon icon={link.icon} fontSize={24} />
                                <span>{link.name}</span>
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
            <Button className="bg-transparent mt-auto border-rose-400 border text-rose-400 hover:bg-rose-400/10 cursor-pointer" onClick={handleLogout}>
                <Icon icon="solar:logout-outline" />
                <span>تسجيل خروج</span>
            </Button>
        </nav>
    )
}

export default SideBar