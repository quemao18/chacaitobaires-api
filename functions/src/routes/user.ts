import { Request, Response, Router } from 'express';
import { checkIfAuthenticated, makeUserAdmin } from '../helpers/auth';
import { getDocs, getDoc, createDoc, updateDoc, deleteDoc } from '../endpoints/users';

const collection = 'users';

export const routesUser = (app: Router, db: FirebaseFirestore.Firestore) => {
  
    // GET /users
    app.get(`/${collection}`, checkIfAuthenticated, (req: Request, res: Response) => {
        getDocs(res, db).catch(err => console.log(err));
        return;
    });

    // GET /user/:id
    app.get(`/${collection}/:id`, (req: Request, res: Response) => {
        getDoc(req, res, db).catch(err => console.log(err));
        return;
    });

    // POST /user
    app.post(`/${collection}`, async (req: Request, res: Response) => {
        createDoc(req, res, db).catch(err => console.log(err));
        return;
    });

    // PUT /user
    app.put(`/${collection}/:id`, checkIfAuthenticated, (req: Request, res: Response) => {
        updateDoc(req, res, db).catch(err => console.log(err));
        return;
    });

    // DELETE /user
    app.delete(`/${collection}/:id`, checkIfAuthenticated, (req: Request, res: Response) => {
        deleteDoc(req, res, db).catch(err => console.log(err));
        return;
    });

    // set amin /user
    app.post(`/${collection}/admin/:id`, checkIfAuthenticated, (req: Request, res: Response) => {
        makeUserAdmin(req, res).catch(err => console.log(err));
        return;
    });
  
};