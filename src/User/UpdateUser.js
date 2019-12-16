import React, { Component } from 'react';
import { InputGroup, Button, FormControl } from 'react-bootstrap';
import fire from '../config/Fire';

export default class UpdateUser extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            user:{},
            email:'',
            users: {},
            firstname: '',
            lastname: '',
            bio: '',
            key: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.updateFirstname = this.updateFirstname.bind(this);
        this.updateLastname = this.updateLastname.bind(this);
        this.updateBio = this.updateBio.bind(this);
        
    }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
 }

  updateFirstname(e) {
    e.preventDefault();
    fire.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({ user });
    var db = fire.firestore().collection('users').doc(this.state.user.uid);
    db.update({
        firstname: this.state.firstname,
    }).catch((error) => {
        console.log(error);
    });
  }
  }); 
  }
  updateLastname(e) {
    e.preventDefault();
    fire.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({ user });
    var db = fire.firestore().collection('users').doc(this.state.user.uid);
    db.update({
        lastname: this.state.lastname
    }).catch((error) => {
        console.log(error);
    });
  }
  }); 
  }
  updateBio(e) {
    e.preventDefault();
    fire.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({ user });
    var db = fire.firestore().collection('users').doc(this.state.user.uid);
    db.update({
        bio: this.state.bio
    }).catch((error) => {
        console.log(error);
    });
  }
  }); 
  }


    render() {
        return (
        <React.Fragment>
          <br/>
            <InputGroup className="mb-3">
                <FormControl name="firstname" placeholder="Update Firstname" value={this.state.firstname} 
                onChange={this.handleChange}/>
                <InputGroup.Append>
                <Button variant="outline-secondary" onClick={this.updateFirstname}>Update</Button>
                </InputGroup.Append>
            </InputGroup>
            <InputGroup className="mb-3">
                <FormControl name="lastname" placeholder="Update Lastname" value={this.state.lastname} 
                onChange={this.handleChange}/>
                <InputGroup.Append>
                <Button variant="outline-secondary" onClick={this.updateLastname}>Update</Button>
                </InputGroup.Append>
            </InputGroup>
            <InputGroup className="mb-3">
                <FormControl name="bio" placeholder="Update Bio" value={this.state.bio} 
                onChange={this.handleChange}/>
                <InputGroup.Append>
                <Button variant="outline-secondary" onClick={this.updateBio}>Update</Button>
                </InputGroup.Append>
            </InputGroup>
        </React.Fragment>
        );
    }
}