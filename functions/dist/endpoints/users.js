"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDoc = exports.updateDoc = exports.createDoc = exports.getDoc = exports.getDocs = void 0;
const collection = 'users';
// GET /Users
exports.getDocs = async (res, db) => {
    try {
        const querySnapshot = await db.collection(collection).get();
        const docs = [];
        querySnapshot.forEach((doc) => {
            docs.push({
                id: doc.id,
                data: doc.data()
            });
        });
        res.json(docs);
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
        res.json({
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
        const email = req.body.email;
        await db.collection(collection).doc(email).set(req.body);
        const doc = await db.collection(collection).doc(email).get();
        res.json({
            id: email,
            data: doc.data()
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
        res.json({
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
        res.json({
            id: docId,
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
    return;
};
//# sourceMappingURL=users.js.map