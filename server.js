const express = require("express");
const bodyParser = require("body-parser");
var session = require('express-session')
var cors = require('cors')
const cookieParser = require('cookie-parser');
var morgan = require('morgan')

//  const flash = require('connect-flash');
const database = require("./models/index");
//routes
const studentRoute = require("./routes/studentRoute")
const authRoute = require("./routes/authRoute")
const AdminRoute = require('./routes/adminRoutes');
const employeeRoute = require("./routes/employeeRoutes")
const { protect } = require('./middleware/auth');
const app = express();
app.use(express.json())


app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }))
if (process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'));
 }
//  app.locals.moment = moment;
app.use(bodyParser.json());
app.use(cors())
// app.use(morgan())
app.use(cookieParser());
app.use(express.static(`public/`))
require('dotenv').config();
const PORT = process.env.PORT ;

// app.configure(function() {
//    app.use(express.cookieParser('flashes'));
//    app.use(express.session({ cookie: { maxAge: 60000 }}));
//    app.use(flash());
//  });
// app.use(function(req, res, next) {
//    app.use(cookieParser('flash'));
//     app.use(session({ cookie: { maxAge: 60000 }}));
//     app.use(flash());
//     res.locals.success = req.flash('success');
//     res.locals.error = req.flash('error');
//    // res.locals.host = `http://${req.headers.host}`;
//    next();
//  });
const {isLoggedIn} = require('./middleware/auth')
app.get("/",isLoggedIn,(req,res)=>{
   return res.render("./login.ejs")
})

app.get("/log",(req,res)=>{
   return res.render("./student/tables.ejs")

})
// app.all('*', (req, res, next) => {
//    res.render('./404.ejs');
//  });
app.use(`/admin`, protect, AdminRoute);
app.use("/student",protect,studentRoute)
app.use("/employee",protect,employeeRoute)
app.use("/auth",authRoute)

app.listen(PORT, (req, res) => {
     console.log(`Server Started at PORT ${PORT}`);
  });