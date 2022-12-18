const express = require('express');

const {addCtegory, allCategory} = require('../Controller/categoryController');
const router = express.Router();


router.route('/userCategory').post(addCtegory);

router.route('/userCategory').get(allCategory);

module.exports = router; 