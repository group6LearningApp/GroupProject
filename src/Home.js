import React, { Component } from 'react'
import TopPosts from './components/TopPosts';
import { LanguageDrop } from './components/LanguageDrop';
import SearchBar from './components/SearchBar'
import fire from './config/Fire';
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            user:{},
            email:'',
            users: {},
            key: ''
        }
    }
    componentDidMount() {
        fire.auth().onAuthStateChanged((user) => {
          if(user) {
            this.setState({ user });
        var ref = fire.firestore().collection('users').doc(this.state.user.uid);
        ref.get().then((doc) => {
          if(doc.exists) {
            console.log(doc.data());
            this.setState({
              
              users: doc.data(),
              key: doc.id
              
            })
          }
        })
      }
      }); 
      }
      
    render() {     
        return (
        this.state.user ? (
          <div>
          <SearchBar />
          <h1>Hello {this.state.users.firstname} {this.state.users.lastname}</h1>
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
