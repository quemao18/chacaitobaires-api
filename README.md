# chacaitobaires-api
API REST with firestores, in nodejs with express, cloud functions

## create credentials-dev.json and credentials-prod.json
## download file in project config of firebase

{
  "type": "service_account",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-hn8hj%40chacaitobaires-dev-api.iam.gserviceaccount.com"
}


## RUN

`npm run serve`

## Build in firebase
`npm run build-fire-dev`
`npm run build-fire-prod`