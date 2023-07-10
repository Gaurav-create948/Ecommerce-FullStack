import axios from 'axios';

async function registerUser(dataObject, setDataObjects) {
    try {
        const res = await axios.post('https://ecommerce-app-jof9.onrender.com/register', dataObject, {withCredentials:true});
        if (res.status === 200) {
            setDataObjects(() => ({
                username: '',
                email: '',
                password: ''
            }));
            return res;
        }
    } catch (error) {
        return error;
    }
}


async function loginUser(dataObject, setDataObjects) {
    try {
        const res = await axios.post('https://ecommerce-app-jof9.onrender.com/login', dataObject, {withCredentials: true});
        if (res.status === 200) {
            setDataObjects(() => ({
                email: '',
                password: ''
            }))
            return res;
        } else {
            throw new Error(res.status);
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function sendFormData(formType, dataObject, setDataObjects, callback) {
    if (formType) {
        const message = await registerUser(dataObject, setDataObjects);
        if (message.status === 200) {
            callback(null, message);
        }
        else {
            callback(new Error('Some Problem'));
        }
    }
    else {
        const message = await loginUser(dataObject, setDataObjects);
        if (message.status === 200) {
            callback(null, message);
        }
        else {
            callback(new Error('Some problem'));
        }
    }
}