import React from 'react'
import Header from './Header'

const Layout = ({ Page }) => {
    return (
        <>
            <Header />
            <main id='main' className='main'>
                <Page />
            </main>
        </>
    )
}

export default Layout
