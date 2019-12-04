import React, { Component } from 'react';
import fire from './config/Fire';

export default class User extends Component {
    constructor() {
        super();
        this.state = {
         lastname: "",
         firstname: ""
        };
    }
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email:'',
            password:''
        }
    }
    signup(e) {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{})
        .catch((error) => {
            console.log(error);
        });
    }
    
    updateInput = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
    }

    addUser = e => {
        e.preventDefault();
        const db = firebase.firestore();
        db.settings({
        timestampsInSnapshots: true
        });
        const userRef = db.collection('users').add({
        firstname: this.state.firstname,
        lastname: this.state.lastname
        });  
        this.setState({
          fullname: "",
          email: ""
        });
      };


    render() {
        return (
            <form onSubmit={this.addUser}>
                <input
                type="text"
                name="firstname"
                placeholder="First name"
                onChange={this.updateInput}
                value={this.state.firstname}
                />
                <input
                type=""
                name="lastname"
                placeholder="Last name"
                onChange={this.updateInput}
                value={this.state.lastname}
                />
                <div class="form-group">
                    <label for="exampleInputEmail">Email Address</label>
                    <input value={this.state.email} onChange={this.handleChange} type="email" name="email"
                    class="form-control" id="exampleIputEmail" aria-describedby="emailHelp"
                    placeholder="Enter Email" />
                    <small id="emailHelp" class="form-text text-muted">We'll never share youur email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input value={this.state.password} onChange={this.handleChange} type="password"
                    name="password" class="form-control" id="exampleInputPasword1" placeholder="Password" />
                </div>
                <button type="submit" onClick={this.login} class="btn btn-primary">Login</button>
                <button onClick={this.signup} style={{marginLeft: '25px'}} className="btn btn-success">Signup</button>
                <button type="submit">Submit</button>
          </form>
        );
    }
}