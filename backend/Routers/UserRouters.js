const UserHandler = require('../Controllers/UserControllers')
const express= require('express')

const router = express.Router();

router.route('/getAllBrands')
    .get(UserHandler.getAllBrands);

router.route('/getAllNGOs')
    .get(UserHandler.getAllNGOs);

router.route('/addDonation')
    .post(UserHandler.addDonation);

router.route('/getDonations/:userID')
    .get(UserHandler.getDonationsByUser)

    
module.exports = router