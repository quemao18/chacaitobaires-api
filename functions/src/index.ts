import { RuntimeOptions, runWith } from 'firebase-functions';
import { rest } from './rest';
import { db } from './firebase'

// Initialize Rest API
const express = rest(db);
const settings: RuntimeOptions = {
    timeoutSeconds: 30,
    memory: '128MB'
};
export const api = runWith(settings).https.onRequest(express);