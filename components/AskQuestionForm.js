import React, { Component } from 'react';
import '../App.css';
//login in -> authorise ->
class AskQuestionForm extends Component{
  render(){
    return( 
    <React.Fragment>
    
    <div className="wrapper1">
        <div className = "form-wrapper1">
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

            <button className="create">ASK A QUESTION</button>

            </form>
    </div>
  </div>
  
  </React.Fragment>
    
)
    }
  }   
export default AskQuestionForm;