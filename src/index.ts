import express from "express"
import database, { Blog } from "./database/database.js"
import editor from "./editor/editor.js";

// TODO 
// 1. Maybe check the id in both "/update/d/:id" and "/delete/:id" if it exists in the database.
// 2. Make the wesbite responsive.
// 3. Refactor for the "view" handler in this file.

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

    const body = database.get(id, "body") as string;
    let params = { ...(database.get(id) as Blog), content: [""] }
    params.content.pop();

    let temp = "";
    let j = 0;
    let target = "\r\n";
    for(let i = 0; i < body.length; i++) {
        temp += body[i];
        if(body[i] === target[j]) {
            j++;
            if(j >= target.length) {
                if(temp === "\r\n") temp = "‎ ";
                params.content.push(temp);
                temp = "";
                j = 0;
            }
        }
    }
    if((temp !== "")) params.content.push(temp);

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