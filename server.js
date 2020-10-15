const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors')

var morgan = require('morgan')
const database = require("./models/index");
//routes
const studentRoute = require("./routes/studentRoute")
const authRoute = require("./routes/authRoute")

const app = express();
app.use(express.json())
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());
app.use(cors())
app.use(morgan())
app.use(express.static(`public/`))
require('dotenv').config();
const PORT = process.env.PORT ;

app.get("/",(req,res)=>{
   return res.render("./login.ejs")
})

app.use("/student",studentRoute)
app.use("/auth",authRoute)

app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`);
  });