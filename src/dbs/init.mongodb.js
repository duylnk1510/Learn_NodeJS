'use strict'

const mongoose = require("mongoose");

const connectStr = 'mongodb://localhost:27017/testdb';
const { countConnect } = require("../helpers/check.connect");


class Database {
    constructor() {
        this.connect();
    }

    connect(type = 'mongodb') {
        if (1 === 1) {
            mongoose.set('debug', true);
            mongoose.set('debug', {color:true});
          }
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family: 4 // Use IPv4, skip trying IPv6
        }

        mongoose.connect(connectStr, options).then(_ => {
            console.log("connect mongo successed PRO", countConnect());
        }).catch(err =>
            console.log("Err connect ", err)
        );
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const instanceMongoDB = Database.getInstance();
module.exports = instanceMongoDB; 