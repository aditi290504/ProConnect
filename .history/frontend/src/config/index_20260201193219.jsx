const {default: axios} = require('axios');

export const baseURL = 'https://proconnect-ffo7.onrender.com';

export const clientServer = axios.create({
    baseURL: baseURL,
})