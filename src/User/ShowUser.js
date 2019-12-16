import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import fire from '../config/Fire';

export default class ShowUser extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            user:{},
            email:'',
            users: {},
            key: ''
        }
        
    }

componentDidMount() {
    fire.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({ user });
    var ref = fire.firestore().collection('users').doc(this.state.user.uid);
    ref.get().then((doc) => {
      if(doc.exists) {
        console.log(doc.data());
        this.setState({
          
          users: doc.data(),
          key: doc.id
          
        })
      }
    })
  }
  }); 
  }

    render() {
        return (
        <React.Fragment>
          <br/>
         <Table striped bordered hover>
          <tbody>
            <tr>
              <td>Email:</td>
              <td>{this.state.user.email}</td>
            </tr>
            <tr>
              <td>First Name:</td>
              <td>{this.state.users.firstname}</td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td>{this.state.users.lastname}</td>
            </tr>
            <tr>
              <td>Bio</td>
              <td >{this.state.users.bio}</td>
            </tr>
          </tbody>
        </Table>
        </React.Fragment>
        );
    }
}