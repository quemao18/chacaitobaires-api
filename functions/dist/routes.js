"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
// import { requireAuth } from './helpers/auth';
exports.routes = (app, db) => {
    // GET /hello
    app.get('/', (req, res) => {
        res.send('Home API!');
        return;
    });
};
//# sourceMappingURL=routes.js.map