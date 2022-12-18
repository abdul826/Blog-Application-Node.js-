const express = require('express');

const {addPost, updatePost, deletePost, singlePost, FetchAllPost} = require('../Controller/postController');
const router = express.Router();


router.route('/userPost').post(addPost);

router.route('/userPost/:id').put(updatePost);

router.route('/userPost/:id').delete(deletePost);

router.route('/userPost/:id').get(singlePost);

router.route('/userPost').get(FetchAllPost);

module.exports = router; 