const Post = require("../models/Post");

// Create Post
exports.addPost = async(req,res)=>{
    try {
        const userPost = new Post(req.body);

        if(userPost){
            const post = await userPost.save();

            if(post){
                res.status(200).json(post);
            }else{
                res.status(422).json("Post Not added successfully");
            }
        }else{
            res.status(422).json("Do not get any data");
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// Update Post
exports.updatePost = async(req,res)=>{
    const id = req.params.id;

    if(id){
        try {
            const post = await Post.findById(id);

            if(post.username === req.body.username){
                const updateData = await Post.findByIdAndUpdate(id,{$set:req.body}, {new:true});

                if(updateData){
                    res.status(200).json(updateData);
                }else{
                    res.status(422).json("Post Not Updated");
                }
            }else{
                res.status(422).json("You can update only your data");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

// Delete Post
exports.deletePost = async(req,res)=>{
    const id = req.params.id;

        try {
            const post = await Post.findById(id);

            if(post.username === req.body.username){
                const deleteData = await Post.findByIdAndDelete(id);

                if(deleteData){
                    res.status(200).json("Post Deleted Successfully");
                }else{
                    res.status(422).json("Post Not Deleted");
                }
            }else{
                res.status(422).json("You can delete only your Post");
            }
        } catch (error) {
            res.status(500).json(error);
        }
}

// Get Single Post
exports.singlePost = async(req,res)=>{
    const id = req.params.id;

        try {
            const post = await Post.findById(id);

            const singlePost = await Post.findById(id);

                if(singlePost){
                    res.status(200).json(singlePost);
                }else{
                    res.status(422).json("Post Not Fetch");
                }
            
        } catch (error) {
            res.status(500).json(error);
        }
}

// Get All POst
exports.FetchAllPost = async(req,res)=>{
    const username = req.query.user;
    const catName = req.query.cat;

    try {
        let posts;

        if(username){
            posts = await Post.find({username});
        }else if(catName){
            posts = await Post.find({categories:{
                $in:[catName]
        }
        })
        }else{
            posts = await Post.find();
        }

        if(posts){
            res.status(200).json(posts);
        }else{
            res.status(422).json("Post not Fetch")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}