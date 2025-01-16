import { Request, Response, NextFunction, Router } from "express";
import database, { Blog } from "../database/database.js";
import { guidGenerator } from "../utilities/utilities.js";

type EditorStatus = "create" | "update";

interface EditorParams extends Blog {
    status: EditorStatus;
    route: string;
}

function editor(status: EditorStatus) {
    const method = status === "create" ? Create : Update;
    const params = method.params;

    const editor = Router();
    editor.get(params.route, method.routeGet)
          .post(params.route, method.routePost);

    return editor;
};

const Create = {
    params: {
        status: "create",
        route: "/create",
        title: "",
        body: "",
        author: "",
        date: ""
    } as EditorParams,

    routeGet(req: Request, res: Response, next: NextFunction) {
        return res.render("editor.ejs", Create.params);
    },

    routePost(req: Request, res: Response, next: NextFunction) {
        const { title, author, body } = req.body;
        const id = guidGenerator();
        const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" } as object);

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
    } as EditorParams,

    routeGet(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        if(!database.isIdExists(id)) {
            return res.redirect("/notfound");
        }

        Update.params.route = `/update/${id}`;
        Update.params = { ...Update.params, ...database.get(id) };
        return res.render("editor.ejs", Update.params);
    },

    routePost(req: Request, res: Response, next: NextFunction) {
        const { title, author, body } = req.body;
        const { id } = req.params;

        database.set(id, { ...database.get(id), title, author, body });
        return res.redirect("/"); 
    }
};

/** EXPORT */ 
export default editor;