import { Request, Response, Router } from 'express';
import { checkIfAuthenticated } from '../helpers/auth';
import { getDocs, getDoc, createDoc, updateDoc, deleteDoc, getDocsByStatus, getDocsByMenuId } from '../endpoints/dishes';

const collection = 'dishes';

export const routesDish = (app: Router, db: FirebaseFirestore.Firestore) => {
  
    // GET /users
    app.get(`/${collection}`, (req: Request, res: Response) => {
        getDocs(res, db).catch(err => console.log(err));
        return;
    });

    // GET /users
    app.get(`/${collection}/status/:status`, (req: Request, res: Response) => {
        getDocsByStatus(req, res, db).catch(err => console.log(err));
        return;
    });

    // GET /users
    app.get(`/${collection}/menuId/:id`, (req: Request, res: Response) => {
        getDocsByMenuId(req, res, db).catch(err => console.log(err));
        return;
    });

    // GET /user/:id
    app.get(`/${collection}/:id`, (req: Request, res: Response) => {
        getDoc(req, res, db).catch(err => console.log(err));
        return;
    });

    // POST /user
    app.post(`/${collection}`, checkIfAuthenticated, (req: Request, res: Response) => {
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
  
};