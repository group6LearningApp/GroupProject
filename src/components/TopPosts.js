import React from 'react'
import {db , auth } from '../config/Fire.js'
import { Link } from 'react-router-dom';
import { Card, ListGroup, Jumbotron } from 'react-bootstrap';
import '../App.css'

//Shane: Reformated Carls Code, added links to PostPage and Put Bootstrap Format in Comments in case of format change
class TopPosts extends React.Component{
    state = {
       students:null
    }

    componentDidMount(){{
      db.collection('FinalPosts').get().then( snapshot=>{
        const TopPosts = []
        snapshot.forEach(doc=>{
          const data = {Col: 'FinalPosts', ID: doc.id, Fname: doc.data().CreatorFName, Lname: doc.data().CreatorLName, UpVotes: doc.data().UpVotes}
          TopPosts.push(data)
        })
        this.setState({TopPosts:TopPosts})
      })
      .catch(error =>console.log(error))
    }
      db.collection('FinalQuestions').get().then( snapshot=>{
        const TopQuestions = []
        snapshot.forEach(doc=>{
          const data = {Col: 'FinalQuestions', ID: doc.id, Fname: doc.data().CreatorFName, Lname: doc.data().CreatorLName, UpVotes: doc.data().UpVotes}
          TopQuestions.push(data) 
        })
        this.setState({TopQuestions:TopQuestions})
      })
      .catch(error =>console.log(error))
    }
     
    
  render(){
    let GetPost = this.state.TopPosts && this.state.TopPosts.map( TopPosts =>
      <Jumbotron>
      <ListGroup horizontal>
        <ListGroup.Item>Created by: {TopPosts.Fname} {TopPosts.Lname}</ListGroup.Item>
        <ListGroup.Item><Link to={{ pathname: '/PostPage', state: {Col:TopPosts.Col, ID: TopPosts.ID} }}>{TopPosts.ID}</Link></ListGroup.Item>
        <ListGroup.Item>UpVotes: {TopPosts.UpVotes}</ListGroup.Item>
      </ListGroup>
      </Jumbotron>
    )
    let GetQuestion = this.state.TopQuestions && this.state.TopQuestions.map( TopQuestions =>
      <Jumbotron>
      <ListGroup horizontal>
        <ListGroup.Item>Created by: {TopQuestions.Fname} {TopQuestions.Lname}</ListGroup.Item>
        <ListGroup.Item><Link to={{ pathname: "/PostPage", state: {Col:TopQuestions.Col, ID: TopQuestions.ID} }}>{TopQuestions.ID}</Link></ListGroup.Item>
        <ListGroup.Item>UpVotes: {TopQuestions.UpVotes}</ListGroup.Item>
      </ListGroup>
      </Jumbotron>
    )
    return(
      <>
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
    </>
      /*<>
        <div>
          <h1>Top Posts</h1>
          <table align="center" width="400" >
            {this.state.TopPosts && this.state.TopPosts.map(TopPosts =>{
              return(
                <>
                  <tr>
                    <td>Title</td>
                    <td><Link to={{ pathname: '/PostPage', state: {Col:TopPosts.Col, ID: TopPosts.ID} }}>{TopPosts.Title}</Link></td>
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
                    <td><Link to={{ pathname: "/PostPage", state: {Col:TopQuestions.Col, ID: TopQuestions.ID} }}>{TopQuestions.Title}</Link></td>
                  </tr>
                </>
              )
            })}
          </table>
        </div>
      </>*/
    )
  }
}

export default TopPosts