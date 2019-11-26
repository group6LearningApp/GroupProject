import React, { Component } from 'react';
import fire from '../config/Fire';
export default class Java extends Component {
    constructor() {
        super();
        this.state = {
         lastname: "",
         firstname: ""
        };
    }
    
    updateInput = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
    }

    addUser = e => {
        e.preventDefault();
        const db = fire.firestore();
        db.settings({
        timestampsInSnapshots: true
        });
        const userRef = db.collection("users").add({
        firstname: this.state.firstname,
        lastname: this.state.lastname
        });  
        this.setState({
          fullname: "",
          email: ""
        });
      };


    render() {
        return (
        <div>
            <form onSubmit={this.addUser}>
                <input
                type="text"
                name="firstname"
                placeholder="First name"
                onChange={this.updateInput}
                value={this.state.firstname}
                />
                <input
                type=""
                name="lastname"
                placeholder="Last name"
                onChange={this.updateInput}
                value={this.state.lastname}
                />
                <button type="submit">Submit</button>
          </form>
          <p>{this.state.firstname}</p>

        
        </div>
          
          
        );
    }
    }

