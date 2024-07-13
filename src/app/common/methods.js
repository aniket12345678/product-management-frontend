import { toast } from 'react-toastify';

function toastMessage(type, msg) {
    toast[type](msg)
}

export { toastMessage}