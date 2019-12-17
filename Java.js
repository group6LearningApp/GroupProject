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

    this.setState({
      showingAlert: false //hide alert
    })
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

  //for updating text fields in the forms
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
    const userRef = db.collection("questions").doc(this.state.title).set({ //add to collection called "questions"
          content: this.state.content, //store question content. Note that for posts it's called description
          language: this.state.language, //store the language to which the questions is related
          createdByFname: this.state.users.firstname,
          createdByLname: this.state.users.lastname,
      }); 
  };

  //function to save input from "Post a Resource" Form into Firebase database
  submitPost = e => {
    this.setState({
      JavaLangDescr: true, //show language description
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
    const userRef = db.collection("posts").doc(this.state.description).set({ //add to collection called "posts"
      language: this.state.language, //store the language to which the post is related
      tags: this.state.tags,
      description: this.state.description, //note that for questions it's called content      
      createdByFname: this.state.users.firstname,
      createdByLname: this.state.users.lastname,
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

        {!this.state.AQFon, !this.state.PQFon, this.state.JavaLangDescr && (
          <div>
          {/* Java Language Description */}
          <div id = "JavaLangDescription">
            <img id = "java" src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Logo-java-830x460.jpg" alt="new" />
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
            <div id = "JavaLangDescription">
            <div>                  
              <Alert color="danger">
                If you want to be able to post or ask questions please login.
              </Alert>
            </div>
            <img id = "java" src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Logo-java-830x460.jpg" alt="new" />
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
          </div> {/*end of description*/}
        </div> 
        )
      
    );
  }
}
