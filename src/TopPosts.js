import React from 'react'
import {db , auth } from './config/Fire.js'
import { Accordion, Card, Button, Table , ListGroup } from 'react-bootstrap';
import './App.css'
class TopPosts extends React.Component{
    state = {
       students:null
     
    }
    componentDidMount(){{
        
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
    db.collection('TopQuestions')
        .get()
        .then( snapshot=>{
            const TopQuestions = []
            snapshot.forEach(doc=>{
               const data = doc.data()
               TopQuestions.push(data) 
            })
            this.setState({TopQuestions:TopQuestions})
        })
        .catch(error =>console.log(error))
}
     
    
    render(){
        return(
    <div>
        <h1 class="Top">Top Posts</h1>
        {
            this.state.TopPosts &&
            this.state.TopPosts.map(TopPosts =>{
              return(
              <div>
 <Accordion defaultActiveKey="0">
    <Card>
        <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
          {TopPosts.Language}: {TopPosts.Title} <div class="upvotes">Upvotes:{TopPosts.Value}</div>
        </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
        <Card.Body>{TopPosts.Content}<div><button>Comment</button></div></Card.Body>
        </Accordion.Collapse>
    </Card>
    
    </Accordion>
             </div>
            )
            })
          }
        
          <div cass="Top">
 <h1 class="Top">Top Questions</h1>
          {
            this.state.TopQuestions &&
            this.state.TopQuestions.map(TopQuestions =>{
              return(
              <div>
 <Accordion defaultActiveKey="0">
    <Card>
        <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
    
          {TopQuestions.Language}:  {TopQuestions.Title} <div class="upvotes">Upvotes:{TopQuestions.Value}</div>
        </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
        <Card.Body>{TopQuestions.Content}<div><button>Comment</button></div></Card.Body>
        </Accordion.Collapse>
    </Card>
    
    </Accordion>
                  
             </div>
            )
            })
          }
          </div>
    </div>
    

)
        }
    }
    export default TopPosts
