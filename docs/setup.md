# Initial Setup


## Frontend
- Generate the app:
  - `npx create-react-app <APP-NAME> --template typescript`
- install firebase tools
  -`npm install -D firebase-tools`
- login to firebase
  - `npx firebase login`
- init the functions
  - `npx firebase init functions`
* (You'll probably need to make and connect a firebase project to a GCP project for this)
  - `npx firebase init hosting`
- To deploy:
  - `npx firebase deploy`