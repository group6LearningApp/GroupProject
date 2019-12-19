import React from 'react'
import { Dropdown } from 'react-bootstrap';
//import './LanguageDrop.css';

export const LanguageDrop = (props) => (
    <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Languages
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="./Java">Java</Dropdown.Item>
                <Dropdown.Item href="./Python">Python</Dropdown.Item>
                <Dropdown.Item href="./CSharp">C#</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
)