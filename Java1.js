//this modified Java.js file imports Ask Question form from a different file called "AskQuestion.js"

import React, { Component } from 'react';
import fire from '../config/Fire';
import AskQuestionForm from '../components/AskQuestionForm';
export default class Java extends Component {
  
  constructor() {
    super();
    this.state = {
      /*lastname: "",
      firstname: "",*/
      topic: "",
      tags: "",
      content:"",
      attachment: ""
    };
  }
  //?
  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  //Ben's code for adding new users?
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
    /*this.setState({
      fullname: "",
      email: ""
    });*/
  };

  //function to save input from "Ask a Question" Form in Firebase
  /*submitQuestion = e => {
    e.preventDefault();
    const db = fire.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    const userRef = db.collection("Questions").add({ //add to collection called "Questions"
      title: this.state.title, //store question title
      content: this.state.content, //store question content
      attachment: null //don't store anything in the attachment field yet as we don't know if storing images in Firebase is going to work
    });  
  }; */

  //function to save input from "PostResource" Form in Firebase
  submitPost = e => {
    e.preventDefault();
    const db = fire.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    const userRef = db.collection("posts").add({ //add to collection called "posts"
      topic: this.state.topic, //store post title
      tags: this.state.tags,
      content: this.state.content, //store post content
      attachment: "" //don't store anything in the attachment field yet as we don't know if storing images in Firebase is going to work
    });  
  }; 

  //function to call "Ask a Question" Form when the button is clicked
  /*showAskQuestionForm = e => {
    
  }; 

  //function to call "Post Resource" Form when the button is clicked
  showAskQuestionForm = e => {
    
  };*/
  //Add buttons "Ask Question" and "Post resource" to Java language section (do the same for other languages)
  render() {
    return (
      <div>

      <AskQuestionForm />



        <button class = "create" onclick = "this.showAskQuestionForm">Ask a question</button>
        <button class = "create" onclick = "this.showPostResourceForm">Post a resource</button>
      </div>
    );
  }
}
