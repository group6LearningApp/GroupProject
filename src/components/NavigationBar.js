import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import fire from '../config/Fire';

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  a, .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;
    &:hover {
      color: white;
    }
  }
`;

class NavigationBar extends Component {  
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
    //this.handleUpload = this.handleUpload.bind(this);
    this.logout = this.logout.bind(this);
      }
      componentDidMount() {
        fire.auth().onAuthStateChanged((user) => {
          if(user) {
            this.setState({ user });
        var ref = fire.firestore().collection('users').doc(this.state.user.uid);
        ref.get().then((doc) => {
          if(doc.exists) {
            fire.storage().ref('images/').child(this.state.user.uid).child('pic.jpg').getDownloadURL().then(url => {
              this.setState({url});
          })
            //console.log(doc.data());
            this.setState({
              
              users: doc.data(),
              key: doc.id
              
            })
          }
        })
      }
      }); 
      }

handleChange = e => {
if(e.target.files[0]) {
    const image = e.target.files[0];
    this.setState(() => ({image}));
} 

}
logout() {
    fire.auth().signOut();
}

  render() {
    return (
      <Styles>
      <Navbar expand="lg">
        <Navbar.Brand href="/">Learning App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
          <Nav.Item>
              <Nav.Link>
                <Link to="/UserProfile">
                  <img src={this.state.url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="40" width="40" borderRadius="40/2"/>
                </Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <Link to="/">Home</Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <Link to="/About">About</Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <Link to="/Contact">Contact</Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={this.logout}>
                <Link to="/">Sign out</Link>
                </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles >
    );
  }
}
  export default NavigationBar;
