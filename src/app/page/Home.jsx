import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';

import AddModal from '../components/product/AddModal';
import { productDelete, productFilter, productFindAll, productFindOne } from '../slice/product.slice';
import ProductColumns from '../components/product/CustomTable';

const Home = () => {
    const { findAll, findOne, filteredFindAll } = useSelector((x) => x.productSlice);
    const dispatch = useDispatch();
    const [modalState, setModalState] = useState(false);
    const [modalType, setModalType] = useState('add');

    useEffect(() => {
        allProducts();
    }, []);

    function allProducts() {
        dispatch(productFindAll())
    }

    const changeModalState = (params) => {
        setModalState(params);
    }

    function updateRecord(params) {
        setModalType('update')
        dispatch(productFindOne({ id: params }));
        changeModalState(true)
    }

    function deleteRecord(params) {
        if (window.confirm('Do you want to remove the data')) {
            dispatch(productDelete({ id: params })).unwrap().then((result) => {
                allProducts();
            }).catch((err) => {
                console.log('err:- ', err);
            });
        }
    }

    const searchProducts = (params) => {
        const output = findAll.filter((x) => {
            return (
                x.product.toLowerCase().includes(params.toLowerCase()) ||
                x.price.includes(params)
            )
        });
        dispatch(productFilter(output));
    }

    const productColumns = ProductColumns({ updateRecord, deleteRecord });

    return (
        <div>
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <Button variant='success' onClick={() => changeModalState(true)}>Add</Button>
                </div>
                <div>
                    <input type="text" onChange={(e) => searchProducts(e.target.value)} />
                </div>
            </div>
            <Row>
                <Col lg={12}>
                    <Card>
                        <Card.Body>
                            <DataTable
                                columns={productColumns}
                                data={filteredFindAll}
                                pagination={true}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <AddModal
                show={modalState}
                allProducts={allProducts}
                changeModalState={changeModalState}
                findOne={findOne}
                type={modalType}
            />
        </div>
    )
}

export default Home
