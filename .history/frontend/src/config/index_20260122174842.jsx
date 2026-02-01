const {default: axios} = require('axios');

export const baseURL = 'http://localhost:9090';

export const clientServer = axios.create({
    baseURL: baseURL,
})