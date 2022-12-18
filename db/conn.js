const mongoose = require('mongoose');

// const DB = "mongodb+srv://abdul:Abdul@khan786@cluster0.y2he7.mongodb.net/AmazonClone?retryWrites=true&w=majority";


// mongoose.connect(DB).then(()=> console.log("Connection Successfully")).catch((error)=> console.log("error=>" + " " + error.message));

mongoose.connect(`mongodb://0.0.0.0:27017/Blog`,{
    useUnifiedTopology:true,
    // useNewUrlParse:true
}).then(()=>{
    console.log(`Connection Successfully`)
}).catch((error)=>{
    console.log(error + 'Mongo Error');
})
    