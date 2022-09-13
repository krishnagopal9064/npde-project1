const express=require('express')
const mongoose = require('mongoose');
const userAuth=require('./middleware/userAuth')
const app = express();
const path=require('path')
app.use(express.urlencoded({
    extended: true
}));

app.use(userAuth.authJwt)

const apiRoute=require('./routes/apiRoute')
app.use(apiRoute)
const dbDriver="mongodb+srv://krishnagopali9064:u2ELxozp7Dlv2p80@cluster0.mgujx.mongodb.net/node-project1"
port = process.env.PORT || 1087;

mongoose.connect(dbDriver, {
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
