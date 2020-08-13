import { RuntimeOptions, runWith } from 'firebase-functions';
import { rest } from './rest';
import { db } from './firebase'

// Initialize Rest API
const express = rest(db);
const settings: RuntimeOptions = {
    timeoutSeconds: 60,
    memory: '512MB'
};
export const api = runWith(settings).https.onRequest(express);