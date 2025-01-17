;
;
const Database = Object.freeze({
    __data__: {},
    get(id) {
        return Object.freeze(this.__data__[id]);
    },
    set(id, blog) {
        this.__data__[id] = blog;
    },
    delete(id) {
        delete this.__data__[id];
    },
    isEmtpy() {
        return Object.keys(this.__data__).length === 0;
    },
    isIdExists(id) {
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
