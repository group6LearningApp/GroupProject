import React, { Component } from 'react';
import './App.css';
//login in -> authorise ->
class App extends Component{
  render(){
    return( 
    <React.Fragment>
    <div className="wrapper">
      <div className = "form-wrapper">
        <h1>Post a new resource</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="topic">
              <label htmlFor="topic">Topic</label>
              <input 
                type="text" 
                className="" 
                placeholder="Topic" 
                name="topic" 
                noValidate
                onChange={this.handleChange}
              />
            </div>

            <div className="tags">
              <label htmlFor="tags">Tags</label>
               <input 
                type="text" 
                className="" 
                placeholder="Add tags '#tagname'" 
                name="tags" 
                noValidate
                onChange={this.handleChange}
              />
            </div>

            <div className="description">
              <label htmlFor="desc">Post body</label>
              <input 
                type="text" 
                className="post_body" 
                placeholder="Add post body" 
                name="desc" 
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

            <button className="create">CREATE</button>
          </form>
        </div>
      </div>
  
  </React.Fragment>
    
)
    }
  }   
export default App;
