require("dotenv").config();
const express = require('express');
const multer  = require('multer')
const app = express();
var cors = require('cors')
const Port = 8000;

// Database Connectivity
require("./db/conn");

// Understand JSON data
app.use(express.json());

// Upload Images using multer
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, "images")
    },
    filename:(req,file,cb)=>{
        cb(null, 'hello.jpg')  // req.bpody.name => isko jb react se upload karenge tb likhenge hello.jpg k place pr
    }
});

const upload = multer({storage:storage});
app.post('/upload', upload.single('file'),(req,res)=>{
    res.status(200).json("Image has been Uploaded.......");
})

// Route File
app.use('/', require('./Router/userRoute'));
app.use('/', require('./Router/postRoute'));
app.use('/', require('./Router/categoryRoute'));

app.listen(Port, ()=>{
    console.log(`Server is Running on port ${Port}`)
});

// function Call
// DefaultData();


// Database Connectivity
// require("./db/conn");


// Understand JSON data
// app.use(express.json());

// app.use(cookieParser(""))
// app.use(cors());

// // Route File
// app.use('/', require('./Router/productRoute'));
// app.use('/', require('./Router/userRoute'));

// Default Data
// const DefaultData = require('./defaultdata')