// import * as functions from "firebase-functions";
// import * as admin from 'firebase-admin';

// admin.initializeApp();
// const afs = admin.firestore()

// export const triggerApplicationEmail = functions.firestore
//     .document(`/applications/{id}/`)
//     .onCreate(async (snapshot, context) => {
//         try {
//             const data = snapshot.data()
//             console.log(data)
//             afs.collection('mail').add({
//                 template: {
//                     name: 'newApplicant',
//                     data
//                 }
//             })
//         }
//         catch (err) {
//             return err
//         }
//     })

// BarbershopDenim@gmail.com