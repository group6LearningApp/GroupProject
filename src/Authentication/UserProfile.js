import React, { Component } from 'react';
import fire from '../config/Fire';
import { storage } from 'firebase';

export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            user:{},
            email:'',
            users: {},
            key: '',
            image: null,
            url: '',
            progress: 0
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
            <div style={style}>
            <progress value={this.state.progress} max="100"/>
                <input type="file" onChange={this.handleChange}/>
                <button onClick={this.handleUpload}>Upload</button>
                <br/>
            <img src={this.state.url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400"/>
            </div>
            <br/>
            <h1>Firstname: {this.state.users.firstname}</h1>
            <br/>
            <h1>Lastname: {this.state.users.lastame}</h1>
            <br/>
            <h1>Email: {this.state.user.email}</h1>
            <br/>
            <h1>Bio: {this.state.users.bio}</h1>
        </React.Fragment>
        );
    }
}