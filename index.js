const express = require("express");
const db = require("./routes/db-config");
const app = express();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;
app.use("/js", express.static(__dirname+ "/public/js"));
app.use("/css", express.static(__dirname+ "/public/css"));
app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");
app.use(cookieParser());
app.use(express.json());
db.connect((err)=> {
    if (err) throw err;
    console.log("database connected");
});

app.use("/", require("./routes/pages"));
app.use("/api", require("./controllers/auth")); 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});