import firebase from 'firebase';



var firebaseConfig = {
  apiKey: "AIzaSyBg1Y49CWrE0M9jO3brU9XDSqe54OF75Dk",
    authDomain: "benstest-fc98a.firebaseapp.com",
    databaseURL: "https://benstest-fc98a.firebaseio.com",
    projectId: "benstest-fc98a",
    storageBucket: "benstest-fc98a.appspot.com",
    messagingSenderId: "127013225279",
    appId: "1:127013225279:web:e71561e272cd7c4381c98a",
    measurementId: "G-73SPTRE8PP"


  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  export default fire;
 
