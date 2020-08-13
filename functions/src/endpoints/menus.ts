import { Request, Response } from 'express';

const collection = 'menus';

// GET /Users
export const getDocsByStatus = async (req: Request, res: Response, db: FirebaseFirestore.Firestore) => {
  try {
      const status = req.params.status === 'true' ? true : false;
      const querySnapshot = await db.collection(collection)
      .where('status', '==', status)
      .orderBy('order', 'asc')
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
      .orderBy('order', 'asc')
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