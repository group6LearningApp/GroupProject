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
 <table width="400" >
   <thead>
    <tr>
      <th>Title</th>
      <th>Content</th>
      <th>Upvotes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{TopPosts.Title}</td>
      <td>{TopPosts.Content}</td>
      <td>{TopPosts.Value}</td> 
     
    </tr>
  </tbody>
</table>
                  
             </div>
            )
            })
          }
        
          <div cass="Question">
 <h1 class="Questions">Top Questions</h1>
          {
            this.state.TopQuestions &&
            this.state.TopQuestions.map(TopQuestions =>{
              return(
              <div>
 <table align="right" class="Questions" width="400" >
   <thead class="Questions">
    <tr class="Questions">
      <th class="Questions">Title</th>
      <th class="Questions">Content</th>
      <th class="Questions">Value</th>
    </tr>
  </thead >
  <tbody class="Questions">
    <tr class="Questions">
      <td class="Questions">{TopQuestions.Title}</td>
      <td class="Questions">{TopQuestions.Content}</td>
      <td class="Questions">{TopQuestions.Value}</td> 
     
    </tr>
  </tbody>
</table>
                  
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
