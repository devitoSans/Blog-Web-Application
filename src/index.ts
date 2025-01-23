import express from "express"
import database, { Blog } from "./database/database.js"
import editor from "./editor/editor.js";
import { splitIntoNewLines } from "./utilities/utilities.js";

// TODO 
// 1. Maybe check the id in both "/update/d/:id" and "/delete/:id" if it exists in the database.
// 2. Make the wesbite responsive.
// 3. When copying the content of a blog, it will create unwanted new lines on each <p> element.
//    Maybe it is due to <p> element's behaviour? (a possible solution is to manipulate a navigator object)

const app = express();
const port = 3000;

app.use("/public", express.static("public"))
   .use(express.urlencoded({ extended: true }));

app
.get("/", (req, res) => {
    res.render("index.ejs", { blogs: (database.isEmtpy() ? undefined : database) });
})
.use(editor())
.get("/view/:id", (req, res) => {
    const { id } = req.params;
    if(!database.isIdExists(id)) {
        return res.redirect("/notfound");
    }

    let params: { [key: string]: any } = { ...(database.get(id) as Blog) }
    params.content = splitIntoNewLines(params.body);

    return res.render("view.ejs", { id: id, ...params });
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