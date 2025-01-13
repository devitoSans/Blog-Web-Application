import express from "express"
import database from "./database/database.js"
import { guidGenerator } from "./utilities/utilities.js";
import data from "./database/database.js";

// TODO 
// 1. Refactor all of this.
// 2. the body is not being able to display the new line. fix that.
// 3. Maybe seperate the ejs files for creating and updating?
// 4. Maybe check the id in both "/update/d/:id" and "/delete/:id" if it exists in the database.
// 5. Style the page.

const app = express();
const port = 3000;

app.use(express.static("public"))
   .use(express.urlencoded({ extended: true }));

app
.get("/", (req, res) => {
    res.render("index.ejs", { blogs: ( Object.keys(database).length !== 0 ? database : undefined) });
})
.get("/NewBlog", (req, res) => {
    res.render("newBlog.ejs");
})
.post("/create", (req, res) => {
    const { title, author, body } = req.body;
    const id = guidGenerator();
    const option = { year: "numeric", month: "long", day: "numeric" };
    database[id] = { date: new Date().toLocaleDateString("en-US", option as object), 
                     title, author, body };
    res.redirect("/");
})
.get("/view/:id", (req, res) => {
    const { id } = req.params;
    if(id in database) {
        return res.render("view.ejs", { id: id, blog: database[id] });
    }
    else {
        res.redirect("/notfound");
    }
})
.get("/update/:id", (req, res) => {
    const { id } = req.params;
    if(id in database) {
        return res.render("newBlog.ejs", { id: id, ...database[id] });
    }
    else {
        res.redirect("/notfound");
    }
})
.post("/update/d/:id", (req, res) => {
    const { title, author, body } = req.body;
    const id = req.params.id;
    database[id] = { ...database[id], title, author, body };
    return res.redirect("/");    
})
.post("/delete/:id", (req, res) => {
    const { id } = req.params;
    delete database[id];
    res.redirect("/");
})
.use("/notfound", (req, res) => {
    res.send("<h1>404 Not Found</h1>");
})
.use((req, res) => {
    res.redirect("/notfound");
});

app.listen(port, () => { console.log(`Server is currently running in port ${port}`) });