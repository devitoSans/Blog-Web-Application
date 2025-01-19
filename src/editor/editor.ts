import { Request, Response, NextFunction, Router } from "express";
import database, { Blog } from "../database/database.js";
import { guidGenerator } from "../utilities/utilities.js";

/**
 * TODO
 * refactor this again. as you can see, when trying to add a default value,
 * it is really tedious and unclean.
 */

type EditorStatus = "Create" | "Update";

interface EditorParams extends Blog {
    status: EditorStatus;
    route: string;
}

function editor(status: EditorStatus) {
    const method = status === "Create" ? Create : Update;
    const params = method.params;

    const editor = Router();
    editor.get(params.route, method.routeGet)
          .post(params.route, method.routePost);

    return editor;
};

// const 


const Create = {
    params: {
        status: "Create",
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
        let { title, author, body } = req.body as { title: string, author: string, body: string };
        body = body.replace(/\r\n/g, "<br>");

        const id = guidGenerator();
        const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" } as object);

        // vvvv This part is what I am talking about. 
        database.set(id, { date: date, title: title || "Untitled Blog", author: author || "Anonymous", body: body });
        return res.redirect("/");
    }
};

const Update = {
    params: {
        status: "Update",
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
        Update.params = { ...Update.params, ...{ ...database.get(id), body: database.get(id).body.replace(/<br>/g, "\r\n") } };
        return res.render("editor.ejs", Update.params);
    },

    routePost(req: Request, res: Response, next: NextFunction) {
        let { title, author, body } = req.body;
        body = body.replace(/\r\n/g, "<br>");
        const { id } = req.params;

        database.set(id, { ...database.get(id), title, author, body });
        return res.redirect("/"); 
    }
};

/** EXPORT */ 
export default editor;