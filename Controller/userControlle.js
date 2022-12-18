const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Post = require('../models/Post');


// Update User

exports.update =  async(req,res)=>{

    if(req.params.id){
        if(req.body.password){
            const hashPass = await bcrypt.hash(req.body.password, 12)
            // console.log(hashPass);
            req.body.password = hashPass;

        }
    }

    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        }, {
            new:true
        });


        if(updateUser){
            res.status(200).json(updateUser);
        }else{
            res.status(422).json("User Not Updated");
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// Delete

exports.deleteUser = async(req,res)=>{
    const id = req.params.id;

    // console.log(id)
    if(id){
        try {
            const user = await User.findById(id);

            try {
                await Post.deleteMany({username:user.username});
                await User.findByIdAndDelete(id)

                res.status(200).json("User has been deleted......")
            } catch (error) {
                res.status(500).json(error.message)
            }
        } catch (error) {
            res.status(404).json("User Not Found")
        }
    }
}

// Get Single User
exports.getUser = async(req,res)=>{
    const id = req.params.id;

    try {
        if(id){
            const singleUser = await User.findById(id);

            if(singleUser){
                const {password, ...otherInfo} = singleUser._doc;
                res.status(200).json(otherInfo)
            }else{
                res.status(422).json("user not found")
            }
        }
    } catch (error) {
         res.status(500).json(error.message)
    }
}

// exports.signup = async(req,res)=>{
//     // console.log(req.body);

//     const {fname,email,mobile,password,cpassword} = req.body;

//     if(!fname || !email || !mobile || !password || !cpassword){
//         res.status(422).json({error : "Please Fill The Data"});
//     }

//     try {
//         const existUser = await User.findOne({email});

//         if(existUser){
//             res.status(422).json({error: "User already exist"});
//         }else if(password !== cpassword){
//             res.status(422).json({error: "Password && confirm Password Not Matched"});
//         }else{
            
//             const saveUser = new User({
//                 fname,email,mobile,password,cpassword
//             });

//             // Hash the password in userSchema file
            
//             const saveUserData = await saveUser.save();

//             if(saveUserData){
//                 res.status(200).json(saveUserData);
//             }else{
//                 res.status(424).json({error : "Data Not Save"})
//             }
//         }
//     } catch (error) {
//         res.status(500).json("Error => " + error.message);
//     }

// }

// // Sign_In API

// exports.signin = async(req,res)=>{

//     const {email,password} = req.body;

//     if(!email || !password){
//         res.status(424).json({error : " Please Enter User Email and Password"});
//     }

//     try {
//         const userLogin = await User.findOne({email:email});
        
//         if(userLogin){
//             const isMatch = bcrypt.compare(password, userLogin.password);
//             // console.log(isMatch + "Pass Match");

//             // token generate
//             const token = await userLogin.generatAuthtoken();
//             // console.log(token);
           
//             // Generate Cookie
//             res.cookie("Amazonweb", token, {
//                 expires: new Date(Date.now() + 3600000), //(3600000 * 12)
//                 httpOnly: true
//             });

//             if(!isMatch){
               
//                 res.status(424).json({error : "User Password and Database Password not matched"});
//             }else{
//                 res.status(200).json(userLogin);
//             }
//         }else{
//             res.status(424).json("Invalid Credentials")
//         }
//     } catch (error) {
//         res.status(500).json({"Error=> " : error.message});
//     }
// }

// // Add to cart

// exports.addtocart = async(req,res)=>{
//     const {id} = req.params;

//     try {
//         const cart = await Products.findOne({id});
//         console.log("Cart data")
//         console.log(cart);

//         const userConcate = await User.findOne({_id: req.userID});  //yaha pr jo user add kiya hai product cart me us ki id aur database ki id match krwa rahe hai
//         console.log(userConcate);

//         if (userConcate) {
//             const cartData = await userConcate.addcartdata(cart);

//             await userConcate.save();
//             console.log(cartData + " thse save wait kr");
//             console.log(userConcate + "userjode save");
//             res.status(200).json(userConcate);
//         }else{
//             res.status(424).json({error : "Invalid Credentials"});
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// // Get Cart Details

// exports.cartDetails = async(req,res)=>{
//     try {
//         const buyUser = await User.findOne({_id:req.userID});
//         res.status(200).json(buyUser);
//     } catch (error) {
//         res.status(500).json("error" + error.message);
//     }
// }

// // Get Cart Details for valid USer

// exports.validUser = async(req,res)=>{
//     try {
//         const validUserOne = await User.findOne({_id:req.userID});
//         res.status(200).json(validUserOne);
//     } catch (error) {
//         res.status(500).json("error" + error.message);
//     }
// }

// // Remove Items from Cart

// exports.deleteCartItem = async(req,res)=>{
//     const {id} = req.params;
//     try {
//         req.rootUser.carts = req.rootUser.carts.filter((curVal)=>{
//             return curVal.id != id;
//         });

//         req.rootUser.save();
//         res.status(200).json(req.rootUser);
//         console.log("Item Removed");

//     } catch (error) {
//         console.log("Error => " + error);
//         res.status(500).json(req.rootUser);
//     }
// }

// // Logout USer

// exports.logoutUser = async(req,res)=>{
//     try {
//         req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
//             return curelem.token !== req.token
//         });

//         res.clearCookie("Amazonweb", { path: "/" });
//         req.rootUser.save();
//         res.status(201).json(req.rootUser.tokens);
//         console.log("user logout");
//     } catch (error) {
//         res.status(500).json("Error => BackEnd " + error.message);
//         console.log("jwt provide then logout");
//     }
// }