"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database/database");
const app = (0, express_1.default)();
const port = 3000;
console.log(database_1.data["12"].title);
app.use(express_1.default.static("public"));
app.get("/", (req, res) => {
    res.render("index.ejs");
});
app.listen(port, () => { console.log(`Server is currently running in port ${port}`); });
