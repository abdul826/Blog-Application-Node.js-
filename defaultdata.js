const productsData = require('./constant/productdata');
const Products = require('./models/productSchema');

const DefaultData = async()=>{
    try{

        await Products.deleteMany({}); // We use this because when we run our server every time the data save in database so by using this command it will delete the previous data 

        const storeData = await Products.insertMany(productsData);
        // console.log(storeData)
    }catch(error){
        console.log("Error=>" + " " + error.message);
    }
}

module.exports = DefaultData;