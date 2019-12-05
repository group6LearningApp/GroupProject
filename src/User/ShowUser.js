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
            key: '',
            image: null,
            url: '',
            progress: 0,
            photo_url:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        
    }

handleChange = e => {
    if(e.target.files[0]) {
        const image = e.target.files[0];
        this.setState(() => ({image}));
    } 
    
}
   
handleUpload = () => {
    const {image} = this.state;
    const uploadTask = fire.storage().ref(`images/${image.name}`).put(image);
    uploadTask.on('state_changed', 
    (snapshot) => {
      // progrss function ....
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      this.setState({progress});
    }, 
    (error) => {
         // error function ....
      console.log(error);
    }, 
  () => {
      // complete function ....
      fire.storage().ref('images').child(image.name).getDownloadURL().then(url => {
          console.log(url);
          this.setState({url});
      })
  });
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
        const style = {
            
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'

        };
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
              <td>{this.state.users.lastame}</td>
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