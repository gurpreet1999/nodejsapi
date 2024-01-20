const express = require('express');
const flyingspotRouter = express.Router();

const baseRoute = "/:spotId";

flyingspotRouter.get(`${baseRoute}`);

flyingspotRouter.get(`${baseRoute}/like`);

flyingspotRouter.get(`${baseRoute}/unlike`);

flyingspotRouter.get(`${baseRoute}/follow`)

flyingspotRouter.get(`${baseRoute}/unfollow`);

flyingspotRouter.get(`${baseRoute}/rate`);

flyingspotRouter.post(`${baseRoute}/comment`);

flyingspotRouter.put(`${baseRoute}/comment`);

flyingspotRouter.post(`${baseRoute}/media`);




module.exports = router;