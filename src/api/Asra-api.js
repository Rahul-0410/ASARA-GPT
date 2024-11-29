import axios from 'axios';

const AsraApiBackend = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}`
    // baseURL: `https://asara-gpt.onrender.com/`
});


export default AsraApiBackend;