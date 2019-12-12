import React, { Component } from 'react'
import fire from '../config/Fire';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.signup = this.signup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email:'',
            password:'',
        }
    }
   


    updateInput = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
    }

    addUser = e => {
        e.preventDefault();
        const db = fire.firestore();
        db.settings({
        timestampsInSnapshots: true
        });
        const userRef = db.collection("users").add({
        firstname: this.state.firstname,
        lastname: this.state.lastname
        });  
        this.setState({
          fullname: "",
          email: ""
        });
      };

    signup(e) {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{})
        .catch((error) => {
            console.log(error);
        });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
        <div className="col-md-g">
            <h1>Hi Unregistered User!</h1>
        <h2>Please create an account to begin learning code!</h2>
            <form>
                <div>
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
                <button onClick={this.signup} type="submit" className="btn btn-success">Sign Up</button>
            </form>

        </div>
        );
    }
}
