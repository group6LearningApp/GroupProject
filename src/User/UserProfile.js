import { Nav } from 'react-bootstrap'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ShowUser from './ShowUser';
import ProfilePic from './ProfilePic';



export default class NavUser extends Component {  
    render() {
        return(
          <React.Fragment>
            <ProfilePic />
            <ShowUser />
          </React.Fragment>

  
        );
    }
}