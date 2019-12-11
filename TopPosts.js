import React from 'react'
import {db , auth } from './config/Fire.js'
import { Accordion, Card, Button } from 'react-bootstrap';
import './App.css'
class App extends React.Component{
    state = {
        students:null
    }
    componentDidMount(){
        console.log('mounted')
        db.collection('TopPosts')
        .get()
        .then( snapshot=>{
            const TopPosts = []
            snapshot.forEach(doc=>{
               const data = doc.data()
               TopPosts.push(data) 
            })
            this.setState({TopPosts:TopPosts})
        })
        .catch(error =>console.log(error))
    }
    render(){
        return(
    <div className="App">
        <h1 class="Top">Top Posts</h1>
        {
            this.state.TopPosts &&
            this.state.TopPosts.map(TopPosts =>{
              return(
              <div>
                 
                  
            </div>
            )
            })
          }
    </div>

)
        }
    }
    export default App
    // <Accordion defaultActiveKey="0">
    // <Card>
    //     <Card.Header>
    //     <Accordion.Toggle as={Button} variant="link" eventKey="0">
    //        Top Posts
    //     </Accordion.Toggle>
    //     </Card.Header>
    //     <Accordion.Collapse eventKey="0">
    //     <div><Card.Body class="Pcontent">{TopPosts.Title}:     
    //       {TopPosts.Content}
    //       <Button variant="primary">Comment</Button></Card.Body>
    //       </div>
    //     </Accordion.Collapse>
    // </Card>
    // </Accordion>