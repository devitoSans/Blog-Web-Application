import express from "express";
import database from "./database/database.js";
import editor from "./editor/editor.js";
// TODO 
// 1. the body is not being able to display the new line. fix that. (can de done using css's white-space: wrap;)
// 2. Maybe check the id in both "/update/d/:id" and "/delete/:id" if it exists in the database.
// 3. Style the page.
const app = express();
const port = 3000;
app.use(express.static("public"))
    .use(express.urlencoded({ extended: true }));
app
    .get("/", (req, res) => {
    res.render("index.ejs", { blogs: (database.isEmtpy() ? undefined : database) });
})
    .use(editor("create"))
    .use(editor("update"))
    .get("/view/:id", (req, res) => {
    const { id } = req.params;
    if (!database.isIdExists(id)) {
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
app.listen(port, () => { console.log(`Server is currently running in port ${port}`); });
