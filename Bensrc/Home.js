import React from 'react'
import { TopPosts } from './components/TopPosts';
import { LanguageDrop } from './components/LanguageDrop';

export const Home = () => (
    <div>
        <h2>Learning App</h2>
        <p>Please select language of choice</p>
        <LanguageDrop />
        <TopPosts />
    
    </div>
)