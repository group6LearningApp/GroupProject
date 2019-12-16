import React, { Component } from 'react';
import {db , auth } from '../config/Fire.js'

//Shane: Displays currently selected Post or Question with its Comments and allows you to write a new comment
export default class PostPage extends Component {
    //Stores Details
    state = {
        NewComment:"",
        Value:0
    }

    //Gets currently selected Post or Question and its Comments
    componentDidMount() {
        const { Col } = this.props.location.state
        const { ID } = this.props.location.state
        db.collection(Col).doc(ID).get().then( doc=>{
            const ThisPost = []
            const data = doc.data()
            ThisPost.push(data)
            this.setState({ThisPost:ThisPost})
        })
        db.collection(Col).doc(ID).collection('Comments').get().then(snapshot =>{
            const Comments = []
            snapshot.forEach(doc => {
                const data = {Content: doc.data().Content, User: doc.data().User, Value: doc.data().Value}
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
            Value: 0
        });
        window.location.reload();
    };

    //Displays selected details
    render() {
        return (
        <>
            <table>
                {this.state.ThisPost && this.state.ThisPost.map(ThisPost =>{
                    return (
                        <>
                            <tr>
                                <th>{ThisPost.Title}</th>
                            </tr>
                            <tr>
                                <td>UpVotes: {ThisPost.Value}</td>
                                <td>{ThisPost.Content}</td>
                            </tr>
                        </>
                    )
                })}

                <tr>Comments</tr>

                {this.state.Comments && this.state.Comments.map(Comments =>{
                    return (
                        <tr>
                            <td>UpVotes: {Comments.Value}</td>
                            <td>{Comments.User}:    {Comments.Content}</td>
                        </tr>
                    )
                })}
            </table>
            <div>
                {/*New Comment Form*/}
                <form onSubmit={this.submitComment}>
                    <div className="NewComment">
                        <label htmlFor="NewComment">Add Comment</label>
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