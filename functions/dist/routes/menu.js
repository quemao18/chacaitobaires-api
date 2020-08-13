"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesMenu = void 0;
const auth_1 = require("../helpers/auth");
const menus_1 = require("../endpoints/menus");
const collection = 'menus';
exports.routesMenu = (app, db) => {
    // GET /users
    app.get(`/${collection}`, (req, res) => {
        menus_1.getDocs(res, db).catch(err => console.log(err));
        return;
    });
    // GET /users
    app.get(`/${collection}/status/:status`, (req, res) => {
        menus_1.getDocsByStatus(req, res, db).catch(err => console.log(err));
        return;
    });
    // GET /user/:id
    app.get(`/${collection}/:id`, (req, res) => {
        menus_1.getDoc(req, res, db).catch(err => console.log(err));
        return;
    });
    // POST /user
    app.post(`/${collection}`, auth_1.checkIfAuthenticated, async (req, res) => {
        menus_1.createDoc(req, res, db).catch(err => console.log(err));
        return;
    });
    // PUT /user
    app.put(`/${collection}/:id`, auth_1.checkIfAuthenticated, (req, res) => {
        menus_1.updateDoc(req, res, db).catch(err => console.log(err));
        return;
    });
    // DELETE /user
    app.delete(`/${collection}/:id`, auth_1.checkIfAuthenticated, (req, res) => {
        menus_1.deleteDoc(req, res, db).catch(err => console.log(err));
        return;
    });
};
//# sourceMappingURL=menu.js.map