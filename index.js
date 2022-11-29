const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(require("./routes/index"));

app.listen(5000, () => {
  console.log("server en http://localhost:5000");
});
