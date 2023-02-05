const axios = require("axios")
const http = require("http");
const $http = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 30000,
    httpAgent: new http.Agent({
        keepAlive: true,
        maxSockets: 10
    })
})
const array = Array.from(Array(1000))
array.forEach((item) => {
    $http.get("").then(res => {
        console.log("===")
    }).catch((e) => {
        console.log(e.message)
    })
})