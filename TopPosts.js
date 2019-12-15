import React from 'react'
import {db , auth } from '../config/Fire.js'
import { Link } from 'react-router-dom';
//import { Accordion, Card, Button, Table , ListGroup } from 'react-bootstrap';
//import '../App.css'

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
    /*let GetPost = this.state.TopPosts && this.state.TopPosts.map( TopPosts =>
      <ListGroup.Item><Link to="/PostPage">{TopPosts.Title}</Link></ListGroup.Item>
    )
    let GetQuestion = this.state.TopQuestions && this.state.TopQuestions.map( TopQuestions =>
      <ListGroup.Item><Link to="/PostPage">{TopQuestions.Title}</Link></ListGroup.Item>
    )*/
    return(
      /*<>
        <Card>
        <Card.Header>Top Posts</Card.Header>
        <ListGroup>
          {GetPost}
        </ListGroup>
      </Card>
      <Card>
        <Card.Header>Top Questions</Card.Header>
        <ListGroup>
          {GetQuestion}
        </ListGroup>
      </Card>
    </>*/
      <>
        <div>
          <h1>Top Posts</h1>
          <table align="center" width="400" >
            {this.state.TopPosts && this.state.TopPosts.map(TopPosts =>{
              return(
                <>
                  <tr>
                    <td>Title</td>
                    <td><Link to="/PostPage">{TopPosts.Title}</Link></td>
                  </tr>
                </>
              )
            })}
          </table> 
        </div>
        <div>
          <h1>Top Questions</h1>
          <table align="center" width="400">
            {this.state.TopQuestions && this.state.TopQuestions.map(TopQuestions =>{
              return(
                <>
                  <tr>
                    <td>Title</td>
                    <td><Link to="/PostPage" /*Info={{ Post: TopQuestions.id }}*/>{TopQuestions.Title}</Link></td>
                  </tr>
                </>
              )
            })}
          </table>
        </div>
      </>
    )
  }
}

export default TopPosts