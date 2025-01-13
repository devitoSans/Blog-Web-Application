import express from "express";
import { data } from "./database/database.js";
const app = express();
const port = 3000;
console.log(data["12"].title);
app.use(express.static("public"));
app.get("/", (req, res) => {
    res.render("index.ejs");
});
app.listen(port, () => { console.log(`Server is currently running in port ${port}`); });
