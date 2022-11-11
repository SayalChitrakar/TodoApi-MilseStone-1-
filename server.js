const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({
    path:'./config.env'
})


const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.PASSWORD);

mongoose.connect(DB).then(()=>{

    console.log("database connected");
})

const port = process.env.PORT;
app.listen(port,()=>{

    console.log(`App starting in port ${port}`);
})