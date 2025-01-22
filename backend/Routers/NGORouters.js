const NGOHandler = require('../Controllers/NGOControllers')
const express= require('express')

const router = express.Router();

router.route('/addDeserving')
    .post(NGOHandler.addDeserving)

router.route('/addDeservingBulk')
    .post(NGOHandler.addDeservingBulk)

    
module.exports = router