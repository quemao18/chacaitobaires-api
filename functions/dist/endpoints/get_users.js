"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_users = void 0;
// GET /Users
exports.get_users = async (req, res, db) => {
    // res.send('Users there!');
    try {
        const querySnapshot = await db.collection('users').get();
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
//# sourceMappingURL=get_users.js.map