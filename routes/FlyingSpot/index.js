const express = require('express');
const router = express.Router();

const baseRoute='/flyingspot'

const flyingspotRouter=require("./FlyingSpot.js")

router.use(`${baseRoute}`,flyingspotRouter)


module.exports = router;