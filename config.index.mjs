import { mkdir, writeFile } from 'fs';

const targetPath = './src/environments/'
const targetFile = 'environment.prod.ts';

const envConfigFile = `export const environment = {
   production: true,
   firebaseConfig: {
        apiKey: '${process.env.FIREBASE_API_KEY}',
        authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
        databaseURL: '${process.env.FIREBASE_DATABASE_URL}',
        projectId: '${process.env.FIREBASE_PROJECT_ID}',
        storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
        messagingSenderId: '${process.env.FIREBASE_MESSAGE_SENDER_ID}',
        appId: '${process.env.FIREBASE_APP_ID}',
        measurementId: '${process.env.FIREBASE_MEASUREMENT_ID}',
    }
};
`;

mkdir(targetPath, (err) => {
  if (err) {
    return console.log(err);
  }
  writeFile(targetPath+targetFile, envConfigFile, 'utf8', (err) => {
    if (err) {
      return console.log(err);
    }
    console.log(`Environment file written to ${targetPath}${targetFile}`)
  });
})