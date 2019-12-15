import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import    Home   from './Home';
import    HomeUnreg  from './HomeUnreg';
import  { About }  from './About';
import  { Contact }  from './Contact';
import  { NoMatch }  from './NoMatch';
import  LogIn   from './Authentication/LogIn';
import  SignUp   from './Authentication/SignUp';
import  Java from './Languages/Java';
import { Layout } from './components/Layout';
import  NavigationBar  from './components/NavigationBar';
import Python from './Languages/Python';
import CSharp from './Languages/CSharp';
import fire from './config/Fire';
import 'firebase/auth';
import { NavigationBarSignUp } from './components/NavigationBarSignUp';
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
        this.setState({ user });
        //localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
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
              <Route component={NoMatch} />
            </Switch>
            ) : (<Switch>
              <Route exact path="/" component={HomeUnreg} />
              <Route path="/About" component={About} />
              <Route path="/Contact" component={Contact} />
              <Route path="/LogIn" component={LogIn} />
              <Route path="/SignUp" component={SignUp} />
              <Route path="/Java" component={Java} />
              <Route path="/Python" component={Python} />
              <Route path="/CSharp" component={CSharp} />
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
