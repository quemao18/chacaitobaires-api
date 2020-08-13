"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUserAdmin = exports.checkIfAdmin = exports.checkIfAuthenticated = void 0;
const admin = require("firebase-admin");
const firebase_1 = require("../firebase");
const getAuthToken = (req, res, next) => {
    if (req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer') {
        req.authToken = req.headers.authorization.split(' ')[1];
    }
    else {
        req.authToken = null;
    }
    next();
};
exports.checkIfAuthenticated = (req, res, next) => {
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
        }
        catch (e) {
            return res
                .status(401)
                .send({ error: 'You are not authorized to make this request' });
        }
    });
};
exports.checkIfAdmin = (req, res, next) => {
    getAuthToken(req, res, async () => {
        try {
            const { authToken } = req;
            const userInfo = await admin
                .auth()
                .verifyIdToken(authToken);
            const docId = userInfo.email ? userInfo.email : '';
            const doc = await firebase_1.db.collection('users').doc(docId).get();
            if (!doc.exists) {
                return res.status(400).json({ error: 'Doc not exist' });
            }
            const data = doc.data();
            console.log(data);
            if (data.isAdmin === true) {
                next();
                return; // res.send({message: 'Success'})
            }
            throw new Error('not admin');
        }
        catch (e) {
            return res
                .status(402)
                .send({ error: 'You are not administrator to make this request' });
        }
    });
};
exports.makeUserAdmin = async (req, res) => {
    // const {userId} = req.body; // userId is the firebase uid for the user
    const docId = req.params.id;
    if (!docId) {
        return res.status(400).json({ error: 'ID required' });
    }
    const doc = await firebase_1.db.collection('users').doc(docId).get();
    if (!doc.exists) {
        return res.status(400).json({ error: 'Doc not exist' });
    }
    // await db.collection(collection).doc(docId).update(req.body, { merge: true });
    const ref = firebase_1.db.collection('users').doc(docId);
    await ref.update({ isAdmin: true });
    return res.send({ message: 'Success' });
};
//# sourceMappingURL=auth.js.map