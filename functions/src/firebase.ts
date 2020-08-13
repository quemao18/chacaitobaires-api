import * as admin from 'firebase-admin';
import * as serviceAccountDev from "./credentials-dev.json";
import * as serviceAccountProd from "./credentials-prod.json";
import * as functions from 'firebase-functions';

const serviceAccount = functions.config().app.environment === 'dev' ?
serviceAccountDev : serviceAccountProd;

const databaseURL = functions.config().app.environment === 'dev' ?
"https://chacaitobaires-dev-api.firebaseio.com" : "https://chacaitobaires-api.firebaseio.com";

const params = {
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privateKeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.client_x509_cert_url
  }

// Initialize our project application
admin.initializeApp({
  credential: admin.credential.cert(params),
  databaseURL: databaseURL
});
// Set up database connection
const firestoreDb: FirebaseFirestore.Firestore = admin.firestore();
firestoreDb.settings({ timestampsInSnapshots: true });

// Export our references
export const db = firestoreDb;