import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import AddModal from '../components/product/AddModal';

const Home = () => {
    const [modalState, setModalState] = useState(false);
    const changeModalState = (params) => {
        setModalState(params)
    }
    return (
        <div>
            <Button variant='success' onClick={() => changeModalState(true)}>Add</Button>
            <AddModal show={modalState} changeModalState={changeModalState}/>
        </div>
    )
}

export default Home
