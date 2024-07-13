import moment from 'moment';
import React from 'react';
import { Button } from 'react-bootstrap';

const ProductColumns = ({ openUpdateModal, deleteRecord }) => {
    const productColumns = [
        {
            name: 'Product',
            selector: x => x.product,
            sortable: true,
        },
        {
            name: 'Price',
            selector: x => x.price,
            sortable: true,
            sortFunction: (a, b) => a.price - b.price,
        },
        {
            name: 'Date',
            selector: x => moment(x.creation_date).format('L'),
            sortable: true,
            sortFunction: (a, b) => moment(a.creation_date) - moment(b.creation_date),
        },
        {
            name: 'Image',
            selector: x => <img
                width={38}
                src={`${process.env.REACT_APP_BACKEND_URL}/product/img/${x.id}?${new Date().getTime()}`}
                alt=""
            />,
        },
        {
            name: 'Action',
            selector: x => <div className='d-flex justify-content-between'>
                <div>
                    <Button variant='primary' onClick={() => openUpdateModal(x.id)}>Update</Button>
                </div>
                <div>
                    <Button variant='danger' onClick={() => deleteRecord(x.id)}>Delete</Button>
                </div>
            </div>,
        },
    ];

    return productColumns;
};

export default ProductColumns;
