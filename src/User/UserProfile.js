import React, { Component } from 'react';
import ShowUser from './ShowUser';
import ProfilePic from './ProfilePic';
import UpdateUser from './UpdateUser';
import Progress from './ProgressBar';



export default class NavUser extends Component {  
    render() {
        return(
          <React.Fragment>
            <br />
            <ProfilePic />
            <ShowUser />
            <br/>
            <Progress />
            <br />
            <UpdateUser />
          </React.Fragment>

  
        );
    }
}