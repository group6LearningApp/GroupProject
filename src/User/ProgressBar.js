import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';

export default class Progress extends Component {
    render() {
        return(
            <div>
                <ProgressBar now={60} />
            </div>
        );
    }
}