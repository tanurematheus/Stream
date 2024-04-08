import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 60000,
    headers: { 'X-Custom-Header': 'foobar' }
});