import { Router } from "express";
import database from "../database/database.js";
import { guidGenerator } from "../utilities/utilities.js";
function editor(status) {
    const method = status === "create" ? Create : Update;
    const params = method.params;
    const editor = Router();
    editor.get(params.route, method.routeGet)
        .post(params.route, method.routePost);
    return editor;
}
;
const Create = {
    params: {
        status: "create",
        route: "/create",
        title: "",
        body: "",
        author: "",
        date: ""
    },
    routeGet(req, res, next) {
        return res.render("editor.ejs", Create.params);
    },
    routePost(req, res, next) {
        const { title, author, body } = req.body;
        const id = guidGenerator();
        const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
        database.set(id, { date: date, title: title, author: author, body: body });
        return res.redirect("/");
    }
};
const Update = {
    params: {
        status: "update",
        route: "/update/:id",
        title: "",
        body: "",
        author: "",
        date: ""
    },
    routeGet(req, res, next) {
        const { id } = req.params;
        if (!database.isIdExists(id)) {
            return res.redirect("/notfound");
        }
        Update.params.route = `/update/${id}`;
        Update.params = Object.assign(Object.assign({}, Update.params), database.get(id));
        return res.render("editor.ejs", Update.params);
    },
    routePost(req, res, next) {
        const { title, author, body } = req.body;
        const { id } = req.params;
        database.set(id, Object.assign(Object.assign({}, database.get(id)), { title, author, body }));
        return res.redirect("/");
    }
};
/** EXPORT */
export default editor;
