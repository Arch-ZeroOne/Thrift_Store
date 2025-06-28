const express = require("express");
const app = express();

app.use(express.json());
const tokenRouter = require("./routes/token");
app.use("/token", tokenRouter);

app.listen(3000, () => {
  console.log("Server is running");
});
