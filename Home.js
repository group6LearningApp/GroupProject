import React, { Component } from 'react'
import  TopPosts from './TopPosts';
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
           
          } 
        });
      }

      

    render() {
        return (
    <div>
      
        
        <h1>Hi {this.state.user.email}</h1>
        <h2>Learning App</h2>
        <p>Please select language of choice</p>
        <LanguageDrop />
        <TopPosts />    
    </div>
        );
    } 
}

export default Home;
