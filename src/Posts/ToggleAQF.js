import React, { Component } from 'react';
import AskQuestionForm from './AskQuestionForm';
import PostResourceForm from './PostResourceForm';



export default class ToggleAQF extends Component {

    //for keeping track of forms and description visibility
  state = {
    AQFon: false, //Ask A Question Form visibility (initially hidden)
    PRFon: false, //Post Resource Form visibility (initially hidden)
    LangDescr: true //language description visibility
  }


  //this function gets the current state of 'AQFon and sets it to be the opposite value
  toggleAQF =() => {     this.setState({
    AQFon: !this.state.AQFon,
    PRFon: false,
    LangDescr: !this.state.LangDescr
    })
}

  //this function gets the current state of 'PRFon and sets it to be the opposite value
  togglePRF =() => {     this.setState({
    PRFon: !this.state.PRFon,
    AQFon: false,
    LangDescr: !this.state.LangDescr
  })
}

render() {
    return(
    <div>
        {/* if AQFon is true then display the form on the screen by using && */}
        {this.state.AQFon && (
            <AskQuestionForm />
          )}
          {/* if PRFon is true then display the form on the screen by using && */}
          {this.state.PRFon && (
            <PostResourceForm />
          )}      
          {/* when clicked - each button calls the corresponding toggle function to display the corresponding form */}
          <button className = "create" onClick={this.toggleAQF}>Ask a question</button>
          <button className = "create" onClick={this.togglePRF}>Post a resource</button>
    </div>
    );
}
}