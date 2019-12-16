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
      user:{},
      title: "",
      content:"",
      users:{},
      key:'',
      image: null,
      url: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleChange = e => {
    if(e.target.files[0]) {
        const image = e.target.files[0];
        this.setState(() => ({image}));
    } 
}

handleUpload = () => {
    const {image} = this.state;
    const uploadTask = fire.storage().ref(`posts/${this.state.title}/pic.jpg`).put(image);
    uploadTask.on('state_changed', 
    (snapshot) => (error) =>  {
         // error function ....
      console.log(error);
    }, 
  () => {
      // complete function ....
      fire.storage().ref('posts/').child(this.state.title).child('pic.jpg').getDownloadURL().then(url => {
          console.log(url);
          this.setState({url});
      })
  });
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
  
  //?
  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if(user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  //function to save input from "Ask a Question" Form into Firebase database
  submitQuestion = e => {
      e.preventDefault();
      const db = fire.firestore();
      const userRef = db.collection("Questions").doc(this.state.title).set({ //add to collection called "Questions"
          content: this.state.content,
          createdByFname: this.state.users.firstname,
          createdByLname: this.state.users.lastname 
            //store question content
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
                  onChange={this.handleChange}
                />
            </div>

            {/* Submit a question button */}
            <button type="submit"  onClick={this.handleUpload} 
            className="create">POST A RESOURCE</button>          
          </form>
        </div>
      </div>
    </div>    
  
  </React.Fragment>
    
)
    }
  }   
export default AskQuestionForm;