//This version of Ben's Java.js file contains an Ask a Question Form
//appearing when you click onto "Java" topic in the dropdown menu

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

      showAQForm = e => {
        var state = document.getElementById("AQForm").style.display;
        if(state != "none"){
          document.getElementById("AQForm").style.display = "none";
        }
        else{
          document.getElementById("AQForm").style.display = "block";
        }
      }

    render() {
        return (
        <div>
            {/* <form onSubmit={this.addUser}>
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
          </form> */}
          <div className="wrapper1">
        <div id = "AQForm" className = "form-wrapper1" display = "none">
        {/* Title field */}
        <h1>Ask a question</h1>
        <form onSubmit={this.handleSubmit} noValidate>
            <div className="title">
                <label htmlFor="title">Title</label>
                <input 
                type="text" 
                className="title" 
                placeholder="Title" 
                name="title" 
                noValidate
                onChange={this.handleChange}
                />
            </div>
            {/* Question body field */}
            <div className="qBody">
                <label htmlFor="qBody">Question</label>
                <input 
                type="text" 
                className="qBody" 
                placeholder="Type your question here" 
                name="qBody" 
                noValidate
                onChange={this.handleChange}
                />
            </div>
            {/* Attachment/upload a photo field */}
            <div className="attachment">
                <label htmlFor="attachment">Upload a photo</label>
                <input 
                    id="uploadFile"
                    type="file" 
                    accept="image/*" 
                    noValidate
                    onChange={this.handleChange}
                />
            </div>
            {/* Submit a question button */}
            <button className="create">ASK A QUESTION</button>

            </form>
    </div>
  </div>
          <p>{this.state.firstname}</p>
          <button class = "create" onclick = 'showAQForm()'>Ask a question</button>
        
        </div>
          
          
        );
    }
    }
