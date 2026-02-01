const {default: axios} = require('axios');

exp

export const clientServer = axios.create({
    baseURL: 'http://localhost:9090',
})