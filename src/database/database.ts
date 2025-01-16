export interface Blog {
    date: string;
    title: string;
    author: string;
    body: string;
};

interface Blogs {
    [id: string]: Blog
};

class Database {
    private data: Blogs = {};

    get(id: string) {
        return Object.freeze(this.data[id]);
    }

    set(id: string, blog: Blog) {
        this.data[id] = blog;
    }

    delete(id: string) {
        delete this.data[id];
    }

    isEmtpy() {
        return Object.keys(this.data).length === 0;
    }

    isIdExists(id: string) {
        return id in this.data;
    }

    [Symbol.iterator]() {
        return Object.entries(this.data);
    }

    keys() {
        return Object.keys(this.data);
    }

    values() {
        return Object.values(this.data);
    }
}

/** EXPORT */
export default new Database();