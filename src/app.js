const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const app = express();

//init middlewares
app.use(morgan("dev"));
// app.use(helmet());
app.use(compression());


app.get("/", (req, resp, next) => {

    const str = "abc";
    return resp.status(200).json({
        message: "OK",
        metadata: str.repeat(1000000)
    })
})
module.exports = app