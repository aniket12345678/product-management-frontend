import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Loader from '../components/Loader';

const Home = lazy(() => import('../page/Home'));
const Layout = lazy(() => import('../components/Layout'));

const Routing = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loader/>}>
                <Routes>
                    <Route path='/' element={<Layout Page={Home} />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default Routing
