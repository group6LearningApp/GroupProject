import React, { Component } from 'react'
import fire from '../config/Fire';

export default class LogIn extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email:'',
            password:''
        }
    }
   


    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(res => {
        }).catch((error) => {
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
        <h2>Please log in to begin learning code!</h2>
            <form>
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
            </form>

        </div>
        );
    }
}
