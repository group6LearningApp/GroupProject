import React, { Component } from 'react'
import { TopPosts } from './components/TopPosts';
import { LanguageDrop } from './components/LanguageDrop';
import fire from './config/Fire';
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            user:{},
            email:''
        }
    }
   

    logout() {
        fire.auth().signOut();
    }

    componentDidMount() {
        this.authListener();
      }
      

      authListener() {
        fire.auth().onAuthStateChanged((user) => {
          console.log(user);
          if(user) {
            this.setState({ user });
            const db = fire.firestore();
            db.collection('users').doc(user.uid).get().then(doc => {
              var firstname = doc.data().firstname;
              console.log(firstname);
            }) 
          } 
        });
      }
      
    render() {
        return (
        this.state.user ? (
          <div>
          <h1>Hello  </h1>
          <h2>Learning App</h2>
          <p>Please select language of choice</p>
          <LanguageDrop />
          <TopPosts /> 
          </div>   
          ) : (
          <div>
          <h1>Hi Uregistered User! If you wan to write posts please create an account or login.</h1>
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
