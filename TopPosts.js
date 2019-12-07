import React, {Component} from 'react'
import { Accordion, Card, ListGroup, Button } from 'react-bootstrap';
//(Shane) \/ Rewrote code in friendlier format
import fire from '../config/Fire';

const db = fire.firestore();

class TopPosts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }

    /*componentDidMount = () => {
        db.collection("Posts").get().then(snapshot => (
            snapshot.forEach((doc) => (
                this.setState((prevState) => ({
                    posts: [...prevState.posts, {
                        contents: doc.data().Contents
                    }]
                }))
            ))
        ))
    }*/

    componentDidMount() {
        let posts = [];
        db.collection("Posts").get().then((snapshot) => (
            snapshot.forEach((doc) => (
                posts.push({
                    contents: doc.data().Contents
                })
            ))
        ));
        this.setState({ posts })
    }

    render() {
        let ForumInfo = this.state.posts.map((person) => 
            <ListGroup.Item>plz {person.contents}</ListGroup.Item> 
        )

        return (
           <Accordion defaultActiveKey="0">
           <Card>
               <Card.Header>
               <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Most Upvoted Posts
               </Accordion.Toggle>
               </Card.Header>
               <Accordion.Collapse eventKey="0">
               <ListGroup variant="flush">
                   {ForumInfo}
               </ListGroup>
               </Accordion.Collapse>
           </Card>
           <Card>
               <Card.Header>
               <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    Most Upvoted Questions
               </Accordion.Toggle>
               </Card.Header>
               <Accordion.Collapse eventKey="1">
               <Card.Body>Funuk</Card.Body>
               </Accordion.Collapse>
           </Card>
           </Accordion>
        )
    }
}

export default TopPosts;