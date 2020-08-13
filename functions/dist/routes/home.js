"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesHome = void 0;
// import { requireAuth } from './helpers/auth';
exports.routesHome = (app, db) => {
    // GET /hello
    app.get('/', (req, res) => {
        res.send('Home API!');
        return;
    });
};
//# sourceMappingURL=home.js.map