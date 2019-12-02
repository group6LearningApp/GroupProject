import React, { Component } from 'react'
import { TopPosts } from './components/TopPosts';
import { LanguageDrop } from './components/LanguageDrop';
import fire from './config/Fire';
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            user:{},
            email:'',
        }
    }
    componentDidMount() {
        this.authListener();
      }
      

      authListener() {
        fire.auth().onAuthStateChanged((user) => {
          //console.log(user);
          if(user) {
            this.setState({ user });
            const db = fire.firestore();
            var docRef = db.collection('users').doc(this.state.user.uid);

            docRef.get().then(function(doc) {
              if (doc.exists) {
                  console.log("Document data:", doc.data());
              } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
              }
          }).catch(function(error) {
              console.log("Error getting document:", error);
          });
          } 
        });
      }
      
    render() {     
        return (
        this.state.user ? (
          <div>
          <h1>Hello </h1>
          <h2>Learning App</h2>
          <p>Please select language of choice</p>
          <LanguageDrop />
          <TopPosts /> 
          </div>   
          ) : (
          <div>
          <h1>Hi Uregistered User! If you want to write posts please create an account or login.</h1>
          <h2>Learning App</h2>
          <p>Please select language of choice</p>
          <LanguageDrop />
          <TopPosts />
          </div>
          )
    
        );
    } 
}

export default Home;
