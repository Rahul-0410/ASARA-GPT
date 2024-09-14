import axios from 'axios';

const AsraApiBackend = axios.create({
    baseURL: `http://localhost:3000`
    // baseURL: `https://asara-gpt.onrender.com/`
});


export default AsraApiBackend;