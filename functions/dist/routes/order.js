"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesOrder = void 0;
const auth_1 = require("../helpers/auth");
const orders_1 = require("../endpoints/orders");
const collection = 'orders';
exports.routesOrder = (app, db) => {
    // GET /users
    app.get(`/${collection}`, (req, res) => {
        orders_1.getDocs(res, db).catch(err => console.log(err));
        return;
    });
    // GET /users
    app.get(`/${collection}/status/:status`, (req, res) => {
        orders_1.getDocsByStatus(req, res, db).catch(err => console.log(err));
        return;
    });
    app.get(`/${collection}/orderId/:id`, (req, res) => {
        orders_1.getDocsByOrderId(req, res, db).catch(err => console.log(err));
        return;
    });
    // GET /user/:id
    app.get(`/${collection}/:id`, (req, res) => {
        orders_1.getDoc(req, res, db).catch(err => console.log(err));
        return;
    });
    // POST /user
    app.post(`/${collection}`, async (req, res) => {
        orders_1.createDoc(req, res, db).catch(err => console.log(err));
        return;
    });
    // PUT /user
    app.put(`/${collection}/:id`, (req, res) => {
        orders_1.updateDoc(req, res, db).catch(err => console.log(err));
        return;
    });
    // DELETE /user
    app.delete(`/${collection}/:id`, auth_1.checkIfAuthenticated, auth_1.checkIfAdmin, (req, res) => {
        orders_1.deleteDoc(req, res, db).catch(err => console.log(err));
        return;
    });
};
//# sourceMappingURL=order.js.map