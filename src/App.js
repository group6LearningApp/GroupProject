import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import    Home   from './Home';
import  About  from './About';
import  { Contact }  from './Contact';
import  { NoMatch }  from './NoMatch';
import  LogIn   from './Authentication/LogIn';
import  SignUp   from './Authentication/SignUp';
import { Layout } from './components/Layout';
import  NavigationBar  from './components/NavigationBar';
import  Java from './Languages/Java';
import  Python  from './Languages/Python';
import  CSharp  from './Languages/CSharp';
import PostPage from './components/PostPage';
import fire from './config/Fire';
import 'firebase/auth';
import { NavigationBarSignUp } from './components/NavigationBarSignUp';
import UserProfile from './User/UserProfile'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:{},
    }
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      //console.log(user);
      if(user) {
        this.setState({ user:user });
        //localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user:"" });
        //localStorage.removeItem('user');
      }
    });
  }


  render() {
      return (
        <React.Fragment>
          <Router>
          {this.state.user ? (<NavigationBar />) : (<NavigationBarSignUp />)}
          <Layout>
          {this.state.user ? (
          <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/About" component={About} />
              <Route path="/Contact" component={Contact} />
              <Route path="/LogIn" component={Home} />
              <Route path="/Java" component={Java} />
              <Route path="/Python" component={Python} />
              <Route path="/CSharp" component={CSharp} />
              <Route path="/SignUp" component={Home} />
              <Route path="/PostPage" component={PostPage} />
              <Route path="/UserProfile" component={UserProfile} />
              <Route component={NoMatch} />
            </Switch>
            ) : (<Switch>
              <Route exact path="/" component={Home} />
              <Route path="/About" component={About} />
              <Route path="/Contact" component={Contact} />
              <Route path="/LogIn" component={LogIn} />
              <Route path="/SignUp" component={SignUp} />
              <Route path="/Java" component={Java} />
              <Route path="/Python" component={Python} />
              <Route path="/CSharp" component={CSharp} />
              <Route path="/PostPage" component={PostPage} />
              <Route component={NoMatch} />
            </Switch>)}
           
          </Layout>
          </Router>
          <Layout>
          
          </Layout>
        </React.Fragment>
    );
  }
}

export default App;
