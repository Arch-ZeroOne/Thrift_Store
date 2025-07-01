const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
const tokenRouter = require("./routes/token");
//TODO CORS Error occuring
//will enable CORS policy
app.use(cors());
app.use("/token", tokenRouter);

app.listen(3000, () => {
  console.log("Server is running");
});
