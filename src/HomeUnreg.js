import React, { Component } from 'react'
import { TopPosts } from './components/TopPosts';
import { LanguageDrop } from './components/LanguageDrop';
import './Home.css';

class HomeUnreg extends Component {

    render() {
        return (
    <div>
        <h1>Hi Uregistered User! If you want to write posts please create an account or login.</h1>
        <h2>Learning App</h2>
        <p>Please select a language of choice</p>
        <LanguageDrop />
        <TopPosts />

    
    </div>
        );
    }
}
export default HomeUnreg;