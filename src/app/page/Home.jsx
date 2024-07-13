import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import moment from 'moment';

import AddUpdateModal from '../components/product/AddUpdateModal';
import {
    productAdd, productDelete, productFilter,
    productFindAll, productUpdate
} from '../slice/product.slice';
import ProductColumns from '../components/product/CustomTable';
import { dateArr } from '../common/methods';

const Home = () => {
    const dispatch = useDispatch();
    const { findAll, filteredFindAll } = useSelector((x) => x.productSlice);
    const [modalState, setModalState] = useState(false);
    const [storeImg, setStoreImg] = useState('');
    const [initialValues, setInitialValues] = useState({
        product: '',
        price: '',
        creation_date: moment().format('YYYY-MM-DD')
    });
    const [filterDate, setFilterDate] = useState({
        start_date: '',
        end_date: ''
    });

    useEffect(() => {
        allProducts();
    }, []);

    useEffect(() => {
        if (filterDate.start_date !== '' && filterDate.end_date !== '') {
            const output = findAll.filter((x) =>
                moment(x.creation_date) > moment(filterDate.start_date) &&
                moment(x.creation_date) < moment(filterDate.end_date)
            );
            dispatch(productFilter(output));
        } else {
            dispatch(productFilter(findAll));
        }
    }, [filterDate])

    function allProducts() {
        dispatch(productFindAll())
    }

    const openAddModal = () => {
        setInitialValues({
            product: '',
            price: '',
            creation_date: moment().format('YYYY-MM-DD')
        });
        setModalState(true);
    };

    const openUpdateModal = (id) => {
        const product = findAll.find(item => item.id === id);
        setInitialValues(product);
        setModalState(true);
    };

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

    const changeDate = (key, value) => {
        setFilterDate({ ...filterDate, [key]: value });
    }

    const handleFormSubmit = (values, resetForm, setPreviewImg) => {
        const action = values.id ? productUpdate : productAdd;
        const formdata = new FormData();
        formdata.append('attachments', storeImg);
        formdata.append('data', JSON.stringify(values));
        dispatch(action(formdata))
            .unwrap()
            .then(() => {
                allProducts();
                setStoreImg('');
                setPreviewImg(null);
                resetForm();
                setModalState(false);
            })
            .catch((err) => {
                console.error('Error:', err);
            });
    };

    const productColumns = ProductColumns({ openUpdateModal, deleteRecord });

    return (
        <div>
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <Button variant='success' onClick={() => openAddModal()}>
                        Add
                    </Button>
                    <Button variant='warning' onClick={() => setFilterDate({ end_date: '', start_date: '' })}>
                        Reset date
                    </Button>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='d-flex justify-content-between align-items-center'>
                        {
                            dateArr.map(({ title, dateType }, i) => {
                                return (
                                    <div key={title + i}>
                                        <label htmlFor="">{title}</label>
                                        <div>
                                            <input
                                                type="date"
                                                value={filterDate[dateType]}
                                                onChange={(e) => changeDate(dateType, e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div>
                        <input type="text" onChange={(e) => searchProducts(e.target.value)} />
                    </div>
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
            <AddUpdateModal
                show={modalState}
                initialValues={initialValues}
                handleClose={() => setModalState(false)}
                onSubmit={handleFormSubmit}
                setStoreImg={setStoreImg}
            />
        </div>
    )
}

export default Home
