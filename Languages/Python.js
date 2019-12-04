import React from 'react'
import './Languages.css';
import Button from 'react-bootstrap/Button'

export const Python = () => (
    <div>
        <h2 class="Languages">Python Page</h2>
        <p class="LContent">Python is an interpreted, high-level, general-purpose programming language. Created by Guido van Rossum and first released in 1991, Python's design philosophy emphasizes code readability with its notable use of significant whitespace.</p>
        <div>
    <Button variant="outline-success" size="sm" active>
      Ask a Question
    </Button>
    </div>
    <div >
    <Button variant="outline-success" size="sm" active>
      Post a Tutorial
    </Button>
    </div>
    </div>
)