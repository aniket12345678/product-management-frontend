import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../page/Home'
import Layout from '../components/Layout'

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout Page={Home} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing
