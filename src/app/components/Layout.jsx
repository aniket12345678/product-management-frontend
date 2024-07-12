import React from 'react'
import Header from './Header'

const Layout = ({ Page }) => {
    return (
        <>
            <Header />
            <Page />
        </>
    )
}

export default Layout
