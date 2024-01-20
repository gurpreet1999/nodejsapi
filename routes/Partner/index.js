const express = require('express');
const router = express.Router();

const baseRoute="/:partnerId"

const certificateRoutes = require('./certificate');
const certificateRoute = require('./PartnerCertificate');
const equipmentRoute = require('./PartnerEquipment');
const serviceRoute = require('./PartnerService');
const showreelRoute = require('./PartnerShowreel');
const droneRoute = require('./PartnerDrone');


router.use(`${baseRoute}/certificates`, certificateRoute);
router.use(`${baseRoute}/equipments`, equipmentRoute);
router.use(`${baseRoute}/services`, serviceRoute );
router.use(`${baseRoute}/showreels`, showreelRoute);
router.use(`${baseRoute}/drones`, droneRoute);



module.exports = router;