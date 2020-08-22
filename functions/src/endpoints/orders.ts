import { Request, Response } from 'express';
import  * as https from 'https';
// import * as twilio from 'twilio';
import { authToken, accountSid, waFrom, waTo, apiKeyWaFree } from '../credentials-dev.json';

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

//use twilio for send
export const sendWa = async (req: Request, res: Response, db: FirebaseFirestore.Firestore) => {
  try {
      const client = require('twilio')(accountSid, authToken);
      const orderId = req.params.id;
      if (!orderId){
        return res.status(400).json({ error: 'ID required' });
      }
      const querySnapshot = await db.collection(collection)
      .where('orderId', '==', orderId)
      .orderBy('date', 'desc')
      .get();
      const docs: any = [];
      // let msg: string = '';
      querySnapshot.forEach(
          (doc) => {
              docs.push({
                  id: doc.id,
                  data: doc.data()
              });
          }
      );
      let msg = '';
      Promise.all(docs.map(async (doc:any) => {
      msg = `-- Pedido realizado --\nOrden: ${orderId}\n`;
        doc.data.items.forEach(async(element: any) => {
            await db.collection('menus').doc(element.data.menuId).get().then((menu:any) => {
              const name = menu.data().name.es;
              msg += `${element.qty} x ${name} - ${element.data.name.es}\n`;
              return msg;
            });
          });
      })).then(()=>{
        setTimeout(() => {          
        client.messages.create({
          from: 'whatsapp:' + waFrom,
          body: msg,
          to: 'whatsapp:' + waTo
        }).then((message: { sid: any; }) => 
        {
          console.log(msg);
          res.send(message.sid);
        });
        }, 1000);

      }).catch((error) =>
         res.status(500).send(error)
      );

    } catch(error){
      res.status(500).send(error);
    }
  return;
};

export const sendWa2 = async (req: Request, res: Response, db: FirebaseFirestore.Firestore) => {
  try{
    const orderId = req.params.id;
    if (!orderId){
      return res.status(400).json({ error: 'ID required' });
    }
    const querySnapshot = await db.collection(collection)
    .where('orderId', '==', orderId)
    .orderBy('date', 'desc')
    .get();
    const docs: any = [];
    // let msg: string = '';
    querySnapshot.forEach(
        (doc) => {
            docs.push({
                id: doc.id,
                data: doc.data()
            });
        }
    );
    let msg = '';
    Promise.all(docs.map(async (doc:any) => {
      msg = `-- Pedido realizado --%0AOrden: ${orderId}%0A`;
        doc.data.items.forEach(async(element: any) => {
            await db.collection('menus').doc(element.data.menuId).get().then((menu:any) => {
              const name = menu.data().name.es;
              msg += `${element.qty} x ${name} - ${element.data.name.es}%0A`;
              // return msg;
            });
          });
      })).then(()=>{
          setTimeout(() => {
            https.get(`https://api.callmebot.com/whatsapp.php?phone=+${waTo}&text=${msg}&apikey=${apiKeyWaFree}`, (resp) => {
              let data = '';
              // A chunk of data has been recieved.
              resp.on('data', (chunk) => {
                data += chunk;
              });
              // The whole response has been received. Print out the result.
              resp.on('end', () => {
                res.send({
                  status: "ok",
                  data: data
                });
                // res.send(data);
                // console.log(JSON.parse(data).explanation);
              });
            }).on("error", (err) => {
              console.log("Error: " + err.message);
            });
        }, 1000);
      }).catch((error) =>
      res.status(500).send(error)
    );

  } catch(error){
    res.status(500).send(error);
  }
  return

}

