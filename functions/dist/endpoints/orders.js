"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDoc = exports.updateDoc = exports.createDoc = exports.getDoc = exports.getDocs = exports.getDocsByOrderId = exports.getDocsByStatus = void 0;
const collection = 'orders';
exports.getDocsByStatus = async (req, res, db) => {
    try {
        const status = req.params.status;
        const querySnapshot = await db.collection(collection)
            .where('status', '==', status)
            .orderBy('date', 'desc')
            .get();
        const docs = [];
        querySnapshot.forEach((doc) => {
            docs.push({
                id: doc.id,
                // data: doc.data(),
                status: doc.data().status,
                items: doc.data()
            });
        });
        res.send(docs);
    }
    catch (error) {
        res.status(500).send(error);
    }
    return;
};
exports.getDocsByOrderId = async (req, res, db) => {
    try {
        const orderId = req.params.id;
        const querySnapshot = await db.collection(collection)
            .where('orderId', '==', orderId)
            .orderBy('date', 'desc')
            .get();
        const docs = [];
        querySnapshot.forEach((doc) => {
            docs.push({
                id: doc.id,
                data: doc.data()
            });
        });
        res.send(docs);
    }
    catch (error) {
        res.status(500).send(error);
    }
    return;
};
exports.getDocs = async (res, db) => {
    try {
        const querySnapshot = await db.collection(collection)
            .orderBy('date', 'desc')
            .get();
        const docs = [];
        querySnapshot.forEach((doc) => {
            const sum = doc.data().items.reduce(function (total, currentValue) {
                return currentValue.data.price ? total + currentValue.data.price * currentValue.qty : 0;
            }, 0);
            docs.push({
                id: doc.id,
                data: doc.data(),
                total: sum
            });
        });
        res.send(docs);
    }
    catch (error) {
        res.status(500).send(error);
    }
    return;
};
exports.getDoc = async (req, res, db) => {
    try {
        const docId = req.params.id;
        if (!docId) {
            return res.status(400).json({ error: 'ID required' });
        }
        const doc = await db.collection(collection).doc(docId).get();
        if (!doc.exists) {
            return res.status(400).json({ error: 'Doc not exist' });
        }
        res.send({
            id: doc.id,
            data: doc.data()
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
    return;
};
exports.createDoc = async (req, res, db) => {
    try {
        const ref = await db.collection(collection).add(req.body);
        res.send({
            id: ref.id,
            data: req.body
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
    return;
};
exports.updateDoc = async (req, res, db) => {
    try {
        const docId = req.params.id;
        if (!docId) {
            return res.status(400).json({ error: 'ID required' });
        }
        const doc = await db.collection(collection).doc(docId).get();
        if (!doc.exists) {
            return res.status(400).json({ error: 'Doc not exist' });
        }
        // await db.collection(collection).doc(docId).update(req.body, { merge: true });
        const ref = db.collection(collection).doc(docId);
        await ref.update(req.body);
        res.send({
            id: docId,
            data: (await ref.get()).data()
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
    return;
};
exports.deleteDoc = async (req, res, db) => {
    try {
        const docId = req.params.id;
        if (!docId) {
            return res.status(400).json({ error: 'ID required' });
        }
        const doc = await db.collection(collection).doc(docId).get();
        if (!doc.exists) {
            return res.status(400).json({ error: 'Doc not exist' });
        }
        await db.collection(collection).doc(docId).delete();
        res.send({
            id: docId,
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
    return;
};
//# sourceMappingURL=orders.js.map