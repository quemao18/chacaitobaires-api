import { Request, Response, Router } from 'express';

// import { requireAuth } from './helpers/auth';

export const routesHome = (app: Router, db: FirebaseFirestore.Firestore) => {
  
    // GET /hello
    app.get('/', (req: Request, res: Response) => {
        res.send('Home API!');
        return;
    });
  
};