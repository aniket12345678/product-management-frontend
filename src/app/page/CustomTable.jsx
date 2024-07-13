import React from 'react';
import { Button } from 'react-bootstrap';

const ProductColumns = ({ updateRecord, deleteRecord }) => {
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
        },
        {
            name: 'Date',
            selector: x => x.creation_date,
        },
        {
            name: 'Image',
            selector: x => <img
                width={38}
                src={`${process.env.REACT_APP_BACKEND_URL}/product/img/${x.id}`}
                alt=""
            />,
        },
        {
            name: 'Action',
            selector: x => <div className='d-flex justify-content-between'>
                <div>
                    <Button variant='primary' onClick={() => updateRecord(x.id)}>Update</Button>
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
