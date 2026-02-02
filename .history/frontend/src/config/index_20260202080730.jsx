const {default: axios} = require('axios');

export const baseURL = 'https://proconnectapp-14hj.onrender.com';

export const clientServer = axios.create({
    baseURL: baseURL,
})