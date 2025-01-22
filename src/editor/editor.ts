import { Request, Response, NextFunction, Router } from "express";
import database, { Blog } from "../database/database.js";
import { guidGenerator } from "../utilities/utilities.js";

type EditorStatus = "Create" | "Update";

interface EditorParams extends Blog {
    status: EditorStatus;
    route: string;
}

function editor() {
    const editor = Router();
    // A middleware for body parser is done by the app.
    editor.use(defaultValueSetter)
          .get("/create", Create.routeGet)
          .post("/create", Create.routePost)
          .get("/update/:id", Update.routeGet)
          .post("/update/:id", Update.routePost);
    return editor;
};

// Middleware for setting the default value.
function defaultValueSetter(req: Request, res: Response, next: NextFunction) {
    const BLOG_DEFAULT_VALUE: Blog = {
        createdOn: "Unknown",
        lastUpdateOn: "Unknown",
        title: "Untitled Blog",
        author: "Anonymous",
        body: ""
    };

    let blogProperties = { ...req.body } as Blog;
    for(const property in BLOG_DEFAULT_VALUE) {
        // To make Typescript shutup 
        let key = (property as keyof Blog);
        blogProperties[key] = blogProperties[key] || BLOG_DEFAULT_VALUE[key];
    }
    req.body = blogProperties;

    next();
}

const Create = {
    routeGet(req: Request, res: Response, next: NextFunction) {
        const createParams = {
            status: "Create",
            route: "/create"
        } as EditorParams;

        // Concat to create an object with EditorParams type
        const params = { ...createParams, ...req.body } as EditorParams;
        
        return res.render("editor.ejs", params);
    },
    
    routePost(req: Request, res: Response, next: NextFunction) {
        // Get the necessary data to store it in the database
        const id = guidGenerator();
        const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" } as object);
        const { title, author, body } = req.body as { title: string, author: string, body: string };
        
        // Store it in database
        const blogInformation: Blog = { createdOn: date, lastUpdateOn: date, 
                                        title: title, author: author, body: body };
        database.set(id, blogInformation);
        
        return res.redirect("/");
    }
};

const Update = {
    routeGet(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        if(!database.isIdExists(id)) {
            return res.redirect("/notfound");
        }
        
        const updateParams = {
            status: "Update",
            route: `/update/${id}`,
        } as EditorParams;
        
        // Concat to create an object with EditorParams type
        const params = { ...updateParams, ...(database.get(id) as Blog) };

        return res.render("editor.ejs", params);
    },

    routePost(req: Request, res: Response, next: NextFunction) {
        const { title, author, body } = req.body;
        const { id } = req.params;
        const newDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" } as object);

        database.set(id, { ...(database.get(id) as Blog), lastUpdateOn: newDate, title: title, author: author, body: body });
        return res.redirect("/"); 
    }
};

/** EXPORT */ 
export default editor;