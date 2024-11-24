import axios from 'axios';

const AsraApiBackend = axios.create({
    baseURL: `https://asara-gpt-eight.vercel.app`
    // baseURL: `https://asara-gpt.onrender.com/`
});


export default AsraApiBackend;