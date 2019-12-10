//PostResourceForm.js
//Mariia Skyba
//This is a "Post a Resource" form which gets called by "Post a Resouce" button located on the Java Language Page
//This form is imported into Java.js file


//necessary imports
import React, { Component } from 'react';
import '../App.css'; //styling
import fire from '../config/Fire'; //database configurations

class PostResourceForm extends Component{

  constructor() {
    super();
    this.state = {
      //class attributes (fields in the PostResourceForm)
      topic: "",
      tags: "",
      content:"",
      attachment: "" //leave for now
    };
  }

  //?
  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  //function to save input from "Post a Resource" Form into Firebase database
  submitPost = e => {
    e.preventDefault();
    const db = fire.firestore();
    db.settings({
        timestampsInSnapshots: true
    });
        const userRef = db.collection("posts").add({ //add to collection called "posts"
            topic: this.state.topic, //store post topic
            tags: this.state.tags, //store post tags
            content: this.state.content, //store post content
            attachment: null //don't store anything in the attachment field yet as we don't know if storing images in Firebase is going to work
        });  
  };

    render(){
        return( 
            <React.Fragment>
                {/* Post a Resource Form */}
                <div className="wrapper1">
                    <div className = "form-wrapper1">
                        <h1>Create a post</h1>
                        <form onSubmit={this.submitPost}>
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
                                <label htmlFor="content">Post body</label>
                                <textarea 
                                    type="text" 
                                    className="post_body" 
                                    placeholder="Add post body" 
                                    name="content" 
                                    noValidate
                                    onChange={this.updateInput}
                                />
                            </div>

                            {/* Atachment field */}
                            <div className="attachment">
                                <label htmlFor="attachment">Upload a photo</label>
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
            </React.Fragment>    
        )
    }
}   
export default PostResourceForm;
