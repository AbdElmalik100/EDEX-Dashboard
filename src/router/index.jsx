import { Route, Routes } from 'react-router'
import Dashboard from '../layouts/Dashboard'
import Auth from '../layouts/Auth'
import Home from '../pages/Home'
import Login from '../pages/Auth/Login'
import Edex from '../pages/EDEX/Edex'
import Equestrianism from '../pages/Equestrianism/Equestrianism'
import EventDetails from '../pages/EDEX/EventDetails'
import Brightstar from '../pages/Brightstar/Brightstar'

const AppRouter = () => {
    return (
        <Routes>
            <Route element={<Auth />}>
                <Route path='login' element={<Login />} />
            </Route>
            <Route path='/' element={<Dashboard />}>
                <Route index element={<Home />} />
                <Route path='/edex' element={<Edex />} />
                <Route path='/edex/:eventId' element={<EventDetails />} />
                <Route path='/equestrianism' element={<Equestrianism />} />
                <Route path='/brightstar' element={<Brightstar />} />
            </Route>
            
        </Routes>
    )
}

export default AppRouter