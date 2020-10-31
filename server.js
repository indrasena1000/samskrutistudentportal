const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors')
const cookieParser = require('cookie-parser');
var morgan = require('morgan')
const helmet = require('helmet');
const flash = require('connect-flash');
const database = require("./models/index");
//routes
const studentRoute = require("./routes/studentRoute")
const authRoute = require("./routes/authRoute")
const AdminRoute = require('./routes/adminRoutes');
const employeeRoute = require("./routes/employeeRoutes")
const { protect } = require('./middleware/auth');
const app = express();
app.use(express.json())
app.use(helmet());
app.use(flash());
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

// app.use(function(req, res, next) {
//    res.locals.success = req.flash('success');
//    res.locals.error = req.flash('error');
//    res.locals.host = `http://${req.headers.host}`;
//    next();
//  });
app.get("/",(req,res)=>{
   return res.render("./student/studentProfile.ejs")
})
// app.all('*', (req, res, next) => {
//    res.render('404');
//  });
app.use(`/admin`, protect, AdminRoute);
app.use("/student",protect,studentRoute)
app.use("/employee",protect,employeeRoute)
app.use("/auth",authRoute)

app.listen(3007, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`);
  });