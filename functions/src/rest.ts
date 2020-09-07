import { Request, Response, NextFunction } from 'express';
import { routesUser } from './routes/user';
import { routesHome } from './routes/home';
import { routesMenu } from './routes/menu';
import { routesDish } from './routes/dish';
import { routesOrder } from './routes/order';
import { routesSetting } from './routes/setting';

export const rest = (db: FirebaseFirestore.Firestore): any => {

    const express = require('express');
    const bodyParser = require('body-parser');
    const bearerToken = require('express-bearer-token');
    const app: any = express();
    const API_PREFIX = 'api';
    const cors  = require('cors');

    // Strip API from the request URI
    app.use((req: Request, res: Response, next: NextFunction) => {
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
    routesHome(app, db);
    routesUser(app, db);
    routesMenu(app, db);
    routesDish(app, db);
    routesOrder(app, db);
    routesSetting(app, db);
    // Done! 
    return app;

};