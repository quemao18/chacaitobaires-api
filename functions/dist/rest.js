"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rest = void 0;
const user_1 = require("./routes/user");
const home_1 = require("./routes/home");
const menu_1 = require("./routes/menu");
const dish_1 = require("./routes/dish");
const order_1 = require("./routes/order");
exports.rest = (db) => {
    const express = require('express');
    const bodyParser = require('body-parser');
    const bearerToken = require('express-bearer-token');
    const app = express();
    const API_PREFIX = 'api';
    const cors = require('cors');
    // Strip API from the request URI
    app.use((req, res, next) => {
        if (req.url.indexOf(`/${API_PREFIX}/`) === 0) {
            req.url = req.url.substring(API_PREFIX.length + 1);
        }
        next();
    });
    //cors 
    app.use(cors());
    // Parse bearer token
    app.use(bearerToken());
    // Parse Query String
    app.use(bodyParser.urlencoded({ extended: false }));
    // Parse posted JSON body
    app.use(bodyParser.json());
    // Handle API endpoint routes
    home_1.routesHome(app, db);
    user_1.routesUser(app, db);
    menu_1.routesMenu(app, db);
    dish_1.routesDish(app, db);
    order_1.routesOrder(app, db);
    // Done! 
    return app;
};
//# sourceMappingURL=rest.js.map