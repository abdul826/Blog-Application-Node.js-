const express = require('express');

const {signup, signIn} = require('../Controller/authController');
const {update, deleteUser, getUser} = require('../Controller/userControlle')
// const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.route('/register').post(signup);

router.route('/login').post(signIn);

router.route('/user/:id').put(update);

router.route('/user/:id').delete(deleteUser);

router.route('/user/:id').get(getUser);

// router.route('/addtocart/:id').post(authenticate, addtocart);

// router.route('/cartdetails').get(authenticate, cartDetails);

// router.route('/validuser').get(authenticate, validUser);

// router.route('/deletecartdata/:id').delete(authenticate, deleteCartItem);

// router.route('/logout').get(authenticate, logoutUser);

module.exports =  router;