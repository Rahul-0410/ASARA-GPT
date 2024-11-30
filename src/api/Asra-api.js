import axios from 'axios';

const AsraApiBackend = axios.create({
    baseURL: `https://aasara-gpt.vercel.app`
    // baseURL: `https://asara-gpt.onrender.com/`
});


export default AsraApiBackend;