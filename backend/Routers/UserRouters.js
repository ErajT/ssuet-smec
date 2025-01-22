const UserHandler = require('../Controllers/UserControllers')
const express= require('express')

const router = express.Router();

router.route('/getAllBrands')
    .get(UserHandler.getAllBrands);

router.route('/getAllNGOs')
    .get(UserHandler.getAllNGOs);

router.route('/addPending')
    .post(UserHandler.addPending);

router.route('/getDonations/:userID')
    .get(UserHandler.getDonationsByUser);

router.route('/getDetails/:email')
    .get(UserHandler.getDetails);

    
module.exports = router