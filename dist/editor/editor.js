import { Router } from "express";
import database from "../database/database.js";
import { guidGenerator } from "../utilities/utilities.js";
function editor() {
    const editor = Router();
    // A middleware for body parser is done by the app.
    editor.use(defaultValueSetter)
        .get("/create", Create.routeGet)
        .post("/create", Create.routePost)
        .get("/update/:id", Update.routeGet)
        .post("/update/:id", Update.routePost);
    return editor;
}
;
// Middleware for setting the default value.
function defaultValueSetter(req, res, next) {
    const BLOG_DEFAULT_VALUE = {
        createdOn: "Unknown",
        lastUpdateOn: "Unknown",
        title: "Untitled Blog",
        author: "Anonymous",
        body: ""
    };
    let blogProperties = Object.assign({}, req.body);
    for (const property in BLOG_DEFAULT_VALUE) {
        // To make Typescript shutup 
        let key = property;
        blogProperties[key] = blogProperties[key] || BLOG_DEFAULT_VALUE[key];
    }
    req.body = blogProperties;
    next();
}
const Create = {
    routeGet(req, res, next) {
        const createParams = {
            status: "Create",
            route: "/create"
        };
        // Concat to create an object with EditorParams type
        const params = Object.assign(Object.assign({}, createParams), req.body);
        return res.render("editor.ejs", params);
    },
    routePost(req, res, next) {
        // Get the necessary data to store it in the database
        const id = guidGenerator();
        const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
        const { title, author, body } = req.body;
        // Store it in database
        const blogInformation = { createdOn: date, lastUpdateOn: date,
            title: title, author: author, body: body };
        database.set(id, blogInformation);
        return res.redirect("/");
    }
};
const Update = {
    routeGet(req, res, next) {
        const { id } = req.params;
        if (!database.isIdExists(id)) {
            return res.redirect("/notfound");
        }
        const updateParams = {
            status: "Update",
            route: `/update/${id}`,
        };
        // Concat to create an object with EditorParams type
        const params = Object.assign(Object.assign({}, updateParams), database.get(id));
        return res.render("editor.ejs", params);
    },
    routePost(req, res, next) {
        const { title, author, body } = req.body;
        const { id } = req.params;
        const newDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
        database.set(id, Object.assign(Object.assign({}, database.get(id)), { lastUpdateOn: newDate, title: title, author: author, body: body }));
        return res.redirect("/");
    }
};
/** EXPORT */
export default editor;
