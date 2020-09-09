import { Request, Response, Router } from 'express';
import { getDocs, getDoc, createDoc, updateDoc, deleteDoc, getDocsByStatus, getDocsByOrderId, getDocsByTableId, sendFCM } from '../endpoints/orders';
import { sendWa } from '../helpers/notification';

const collection = 'orders';

export const routesOrder = (app: Router, db: FirebaseFirestore.Firestore) => {
  
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

    app.get(`/${collection}/orderId/:id`, (req: Request, res: Response) => {
        getDocsByOrderId(req, res, db).catch(err => console.log(err));
        return;
    });

    app.get(`/${collection}/tableId/:tableId`, (req: Request, res: Response) => {
        getDocsByTableId(req, res, db).catch(err => console.log(err));
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
    app.put(`/${collection}/:id`, (req: Request, res: Response) => {
        updateDoc(req, res, db).catch(err => console.log(err));
        return;
    });

    // DELETE /user
    app.delete(`/${collection}/:id`, (req: Request, res: Response) => {
        deleteDoc(req, res, db).catch(err => console.log(err));
        return;
    });

    //send whatsapp msg
    app.post(`/${collection}/sendWa`, (req: Request, res: Response) => {
        sendWa(req, res, db).catch(err => console.log(err));
        return;
    });

    //send whatsapp msg
    app.post(`/${collection}/sendFCM`, (req: Request, res: Response) => {
        sendFCM(req, res, db).catch(err => console.log(err));
        return;
    });
};