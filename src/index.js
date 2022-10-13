const express = require('express');
const app = express();   //express framework


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

let URL='mongodb://127.0.0.1:27017/testproject'
const mongoose = require('mongoose'); //connect to mongoose
mongoose.connect(URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        console.log("================>>");
        if (!err) {
            console.log("Database connected !!!!!!!!!!")
        }
        console.log(err);
    });

const cors = require('cors');
app.use(cors({ origin: '*' }));

//routing
let routes = require("./router");
app.use('/iapi', routes);

//rest api calling 
app.listen(8001, () => {
    console.log(`Server running at port 8001`);
})