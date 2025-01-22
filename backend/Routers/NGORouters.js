const NGOHandler = require('../Controllers/NGOControllers')
const express= require('express')

const router = express.Router();

router.route('/addDeserving')
    .post(NGOHandler.addDeserving);

router.route('/addDeservingBulk')
    .post(NGOHandler.addDeservingBulk);

router.route('/getDeserving/:ngoID')
    .get(NGOHandler.getDeserving);

router.route('/getDonation/:ngoID/:brandID')
    .get(NGOHandler.getDonations);

router.route('/getDonated/:ngoID/:brandID')
    .get(NGOHandler.getDonated);

router.route('/getDiscarded')
    .get(NGOHandler.getDiscarded);

router.route('/addDonation')
    .post(NGOHandler.addDonation);

router.route('/addDonated')
    .post(NGOHandler.addDonated);

router.route('/addDiscarded')
    .post(NGOHandler.addDiscarded);

router.route('/getDetails/:email')
    .get(NGOHandler.getDetails);

    
module.exports = router