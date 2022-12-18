const Category = require('../models/Category');
const category = require('../models/Category');

// Add Category
exports.addCtegory = async(req,res)=>{
    try {
        const newCategory = new Category(req.body);

        if(newCategory){
            const cat = await newCategory.save();

            if(cat){
                res.status(200).json(cat);
            }else{
                res.status(422).json("Category Not Added");
            }
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

// GEt All Categories

exports.allCategory = async(req,res)=>{
    try {
        const allCat = await Category.find();

        if(allCat){
            res.status(200).json(allCat);
        }else{
            res.status(422).json("Category Not Fetch");
        }
    } catch (error) {
        res.status(422).json(error);
    }
}