import firebase from 'firebase';



const firebaseConfig = {
  apiKey: "AIzaSyB3lPsP7OcWw8t1IgAEAizXYSvIU_W0BaA",
  authDomain: "learningapp-dce88.firebaseapp.com",
  databaseURL: "https://learningapp-dce88.firebaseio.com",
  projectId: "learningapp-dce88",
  storageBucket: "learningapp-dce88.appspot.com",
  messagingSenderId: "265370756402",
  appId: "1:265370756402:web:1170b2d0e9cf8cc785a32b",
  measurementId: "G-S3Q5SDEKZN"
};
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  // firebase.analytics();
  // export default fire;
  export const auth = firebase.auth()
  export const db = firebase.firestore()
  

  export default firebase