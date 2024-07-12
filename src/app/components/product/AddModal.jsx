import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import * as yup from 'yup'
import moment from 'moment'

const AddModal = (props) => {
    const { show, changeModalState } = props;

    const [previewImg, setPreviewImg] = useState(null);
    const [storeImg, setStoreImg] = useState('');

    const validateFields = yup.object().shape({
        product: yup.string().required('Enter category'),
        price: yup.number().positive('Amount cannot be negative').required('Enter price'),
        creation_date: yup.string().required('Enter date'),
    });

    const { values, errors, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: {
            product: '',
            price: '',
            creation_date: moment().format('YYYY-MM-DD'),
        },
        validationSchema: validateFields,
        onSubmit: (values) => {
            console.log('values:- ', values);
            // const { id } = adminAuthCheck.getAuthUser();
            // values.user_id = id;
            // const formdata = new FormData();
            // formdata.append('attachments', storeImg);
            // formdata.append('data', JSON.stringify(values));
            // dispatch(categoryAdd(formdata)).unwrap().then((response) => {
            //     if (response.code === 200) {
            //         resetForm();
            //         setStoreImg('');
            //         setPreviewImg(null);
            //         changeModalState(false)
            //     }
            //     console.log('response:- ', response);
            // }).catch((err) => {
            //     console.log(err);
            // })
        }
    });

    const handleFiles = (data) => {
        setStoreImg(data);
        const reader = new FileReader();
        reader.onload = function () {
            setPreviewImg(reader.result);
        };
        reader.readAsDataURL(data);
    }

    return (
        <Modal
            show={show}
            onHide={() => changeModalState(false)}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Add product</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Row>
                        <Col md='6'>
                            <Form.Group className="my-3" controlId="formBasicEmail">
                                <Form.Control
                                    type="text"
                                    name='product'
                                    placeholder="Product"
                                    value={values.product}
                                    onChange={handleChange}
                                />
                                {errors.product && <div className='formik-error'>{errors.product}</div>}
                            </Form.Group>
                        </Col>
                        <Col md='6'>
                            <Form.Group className="my-3" controlId="formBasicEmail">
                                <Form.Control
                                    type="text"
                                    name='price'
                                    placeholder="Price"
                                    value={values.price}
                                    onChange={handleChange}
                                />
                                {errors.price && <div className='formik-error'>{errors.price}</div>}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md='6'>
                            <Form.Group className="my-3" controlId="formBasicEmail">
                                <Form.Control
                                    type='date'
                                    name='creation_date'
                                    value={values.creation_date}
                                    onChange={handleChange}
                                />
                                {errors.price && <div className='formik-error'>{errors.price}</div>}
                            </Form.Group>
                        </Col>
                        <Col md='6'>
                            <Form.Group className="my-3">
                                <Form.Label htmlFor="productFiles" >
                                    Select Image
                                </Form.Label>
                                <Form.Control
                                    style={{ display: 'none' }}
                                    type='file'
                                    id='productFiles'
                                    name='attachments'
                                    onChange={(e) => handleFiles(e.target.files[0])}
                                />
                            </Form.Group>
                            {
                                previewImg &&
                                <img src={previewImg} alt="" style={{ width: '140px', height: '160px' }} />
                            }
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" type='submit'>
                        Submit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddModal
