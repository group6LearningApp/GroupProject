//REDUNDAND! THIS FORM HAS BEEN MOVED TO JAVA.JS, PYTHON.JS, CSHARP.JS FILE!!!
//AskQuestionForm.js
//Mariia Skyba
//This is an updated "Ask a Queston" form which gets called by "Ask a Question" button located on the Java Language main page
//This form is imported into Java.js file 

import React, { Component } from 'react';
import '../App.css';
import fire from '../config/Fire'; 

class AskQuestionForm extends Component{

  constructor() {
    super();
    this.state = {
      //class attributes (fields in the AskQuestionForm)
      title: "",
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

  //function to save input from "Ask a Question" Form into Firebase database
  submitQuestion = e => {
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
  };


  render(){
    return( 
    <React.Fragment>
   <div>
    {/* Ask Question Form */}
    <div className="wrapper1">
      <div className = "form-wrapper1">

        <h1>Ask a question</h1>
        <form onSubmit={this.submitQuestion}>

          {/* Title field */}
            <div className="title">
              <label htmlFor="title">Title</label>
              <input 
                type="text" 
                className="title" 
                placeholder="Title"
                onChange={this.updateInput} 
                name="title" 
                noValidate
              />
            </div>

            {/* Question content field */}
            <div className="content">
              <label htmlFor="content">Question</label>
              <textarea
                type="text" 
                className="content" 
                placeholder="Type your question here"
                value={this.state.content} 
                onChange={this.updateInput}
                name="content" 
                noValidate
              />
            </div>

            {/* Attachment field */}
            <div className="attachment">
              <label htmlFor="attachment">Upload a photo</label>
                <input 
                  id="uploadFile"
                  type="file" 
                  accept="image/*" 
                  noValidate
                />
            </div>

            {/* Submit a question button */}
            <button type="submit" className="create">ASK A QUESTION</button>          
          </form>
        </div>
      </div>
    </div>    
  
  </React.Fragment>
    
)
    }
  }   
export default AskQuestionForm;
