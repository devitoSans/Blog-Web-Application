;
;
class Database {
    constructor() {
        this.data = {};
    }
    get(id) {
        return Object.freeze(this.data[id]);
    }
    set(id, blog) {
        this.data[id] = blog;
    }
    delete(id) {
        delete this.data[id];
    }
    isEmtpy() {
        return Object.keys(this.data).length === 0;
    }
    isIdExists(id) {
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
