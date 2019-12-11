//Java.js
//Mariia Skyba
//Removed the code that was previously here as we don't need to track the users anymore
//Instead, this page now contains general description of Java language and two buttons that call the corresponding forms (and toggle them)
import React, { Component } from 'react';
import AskQuestionForm from '../components/AskQuestionForm';
import PostResourceForm from '../components/PostResourceForm';

export default class Java extends Component {

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
    return (
      <div>

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
            <div>
              For additional information visit: <a href ="https://en.wikipedia.org/wiki/Java_(programming_language)">WIKI PAGE</a>
            </div>
      </div>


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
