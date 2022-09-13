const express=require('express')
const mongoose = require('mongoose');
const userAuth=require('./middleware/userAuth')
const app = express();
const path=require('path')
const cors=require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

app.use(userAuth.authJwt)
// app.use((req,res,next)=>{
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
//     next()
// })

const apiRoute=require('./routes/apiRoute')
app.use(apiRoute)
port = process.env.PORT || 1087;

mongoose.connect(process.env.dbDriver, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => {
    app.listen(port, () => {
        console.log("Database Connected...");
        console.log(`Server Running At http://localhost:${port}`);
    })
}).catch(err => {
    console.log(err);
})
