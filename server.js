const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());


// MONGODB CONNECTION STARTS //
mongoose.Promise = global.Promise;
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@test-1.fft2y.mongodb.net/todo_app?retryWrites=true&w=majority`,
  { useUnifiedTopology: true, useNewUrlParser: true,useFindAndModify: false }
);

mongoose.connection
  .once("open", () => console.log("Connected to the database"))
  .on("error", (err) => console.log("Error with the database!", err));

// MONGODB CONNECTION ENDS //
const PORT = process.env.PORT || 5000;


app.use("/notes",  require("./routes/notes"));

// app.get("/", (req, res) => {
//   res.send("<h2>Hüloğğğ</h2>");
// });
if(process.env.PORT==="production"){
  app.use(express.static("build"))
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"build","index.html"))
  })
}

app.listen(PORT, console.log("Listening : ", PORT));
