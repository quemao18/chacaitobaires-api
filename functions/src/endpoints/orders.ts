import { Request, Response } from 'express';
// import { sendFCM } from '../helpers/notification';

const collection = 'orders';

export const getDocsByStatus = async (req: Request, res: Response, db: FirebaseFirestore.Firestore) => {
  try {
      const status = req.params.status;
      const querySnapshot = await db.collection(collection)
      .where('status', '==', status)
      .orderBy('date', 'desc')
      .get();
      const docs: any = [];
      querySnapshot.forEach(
          (doc) => {
              docs.push({
                  id: doc.id,
                  // data: doc.data(),
                  status: doc.data().status,
                  items: doc.data()
              });
          }
      );
      res.send(docs);
    } catch(error){
      res.status(500).send(error);
    }
  return;
};

export const getDocsByOrderId = async (req: Request, res: Response, db: FirebaseFirestore.Firestore) => {
  try {
      const orderId = req.params.id;
      const querySnapshot = await db.collection(collection)
      .where('orderId', '==', orderId)
      .orderBy('date', 'desc')
      .get();
      const docs: any = [];
      querySnapshot.forEach(
          (doc) => {
              docs.push({
                  id: doc.id,
                  data: doc.data()
              });
          }
      );
      res.send(docs);
    } catch(error){
      res.status(500).send(error);
    }
  return;
};

export const getDocsByTable = async (req: Request, res: Response, db: FirebaseFirestore.Firestore) => {
  try {
      const table = req.params.table;
      const querySnapshot = await db.collection(collection)
      .where('table', '==', parseInt(table))
      .where('status', '==', 'Readed')
      .orderBy('date', 'desc')
      .get();
      const docs: any = [];
      querySnapshot.forEach(
          (doc) => {
              docs.push({
                  id: doc.id,
                  data: doc.data()
              });
          }
      );
      res.send(docs);
    } catch(error){
      res.status(500).send(error);
    }
  return;
};

export const getDocs = async (res: Response, db: FirebaseFirestore.Firestore) => {
  try {
      const querySnapshot = await db.collection(collection)
      .orderBy('date', 'desc')
      .get();
      const docs: any = [];
      querySnapshot.forEach(
          (doc) => {
            const sum = doc.data().items.reduce(function (total: any, currentValue: { qty: number, data: { price: any; }; }) {
              return currentValue.data.price ? total + currentValue.data.price * currentValue.qty : 0;
            }, 0);
            docs.push({
                id: doc.id,
                data: doc.data(),
                total: sum
            });
          }
      );
      res.send(docs);
    } catch(error){
      res.status(500).send(error);
    }
  return;
};

export const getDoc = async (req: Request, res: Response, db: FirebaseFirestore.Firestore) => {
  try {
      const docId = req.params.id;
      if (!docId){
        return res.status(400).json({ error: 'ID required' });
      }
      const doc = await db.collection(collection).doc(docId).get();
      if (!doc.exists){
        return res.status(400).json({ error: 'Doc not exist' });  
      }
      res.send({
        id: doc.id,
        data: doc.data()
      });
    } catch(error){
      res.status(500).send(error);
    }
  return;
};

export const createDoc = async (req: Request, res: Response, db: FirebaseFirestore.Firestore) => {
  try {
      const ref = await db.collection(collection).add(req.body);
      // const querySnapshot = await db.collection('users').get();
      // querySnapshot.forEach(
      //     (doc) => {
      //       if(doc.data().tokenFCM)
      //       sendFCM('New Order', req.body.orderId, doc.data().tokenFCM, res);
      //     }
      // );
      res.send({
        id: ref.id,
        data: req.body
      });
    } catch(error){
      res.status(500).send(error);
    }
  return;
};

export const updateDoc = async (req: Request, res: Response, db: FirebaseFirestore.Firestore) => {
  try {
      const docId = req.params.id;
      if (!docId){
        return res.status(400).json({ error: 'ID required' });
      }
      const doc = await db.collection(collection).doc(docId).get();
      if (!doc.exists){
        return res.status(400).json({ error: 'Doc not exist' });
      }
      // await db.collection(collection).doc(docId).update(req.body, { merge: true });
      const ref = db.collection(collection).doc(docId);
      await ref.update(req.body);
      res.send({
        id: docId,
        data: (await ref.get()).data()
      });
    } catch(error){
      res.status(500).send(error);
    }
  return;
};

export const deleteDoc = async (req: Request, res: Response, db: FirebaseFirestore.Firestore) => {
  try {
      const docId = req.params.id;
      if (!docId){
        return res.status(400).json({ error: 'ID required' });
      }
      const doc = await db.collection(collection).doc(docId).get();
      if (!doc.exists){
        return res.status(400).json({ error: 'Doc not exist' });
      }
      await db.collection(collection).doc(docId).delete();
      res.send({
        id: docId,
      });
    } catch(error){
      res.status(500).send(error);
    }
  return;
};


