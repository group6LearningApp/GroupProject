//Java.js file
//Mariia Skyba
/*
After selecting a Java language from the fropdown menu - a general information about the language selected
is displayed with two buttons underneath it which when clicked - call "Ask a Question" Form and "Post Resource" Form respectively
appearing when you click onto "Java" topic in the dropdown menu. 
If you fill in the fields in any of the two forms and submit data it will be stored in Firebase 
*/
import React, { Component } from 'react';
//import PostResourceForm from '../components/PostResourceForm';
import fire from '../config/Fire';

export default class Java extends Component {
  constructor() {
    super();

    this.toggleAQF = this.toggleAQF.bind(this); //include this line for a function to work(?)
    this.togglePRF = this.togglePRF.bind(this); //include this line for a function to work(?)

    this.state = {
      AQFon: false, //Question Form visibility (initially hidden)
      PRFon: false, //Post Form visibility (initially hidden)
      JavaLangDescr: true, //Language Description visibility (initially visible)
      

      //fields in ask question form:
      language: "",
      title: "",
      content:"",
      qAttachment: "",
      //fields in post resource form:
      topic: "",
      tags: "",
      description:"",//was: content
      pAttachment: "" //was: attachment, leave for now

    }
  }

  //this function toggles the visibility of Ask Question Form
  toggleAQF =() => { 
    if(this.state.JavaLangDescr && !this.state.AQFon && !this.state.PRFon){
      this.setState({
        JavaLangDescr: false,
        AQFon: true, //show question form
        PRFon:false
      })
    } 
    else if(!this.state.JavaLangDescr && this.state.AQFon && !this.state.PRFon){
      this.setState({
        JavaLangDescr: true,
        AQFon: false,
        PRFon: false
      })
    }

    else if(!this.state.JavaLangDescr && !this.state.AQFon && this.state.PRFon){
      this.setState({
        JavaLangDescr: false,
        AQFon: true,
        PRFon: false
      })
    }
    else{
      this.setState({
        JavaLangDescr: false,
        PRFon: true,
        AQFon: false
      })
    }
  }

  //this function toggles the visibility of the Post Resource Form
  togglePRF =() => {

    if(this.state.JavaLangDescr && !this.state.AQFon && !this.state.PRFon){
      this.setState({
        JavaLangDescr: false,
        PRFon: true
      })
    } 
    else if(!this.state.JavaLangDescr && this.state.AQFon && !this.state.PRFon){
      this.setState({
        JavaLangDescr: false,
        AQFon: false,
        PRFon: true
      })
    }

    else if(!this.state.JavaLangDescr && !this.state.AQFon && this.state.PRFon){
      this.setState({
        JavaLangDescr: true,
        PRFon: false,
      })
    }
    else{
      this.setState({
        JavaLangDescr: false,
        PRFon: false,
        AQFon: true
      })
    }
  }

  //?
  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  //function to save input from "Ask a Question" Form into Firebase database
  submitQuestion = e => {
    this.setState({
      JavaLangDescr: true, //show language description
      AQFon: false, //hide AQF
      PRFon: false //hide PRF
    })

    //connect to the database
    e.preventDefault();
    const db = fire.firestore();
    db.settings({
      timestampsInSnapshots: true
    });

    const userRef = db.collection("questions").add({ //add to collection called "questions"
      language: this.state.language, //store the language to which the questions is related
      title: this.state.title, //store question title
      content: this.state.content, //store question content
      qAttachment: null //don't store anything in the attachment field yet as we don't know if storing images in Firebase is going to work
    });  
  };

  //function to save input from "Post a Resource" Form into Firebase database
  submitPost = e => {
    this.setState({
      JavaLangDescr: true, //show language description
      AQFon: false, //hide AQF
      PRFon: false //hide PRF
    })

    //connect to the database
    e.preventDefault();
    const db = fire.firestore();
    db.settings({
      timestampsInSnapshots: true
    });

    const userRef = db.collection("posts").add({ //add to collection called "posts"
      language: this.state.language, //store the language to which the questions is related
      topic: this.state.topic, //store post topic
      tags: this.state.tags, //store post tags
      description: this.state.description, //store post content
      pAttachment: null //don't store anything in the attachment field yet as we don't know if storing images in Firebase is going to work
    });  
  };

  render() {
    return (
      <div>

      {!this.state.AQFon, !this.state.PQFon, this.state.JavaLangDescr && (
        <div>
        {/* Java Language Description */}
        <div id = "JavaLangDescription">
          <div class = "header"><b>What is Java?</b></div>
            <div>
              Java is a general-purpose programming language that is class-based, object-oriented, and designed to have as few implementation dependencies as possible.
            </div>

            <div class = "header"><b>Why learn Java?</b></div>
            <div>
              It is intended to let application developers write once, run anywhere (WORA), meaning that compiled Java code can run on all platforms that support Java without the need for recompilation.
              Java applications are typically compiled to bytecode that can run on any Java virtual machine (JVM) regardless of the underlying computer architecture. 
              The syntax of Java is similar to C and C++, but it has fewer low-level facilities than either of them. As of 2019, Java was one of the most popular programming languages in use according to GitHub, particularly for client-server web applications, with a reported 9 million developers.
            </div>

            <div class = "header"><b>Creators</b></div>
            <div>
              Java was originally developed by James Gosling at Sun Microsystems (which has since been acquired by Oracle) and released in 1995 as a core component of Sun Microsystems' Java platform. The original and reference implementation Java compilers, virtual machines, and class libraries were originally released by Sun under proprietary licenses.
            </div>
            <br></br>
            <div>
              For additional information visit: <a href ="https://en.wikipedia.org/wiki/Java_(programming_language)">WIKI PAGE</a>
            </div>
      </div>
      </div>
      )}

        {/*      ASK QUESTION FORM      */}
        {/* if AQFon is true then display the form on the screen by using && */}
        {this.state.AQFon && (
          <div id = "form1">
                {/* ASK QUESTION FORM */}
            <div className="wrapper1">
              <div className = "form-wrapper1">

                <h1>Ask a question</h1>
                <form onSubmit={this.submitQuestion}>

                  {/* Language field */}
                  <div className="language">
                      <label htmlFor="language">Language</label>
                      <input 
                        type="text" 
                        className="language" 
                        placeholder="type Java/Python/C# only"
                        onChange={this.updateInput} 
                        name="language" 
                        noValidate
                      />
                  </div>

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
                      <label htmlFor="qAttachment">Upload a photo</label>
                        <input 
                          id="uploadFile"
                          type="file" 
                          accept="image/*" 
                          noValidate
                        />
                    </div>

                    {/* Submit a question button */}
                    <button type="submit" className="submit">ASK A QUESTION</button>          
                  </form>
                </div>
              </div>
            </div>
        )}

      {/*      POST RESOURCE FORM      */}
        {/* if PRFon is true then display the post form on the screen by using && */}
        {this.state.PRFon && (
          <div>
             {/* Post a Resource Form */}
             <div className="wrapper1">
                    <div className = "form-wrapper1">
                        <h1>Create a post</h1>
                        <form onSubmit={this.submitPost}>

                            {/* Language field */}
                            <div className="language">
                                <label htmlFor="language">Language</label>
                                <input 
                                    type="text" 
                                    className="language" 
                                    placeholder="type Java/Python/C# only"
                                    onChange={this.updateInput} 
                                    name="language" 
                                    noValidate
                                />
                            </div>

                            {/* Topic field */}
                            <div className="topic">
                            <label htmlFor="topic">Topic</label>
                            <input 
                                type="text" 
                                className="" 
                                placeholder="Topic" 
                                name="topic" 
                                noValidate
                                onChange={this.updateInput}
                            />
                            </div>

                            {/* Tags field */}
                            <div className="tags">
                                <label htmlFor="tags">Tags</label>
                                <input 
                                    type="text" 
                                    className="" 
                                    placeholder="#tagname" 
                                    name="tags" 
                                    noValidate
                                    onChange={this.updateInput}
                                />
                            </div>

                            {/* Content field */}
                            <div className="content">
                                <label htmlFor="description">Post body</label>
                                <textarea 
                                    type="text" 
                                    className="post_body" 
                                    placeholder="Add post body" 
                                    name="description" 
                                    noValidate
                                    onChange={this.updateInput}
                                />
                            </div>

                            {/* Atachment field */}
                            <div className="pAttachment">
                                <label htmlFor="pAttachment">Upload a photo</label>
                                <input 
                                    id="uploadFile"
                                    type="file" 
                                    accept="image/*" 
                                    noValidate
                                    onChange={this.updateInput}
                                />
                            </div>

                            <button className="create">POST</button>
                        </form>
                    </div>
                </div>    
          </div>
    
        )}
      
        {/* when clicked - each button calls the corresponding toggle function to display the corresponding form */}
        <button className = "create" onClick={this.toggleAQF}>Ask a question</button>
        <button className = "create" onClick={this.togglePRF}>Post a resource</button>

      </div>
    );
  }
}

