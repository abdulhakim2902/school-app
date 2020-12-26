const router = require('express').Router();
const Controller = require('../controllers/adminController');

router.get('/', Controller.adminPage)

module.exports = router