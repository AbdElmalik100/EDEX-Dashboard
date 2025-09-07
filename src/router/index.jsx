import React from 'react'
import { Route, Routes } from 'react-router'
import Dashboard from '../layouts/Dashboard'
import Auth from '../layouts/Auth'
import Home from '../pages/Home'
import Login from '../pages/Auth/Login'
import EventDetails from '../pages/EventDetails'

const AppRouter = () => {
    return (
        <Routes>
            <Route element={<Auth />}>
                <Route path='login' element={<Login />} />
            </Route>
            <Route path='/' element={<Dashboard />}>
                <Route index element={<Home />} />
                <Route path=':eventId' element={<EventDetails />} />
            </Route>
        </Routes>
    )
}

export default AppRouter