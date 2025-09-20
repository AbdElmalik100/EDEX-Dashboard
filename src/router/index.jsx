import { Route, Routes } from 'react-router'
import Dashboard from '../layouts/Dashboard'
import Auth from '../layouts/Auth'
import Home from '../pages/Home'
import Login from '../pages/Auth/Login'
import Edex from '../pages/EDEX/Edex'
import Equestrianism from '../pages/Equestrianism/Equestrianism'
import EdexDetails from '../pages/EDEX/EdexDetails'
import Brightstar from '../pages/Brightstar/Brightstar'
import EdexMembers from '../pages/EDEX/EdexMembers'

const AppRouter = () => {
    return (
        <Routes>
            <Route element={<Auth />}>
                <Route path='login' element={<Login />} />
            </Route>
            <Route path='/' element={<Dashboard />}>
                <Route index element={<Home />} />
                <Route path='/edex' element={<Edex />} />
                <Route path='/edex/:eventId' element={<EdexDetails />} />
                <Route path='/edex/:eventId/:delegationId' element={<EdexMembers />} />
                <Route path='/equestrianism' element={<Equestrianism />} />
                <Route path='/brightstar' element={<Brightstar />} />
            </Route>
            
        </Routes>
    )
}

export default AppRouter