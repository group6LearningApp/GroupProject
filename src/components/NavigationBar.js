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
    this.logout = this.logout.bind(this);
    this.state = {
        user:{},
        email:''
    }
}


logout() {
    fire.auth().signOut();
}

componentDidMount() {
    this.authListener();
  }
  

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      //console.log(user);
      if(user) {
        this.setState({ user });
       
      } 
    });
  }

  render() {
    return (
      <Styles>
      <Navbar expand="lg">
        <Navbar.Brand href="/">Stack Overflow 2.0</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
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
              <Nav.Link onClick={this.logout}>Sign out</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles >
    );
  }
}
  export default NavigationBar;
