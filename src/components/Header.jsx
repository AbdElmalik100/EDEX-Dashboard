import { useLocation } from 'react-router'
import UserProfile from './UserProfile'

const Header = () => {
    const navigation = useLocation()
    const headerTitle = () => {
        switch (navigation.pathname) {
        case '/edex':
            return "معرض ايديكس" 
        case '/equestrianism':
            return "الفروسية" 
        case '/brightstar':
            return "النجم الساطع" 
        default:
            return "لوحة التحكم" 
    }
    }
    return (
        <header className='p-2 rounded-xl w-full bg-white flex items-center justify-between shadow-md'>
            <h1 className='font-bold text-xl ms-8'>
                {headerTitle()}
            </h1>
            <UserProfile />
        </header>
    )
}

export default Header