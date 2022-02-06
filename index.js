const express = require("express");
const cors = require("cors");
const app = express();
const multer = require('multer');

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// connect to db
mongoose.connect(process.env.DB_CONNECT,
()=> console.log("connected to db"))

// import routes
const listingRoutes = require("./routes/listing");
const userRoutes = require("./routes/user");
const cartRoute = require("./routes/cart");

// middlewae use
app.use(express.json());
app.use(cors())
// router middleware
app.use("/api/listings",listingRoutes);
app.use("/api/user",userRoutes);
app.use("/api/carts", cartRoute);

// image
var loc;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        loc = file.originalname
        cb(null, loc);
    }
});

var upload = multer({ storage: storage });

app.post('/api/listings/imageUrl', upload.single('imageUrl'), (req, res) => {
    const imageUrl = req.imageUrl;
    res.send(apiResponse({ path: "http://localhost:4000/uploads/" + loc, imageUrl }));
});
function apiResponse(results) {
    return JSON.stringify({ "status": 200, "error": null, "response": results });
}

app.get('/uploads/:filename', function (req, res) {
    const filePath = "./uploads/" + req.params.filename;
    res.sendFile(filePath, { root: __dirname });
});


// 
app.listen(4000,(req,res)=>{
    console.log('Server running at port 4000')
});