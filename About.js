import React from 'react'
import './App.css';
import Carousel from 'react-bootstrap/Carousel'
import Holder from 'react-holder';

export const About = () => (

<div >
<div>
    <h1 class="Languages">CS353 Group Project</h1>
    </div>
<div >
<Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/933x456?text= &bg=#222"
      alt=" "
    />
    <Carousel.Caption>
      <h1 class="Languages" >About</h1>
      <p>This is a web page developed by 3rd year Computer Science Software Engineer students from Maynooth University</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/933x456?text= &bg=222"
      alt=""
    />

    <Carousel.Caption>
      <h2 class="Languages" >About</h2>
      <p>The purpose of this page is to learn and teach people coding of all levels and skillsets</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/933x456?text= &bg=222"
      alt=""
    />

    <Carousel.Caption>
      <h2 class="Languages" >About</h2>
      <p>This project was created by Ben Reilly , David Afalla , Mariia Skyba , Carl Egan and Shane Dunne </p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel></div>
</div>
)