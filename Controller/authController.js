const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.signup = async(req,res)=>{
    const {username,email,password} = req.body;

    if(!username || !email || !password){
        res.status(422).json("Required Fields");
    }

    try {
        const existUser = await User.findOne({email});

        if(existUser){
            res.status(422).json("User Already Exist. Please Use another email");;
        }else{
            const newUser = new User({
                username,email,password
            });

            const newUSerData = await newUser.save();

            if(newUSerData){
                res.status(200).json(newUSerData);
            }
        }
    } catch (error) {
        if(error){
            res.status(500).json(error.message)
        }
    }
}

exports.signIn = async(req,res)=>{
    const {email,password} = req.body;

    

    try {
        if(!email | !password){
            res.json("Required Fields");
        }

        const userLogin = await User.findOne({email});

        if(userLogin){
            const isMatch = await bcrypt.compare(password,userLogin.password);

            if(isMatch){
                const {password, ...otherInfo} = userLogin._doc; // yaha se password alag kr rahe aur baki info alag kr rahe 
                res.status(200).json(otherInfo); // result me password show nhi hoga
            }else{
                res.status(422).json("Password Not Match");
            }
        }else{
            res.status(422).json("Invalid Credentials");
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}