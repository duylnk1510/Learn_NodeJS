'use strict'

const mongoose = require('mongoose');
const os = require("os");
const process = require("process");
const _SECOND = 5000;
//check connect
const countConnect = () => {
    const numConnection = mongoose.connections.length;
    console.log('Number of connection ', numConnection);
    return numConnection;
}

//check over load
const checkOverLoad = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;

        console.log(`Active connection ${numConnection}`);
        // vd máy chỉ chịu được 5 connect trên 1 core và máy bạn có 8 core thì 8 x 5 = 40 nếu vượt quá 40 thì báo j đó
        console.log(`Bộ nhớ sử dụng ${memoryUsage / 1024 / 2024} MB`);
        const maxConnections = numCores * 5;
        if (numConnection > maxConnections) {
            console.log('Connect có vấn đề');
        }
    }, _SECOND);
}

module.exports = {
    countConnect,
    checkOverLoad
};