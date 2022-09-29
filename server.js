const express=require('express')
const mongoose = require('mongoose');
const userAuth=require('./middleware/userAuth')
const app = express();
const path=require('path')
const cors=require('cors')
require('dotenv').config()
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'krishna',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(cookieParser())
app.use(express.urlencoded({
    extended: true
}));

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

app.use(userAuth.authJwt)

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
