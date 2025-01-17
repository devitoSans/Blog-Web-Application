export interface Blog {
    date: string;
    title: string;
    author: string;
    body: string;
};

interface Blogs {
    [id: string]: Blog
};

const Database = Object.freeze({
    __data__: <Blogs>{},

    get(id: string) {
        return Object.freeze(this.__data__[id]);
    },

    set(id: string, blog: Blog) {
        this.__data__[id] = blog;
    },

    delete(id: string) {
        delete this.__data__[id];
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