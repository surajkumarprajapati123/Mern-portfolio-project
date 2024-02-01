const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./Routes/portfolioRoute");
const path = require("path");

//dotenv configuartion
dotenv.config();

//rest object
const app = express();

//midlewares
// app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//  static path
app.use(express.static(path.join(__dirname, "./client/build")));
//routes
app.use("/api/v1/portfolio", routes);
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//port
const PORT = process.env.PORT || 8080;

//listen

app.listen(PORT, () => {
  console.log(`Server Runnning On PORT ${PORT} `);
});
