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
            firstname:'',
            lastname: '',
            bio: ''
        }
    } 

    signup(e) {
        e.preventDefault();
        const db = fire.firestore();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
            return db.collection('users').doc(u.user.uid).set({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                bio: this.state.bio
            })
        })
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
                
                <div>
                    <label for="exampleInputFirstname">First Name</label>
                    <input  value={this.state.firstname} onChange={this.handleChange} type="firstname" name="firstname"
                    class="form-control" id="exampleIputFirstname" aria-describedby="emailHelp"
                    placeholder="Enter First Name" />
                </div>
                <br/>
                <div>
                    <label for="exampleInputLastname">Last Name</label>
                    <input  value={this.state.lastname} onChange={this.handleChange} type="lastname" name="lastname"
                    class="form-control" id="exampleIputLastname" aria-describedby="emailHelp"
                    placeholder="Enter Last Name" />
                </div>
                <br/>
                <div>
                    <label for="exampleInputBio">Bio</label>
                    <input  value={this.state.bio} onChange={this.handleChange} type="bio" name="bio"
                    class="form-control" id="exampleBio" aria-describedby="emailHelp"
                    placeholder="Bio" />
                </div>
                <br/>
                <button onClick={this.signup} type="submit" className="btn btn-success">Sign Up</button>
            </form>

        </div>
        );
    }
}
