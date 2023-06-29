const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const app = express();
require('dotenv').config();

//init middlewares
app.use(morgan("dev"));
// app.use(helmet());
app.use(compression());

require("./dbs/init.mongodb");
console.log('Process ', process.env);
const { checkOverLoad } = require("./helpers/check.connect");
// checkOverLoad();

app.get("/", (req, resp, next) => {

    const str = "abc";
    return resp.status(200).json({
        message: "OK",
        metadata: str.repeat(10)
    })
}) 
module.exports = app