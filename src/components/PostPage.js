import React, { Component } from 'react';
import { db , auth } from '../config/Fire.js'
import { Card, ListGroup, Jumbotron } from 'react-bootstrap';
import '../App.css';

//Shane: Displays currently selected Post or Question with its Comments and allows you to write a new comment
export default class PostPage extends Component {
    //Stores Details
    state = {
        NewComment: ""
    }

    //Gets currently selected Post or Question and its Comments
    componentDidMount() {
        const { Col } = this.props.location.state
        const { ID } = this.props.location.state
        db.collection(Col).doc(ID).get().then( doc=>{
            const ThisPrQ = []
            const data = {ID: doc.id, Content: doc.data().Content, Fname: doc.data().CreatorFName, Lname: doc.data().CreatorLName, UpVotes: doc.data().UpVotes}
            ThisPrQ.push(data)
            this.setState({ThisPrQ:ThisPrQ})
        })
        db.collection(Col).doc(ID).collection('Comments').get().then(snapshot =>{
            const Comments = []
            snapshot.forEach(doc => {
                const data = doc.data()
                Comments.push(data)
            })
            this.setState({Comments:Comments})
        })
    }

    //Adds details to state
    updateInput = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
    }

    //Adds new comment and refreshs the page
    submitComment = e => {
        e.preventDefault();
        db.settings({
              timestampsInSnapshots: true
        });
        const { Col } = this.props.location.state
        const { ID } = this.props.location.state
        const userRef = db.collection(Col).doc(ID).collection('Comments').add({
            Content: this.state.NewComment,
            UpVotes: 0
        });
        window.location.reload();
    };

    //Displays selected details
    render() {
        return (
        <>
            <Card>
                {this.state.ThisPrQ && this.state.ThisPrQ.map(ThisPrQ =>{
                    return (
                        <>
                            <Card.Header>{ThisPrQ.ID}</Card.Header>
                            <Jumbotron>
                            <ListGroup horizontal>
                                <ListGroup.Item>UpVotes: {ThisPrQ.UpVotes}</ListGroup.Item>
                                <ListGroup.Item>{ThisPrQ.Content}</ListGroup.Item>
                            </ListGroup>
                            </Jumbotron>
                        </>
                    )
                })}     
                <ListGroup>
                    <ListGroup.Item>Comments</ListGroup.Item>
                    {this.state.Comments && this.state.Comments.map(Comments =>{
                        return (
                            <ListGroup horizontal>
                                <ListGroup.Item>UpVotes: {Comments.UpVotes}</ListGroup.Item>
                                <ListGroup.Item>{Comments.Content}</ListGroup.Item>
                            </ListGroup>
                        )
                    })}
                </ListGroup>
            </Card>
            <div>
                {/*New Comment Form*/}
                <form onSubmit={this.submitComment}>
                    <div className="NewComment">
                        <label htmlFor="NewComment"></label>
                        <textarea
                            type="text" 
                            className="NewComment" 
                            placeholder="Type your Comment here"
                            value={this.state.NewComment} 
                            onChange={this.updateInput}
                            name="NewComment" 
                            noValidate
                        />
                    </div>
                    <button type="submit" className="submit">Add Comment</button>
                </form>
            </div>
        </>
        )
    }
}