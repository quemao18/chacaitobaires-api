"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const firebase_functions_1 = require("firebase-functions");
const rest_1 = require("./rest");
const firebase_1 = require("./firebase");
// Initialize Rest API
const express = rest_1.rest(firebase_1.db);
const settings = {
    timeoutSeconds: 60,
    memory: '512MB'
};
exports.api = firebase_functions_1.runWith(settings).https.onRequest(express);
//# sourceMappingURL=index.js.map