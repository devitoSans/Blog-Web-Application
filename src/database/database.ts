export interface Blog {
    createdOn: string;
    lastUpdateOn: string;
    title: string;
    author: string;
    body: string;
};

function isABlog(object: any) {
    return ("title" in object && "author" in object && "body" in object);
}

interface Blogs {
    [id: string]: Blog
};

const Database = Object.freeze({
    __data__: <Blogs>{},

    /**
     * Get a specific blog or its property.
     * 
     * @param id - Blog's ID
     * @param property - If specified, one of the blog's property (e.g. "title", "author", "body", etc)
     * @returns If ```property``` is specified, then it will only return the value of the given property. Otherwise, a whole blog will be returned. If the ID given does not exist, it will return ```undefined```
     */
    get(id: string, property?: keyof Blog): Blog | string | undefined {
        if(!this.isIdExists(id)) {
            return undefined;
        }
        if(property) {
            return this.__data__[id][property];
        }
        else {
            return Object.freeze(this.__data__[id]);
        }
    },

    /**
     * Set a new blog or a new value for its property
     * 
     * @param id - Blog's ID
     * @param blog - The new blog, or one of the blog's property (e.g. "title", "author", "body", etc)
     * @param value - If ```blog``` is one of the blog's property, then this will be the new value of that property.
     */
    set(id: string, blog: Blog | keyof Blog, value?: string): void {
        // We don't need to normalize the user's input (to prevent HTML injection).
        // Since we are using one of the EJS's feature (see EJS's <%= %> for more clarifications).
        if(isABlog(blog)) {
            this.__data__[id] = blog as Blog;
        }
        else {
            this.__data__[id][blog as keyof Blog] = value as string;
        }
    },

    /**
     * Delete a specific blog using its ID.
     * 
     * @param id - Blog's ID
     * @returns ```true``` if there is such ID to be deleted, otherwise ```false```.
     */
    delete(id: string): boolean {
        if(!this.isIdExists(id)) {
            return false;
        }
        delete this.__data__[id];
        return true;
    },

    isEmtpy() {
        return Object.keys(this.__data__).length === 0;
    },

    isIdExists(id: string) {
        return id in this.__data__;
    },

    [Symbol.iterator]() {
        return Object.entries(this.__data__);
    },

    keys() {
        return Object.keys(this.__data__);
    },

    values() {
        return Object.values(this.__data__);
    }
});

/** EXPORT */
export default Database;