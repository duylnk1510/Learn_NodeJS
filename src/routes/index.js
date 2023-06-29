'use strict'

const express = require('express');
const router = express.Router();
 
router.use("/v1/api", require("./access"))
// router.get("", (req, resp, next) => {
//     return resp.status(200).json({
//         message: "OK",
//     })
// }) 

module.exports = router;