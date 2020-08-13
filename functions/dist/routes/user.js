"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesUser = void 0;
const auth_1 = require("../helpers/auth");
const users_1 = require("../endpoints/users");
const collection = 'users';
exports.routesUser = (app, db) => {
    // GET /users
    app.get(`/${collection}`, auth_1.checkIfAuthenticated, (req, res) => {
        users_1.getDocs(res, db).catch(err => console.log(err));
        return;
    });
    // GET /user/:id
    app.get(`/${collection}/:id`, (req, res) => {
        users_1.getDoc(req, res, db).catch(err => console.log(err));
        return;
    });
    // POST /user
    app.post(`/${collection}`, async (req, res) => {
        users_1.createDoc(req, res, db).catch(err => console.log(err));
        return;
    });
    // PUT /user
    app.put(`/${collection}/:id`, auth_1.checkIfAuthenticated, (req, res) => {
        users_1.updateDoc(req, res, db).catch(err => console.log(err));
        return;
    });
    // DELETE /user
    app.delete(`/${collection}/:id`, auth_1.checkIfAuthenticated, (req, res) => {
        users_1.deleteDoc(req, res, db).catch(err => console.log(err));
        return;
    });
    // set amin /user
    app.post(`/${collection}/admin/:id`, auth_1.checkIfAuthenticated, (req, res) => {
        auth_1.makeUserAdmin(req, res).catch(err => console.log(err));
        return;
    });
};
//# sourceMappingURL=user.js.map