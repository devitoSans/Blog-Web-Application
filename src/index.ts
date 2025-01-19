import express from "express"
import database from "./database/database.js"
import editor from "./editor/editor.js";
import { guidGenerator } from "./utilities/utilities.js";

// TODO 
// 1. Maybe check the id in both "/update/d/:id" and "/delete/:id" if it exists in the database.
// 2. Make the wesbite responsive.
// 3. Refactor the editor.ts file.

const app = express();
const port = 3000;

app.use("/public", express.static("public"))
   .use(express.urlencoded({ extended: true }));

app
.get("/", (req, res) => {
    res.render("index.ejs", { blogs: ( database.isEmtpy() ? undefined : database) });
})
.use(editor("Create"))
.use(editor("Update"))
.get("/view/:id", (req, res) => {
    const { id } = req.params;
    if(!database.isIdExists(id)) {
        return res.redirect("/notfound");
    }
    return res.render("view.ejs", { id: id, blog: database.get(id) });
})
.post("/delete/:id", (req, res) => {
    const { id } = req.params;
    database.delete(id);
    res.redirect("/");
})
.use("/notfound", (req, res) => {
    res.render("notfound.ejs");
})
.use((req, res) => {
    res.redirect("/notfound");
});

app.listen(port, () => { console.log(`Server is currently running in port ${port}`) });