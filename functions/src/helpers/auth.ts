import { Response, NextFunction } from 'express';
import admin = require('firebase-admin');
import { db } from '../firebase';

    const getAuthToken = (req: any, res: Response, next: NextFunction) => {
        if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
        ) {
        req.authToken = req.headers.authorization.split(' ')[1];
        } else {
        req.authToken = null;
        }
        next();
    };
  
  
    export const checkIfAuthenticated = (req: any, res: Response, next: NextFunction) => {
    getAuthToken(req, res, async () => {
        try {
        const { authToken } = req;
        const userInfo = await admin
            .auth()
            .verifyIdToken(authToken);
        req.authId = userInfo.uid;
        next();
        return;
        // return res.send({message: 'Success'})
        } catch (e) {
        return res
            .status(401)
            .send({ error: 'You are not authorized to make this request' });
        }
    });
    };

    export const checkIfAdmin = (req: any, res: Response, next: NextFunction) => {
        getAuthToken(req, res, async () => {
           try {
            const { authToken } = req;
            const userInfo = await admin
            .auth()
            .verifyIdToken(authToken);
            const docId = userInfo.email ? userInfo.email : '';
            const doc = await db.collection('users').doc(docId).get();

            if (!doc.exists){
                return res.status(400).json({ error: 'Doc not exist' });
            }

            const data:any = doc.data();
            console.log(data);
             if (data.isAdmin === true) {
                next();
                return;// res.send({message: 'Success'})
             }

             throw new Error('not admin')
           } catch (e) {
             return res
               .status(402)
               .send({ error: 'You are not administrator to make this request' });
           }
         });
       };

       export const makeUserAdmin = async (req: any, res: Response) => {
        // const {userId} = req.body; // userId is the firebase uid for the user
        const docId = req.params.id;

        if (!docId){
            return res.status(400).json({ error: 'ID required' });
        }
        const doc = await db.collection('users').doc(docId).get();
        if (!doc.exists){
            return res.status(400).json({ error: 'Doc not exist' });
        }
        // await db.collection(collection).doc(docId).update(req.body, { merge: true });
        const ref = db.collection('users').doc(docId);
        await ref.update({isAdmin: true});
      
        return res.send({message: 'Success'})
      }