//Python.js 
//Post Resource and Ask Question forms now fully functional for all Languages

//There is an alert component in this file which requires reactstrap
//In order for it to work you need to do: 'npm i -S reactstrap' in the console
import React, { Component } from 'react';
import fire from '../config/Fire';
import { Alert }  from 'reactstrap';

export default class Java extends Component {
  constructor() {
    super();

    this.toggleAQF = this.toggleAQF.bind(this); //include this line for a function to work(?)
    this.togglePRF = this.togglePRF.bind(this); //include this line for a function to work(?)
    //for handling uploading images with posts
    this.handleChange = this.handleChange.bind(this);
    this.handleUploadAQF = this.handleUploadAQF.bind(this);
    this.handleUploadPRF = this.handleUploadPRF.bind(this);

    this.state = {
      AQFon: false, //Question Form visibility (initially hidden)
      PRFon: false, //Post Form visibility (initially hidden)
      PythonLangDescr: true, //Language Description visibility (initially visible)
      

      //fields in ask question form:
      language: "",
      title: "",
      content:"",
      qAttachment: "",
      //fields in post resource form:
      topic: "",
      tags: "",
      description:"",//was: content
      pAttachment: "", //was: attachment
      
      //for dealing with uploading images
      user: {},
      users:{},
      key: '',
      image: null,
      url: '',
      showingAlert: false //for displaying a message after successful submission
    }
  }

  //this function toggles the visibility of Ask Question Form
  toggleAQF =() => {
    
      this.setState({
        showingAlert: false //hide alert
    })
    if(this.state.PythonLangDescr && !this.state.AQFon && !this.state.PRFon){
      this.setState({
        PythonLangDescr: false,
        AQFon: true, //show question form
        PRFon:false
      })
    } 
    else if(!this.state.PythonLangDescr && this.state.AQFon && !this.state.PRFon){
      this.setState({
        PythonLangDescr: true,
        AQFon: false,
        PRFon: false
      })
    }

    else if(!this.state.PythonLangDescr && !this.state.AQFon && this.state.PRFon){
      this.setState({
        PythonLangDescr: false,
        AQFon: true,
        PRFon: false
      })
    }
    else{
      this.setState({
        PythonLangDescr: false,
        PRFon: true,
        AQFon: false
      })
    }
  }

  //this function toggles the visibility of the Post Resource Form
  togglePRF =() => {

    this.setState({
      showingAlert: false //hide alert
    })
    if(this.state.PythonLangDescr && !this.state.AQFon && !this.state.PRFon){
      this.setState({
        PythonLangDescr: false,
        PRFon: true
      })
    } 
    else if(!this.state.PythonLangDescr && this.state.AQFon && !this.state.PRFon){
      this.setState({
        PythonLangDescr: false,
        AQFon: false,
        PRFon: true
      })
    }

    else if(!this.state.PythonLangDescr && !this.state.AQFon && this.state.PRFon){
      this.setState({
        PythonLangDescr: true,
        PRFon: false,
      })
    }
    else{
      this.setState({
        PythonLangDescr: false,
        PRFon: false,
        AQFon: true
      })
    }
  }

  //for updating text fields in the forms
  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  //function to save input from "Ask a Question" Form into Firebase database
  submitQuestion = e => {
    this.setState({
      PythonLangDescr: true, //show language description
      AQFon: false, //hide AQF
      PRFon: false, //hide PRF
      showingAlert: true //display a message
    })

    //connect to the database
    e.preventDefault();
    const db = fire.firestore();
    /*db.settings({
      timestampsInSnapshots: true
    });*/

    /*const userRef = db.collection("questions").add({ //add to collection called "questions"
      language: this.state.language, //store the language to which the questions is related
      title: this.state.title, //store question title
      content: this.state.content, //store question content
      qAttachment: null //don't store anything in the attachment field yet as we don't know if storing images in Firebase is going to work
    });*/   
    const userRef = db.collection("FinalQuestions").doc(this.state.title).set({ //add to collection called "questions"
          Content: this.state.content, //store question content. Note that for posts it's called description
          Topic: this.state.language, //store the language to which the questions is related
          CreatorFName: this.state.users.firstname,
          CreatorLName: this.state.users.lastname,
          UpVotes: 0,
      }); 
  };

  //function to save input from "Post a Resource" Form into Firebase database
  submitPost = e => {
    this.setState({
      PythonLangDescr: true, //show language description
      AQFon: false, //hide AQF
      PRFon: false, //hide PRF
      showingAlert: true //display success alert
    })

    //connect to the database
    e.preventDefault();
    const db = fire.firestore();
    db.settings({
      timestampsInSnapshots: true
    });

    /*const userRef = db.collection("posts").add({ //add to collection called "posts"
      language: this.state.language, //store the language to which the questions is related
      topic: this.state.topic, //store post topic
      tags: this.state.tags, //store post tags
      description: this.state.description, //store post content
      pAttachment: null 
    }); */
    const userRef = db.collection("FinalPosts").doc(this.state.topic).set({ //add to collection called "posts"
        Topic: this.state.language, //store the language to which the post is related
        Tags: this.state.tags,
        Content: this.state.description, //note that for questions it's called content      
        CreatorFName: this.state.users.firstname,
        CreatorLName: this.state.users.lastname,
        UpVotes: 0,
      });  
  };

  //for uploading images
  handleChange = e => {
    if(e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({image}));
    } 
  }
  //function for uploading images to questions collection
  handleUploadAQF = () => {
    const {image} = this.state;
    const uploadTask = fire.storage().ref(`questions/${this.state.title}/pic.jpg`).put(image);
    uploadTask.on('state_changed', 
    (snapshot) => (error) => {
      // error function ....
      console.log(error);
    }, 
    () => {
      // complete function ....
      fire.storage().ref('questions/').child(this.state.title).child('pic.jpg').getDownloadURL().then(url => {
        console.log(url);
        this.setState({url});
      })
  });
  }
  //function for uploading images to posts collection
  handleUploadPRF = () => {
    const {image} = this.state;
    const uploadTask = fire.storage().ref(`posts/${this.state.topic}/pic.jpg`).put(image); //note topic field instead of the title like in AQ form
    uploadTask.on('state_changed', 
    (snapshot) => (error) => {
      // error function ....
      console.log(error);
    }, 
    () => {
      // complete function ....
      fire.storage().ref('posts/').child(this.state.topic).child('pic.jpg').getDownloadURL().then(url => {
        console.log(url);
        this.setState({url});
      })
  });
  }

  //for keeping track of the logged in user
  authListener(){
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if(user){
        this.setState({ user });
      } 
      else{
        this.setState({ user: null });
      }
    })
  }


  componentDidMount() {
    this.authListener();
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
        {this.state.showingAlert && (
          <div>                  
            <Alert color="success">
              <strong>Success!</strong> Thank you for submitting!
            </Alert>
          </div>
        )}

        {!this.state.AQFon, !this.state.PQFon, this.state.PythonLangDescr && (
          <div>
            {/* Python Language Description */}
            <div id = "PythonLangDescription">
              <img id = "python" src="https://upload.wikimedia.org/wikipedia/commons/0/0a/Python.svg" alt="new" />
              <div class = "header"><b>What is Python?</b></div>
              <div>
                Python is an interpreted, high-level, general-purpose programming language. Python's design philosophy emphasizes code readability with its notable use of significant whitespace. Its language constructs and object-oriented approach aim to help programmers write clear, logical code for small and large-scale projects.
              </div>
              <div class = "header"><b>Why learn Python?</b></div>
              <div>
                Python is dynamically typed and garbage-collected. It supports multiple programming paradigms, including procedural, object-oriented, and functional programming. Python is often described as a "batteries included" language due to its comprehensive standard library.
              </div>
              <div class = "header"><b>Authors</b></div>
              <div>
                Python was created by Guido van Rossum and first released in 1991.
              </div>
              <br></br>
              <div>
                For additional information visit: <a href ="https://en.wikipedia.org/wiki/Python_(programming_language)">WIKI PAGE</a>
              </div>
            </div>{/*end of description*/}
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
                          //value={this.state.content} 
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
                            onChange={this.handleChange}
                          />
                      </div>
                      {/*<div className="attachment">
                        <label htmlFor="qAttachment">Upload a photo</label>
                          <input 
                            id="uploadFile"
                            type="file" 
                            accept="image/*" 
                            noValidate
                          />
                      </div>*/}
  
                      {/* Submit a question button */}
                      <button type="submit" className="submit" onClick={this.handleUploadAQF}>ASK A QUESTION</button>          
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
                                      //value={this.state.content}
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
                                      onChange={this.handleChange}
                                  />
                              </div>
  
                              <button className="create" onClick={this.handleUploadPRF} >POST</button>
                          </form>
                      </div>
                  </div>    
            </div>
      
          )}
        
          {/* when clicked - each button calls the corresponding toggle function to display the corresponding form */}
          <button className = "create" onClick={this.toggleAQF}>Ask a question</button>
          <button className = "create" onClick={this.togglePRF}>Post a resource</button>
  
        </div>):(  
          <div>       
          {/* Java Language Description */}
            {/* Python Language Description */}
            <div id = "PythonLangDescription">
            <div>                  
              <Alert color="danger">
                If you want to be able to post or ask questions please login.
              </Alert>
            </div>
            <img id = "python" src="https://upload.wikimedia.org/wikipedia/commons/0/0a/Python.svg" alt="new" />
                <div class = "header"><b>What is Python?</b></div>
                <div>
                  Python is an interpreted, high-level, general-purpose programming language. Python's design philosophy emphasizes code readability with its notable use of significant whitespace. Its language constructs and object-oriented approach aim to help programmers write clear, logical code for small and large-scale projects.
                </div>

                <div class = "header"><b>Why learn Python?</b></div>
                <div>
                  Python is dynamically typed and garbage-collected. It supports multiple programming paradigms, including procedural, object-oriented, and functional programming. Python is often described as a "batteries included" language due to its comprehensive standard library.
                </div>

                <div class = "header"><b>Authors</b></div>
                <div>
                  Python was created by Guido van Rossum and first released in 1991.
                </div>
                <br></br>
                <div>
                  For additional information visit: <a href ="https://en.wikipedia.org/wiki/Python_(programming_language)">WIKI PAGE</a>
                </div>
            </div>
        </div> 
        )
      
    );
  }
}
