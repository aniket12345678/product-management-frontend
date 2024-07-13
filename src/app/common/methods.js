import { toast } from 'react-toastify';

function toastMessage(type, msg) {
    toast[type](msg)
}

const dateArr = [
    { title: 'Start date', dateType: 'start_date' },
    { title: 'End date', dateType: 'end_date' }
];

export { toastMessage, dateArr }