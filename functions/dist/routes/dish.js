"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesDish = void 0;
const auth_1 = require("../helpers/auth");
const dishes_1 = require("../endpoints/dishes");
const collection = 'dishes';
exports.routesDish = (app, db) => {
    // GET /users
    app.get(`/${collection}`, (req, res) => {
        dishes_1.getDocs(res, db).catch(err => console.log(err));
        return;
    });
    // GET /users
    app.get(`/${collection}/status/:status`, (req, res) => {
        dishes_1.getDocsByStatus(req, res, db).catch(err => console.log(err));
        return;
    });
    // GET /users
    app.get(`/${collection}/menuId/:id`, (req, res) => {
        dishes_1.getDocsByMenuId(req, res, db).catch(err => console.log(err));
        return;
    });
    // GET /user/:id
    app.get(`/${collection}/:id`, (req, res) => {
        dishes_1.getDoc(req, res, db).catch(err => console.log(err));
        return;
    });
    // POST /user
    app.post(`/${collection}`, auth_1.checkIfAuthenticated, async (req, res) => {
        dishes_1.createDoc(req, res, db).catch(err => console.log(err));
        return;
    });
    // PUT /user
    app.put(`/${collection}/:id`, auth_1.checkIfAuthenticated, (req, res) => {
        dishes_1.updateDoc(req, res, db).catch(err => console.log(err));
        return;
    });
    // DELETE /user
    app.delete(`/${collection}/:id`, auth_1.checkIfAuthenticated, (req, res) => {
        dishes_1.deleteDoc(req, res, db).catch(err => console.log(err));
        return;
    });
};
//# sourceMappingURL=dish.js.map