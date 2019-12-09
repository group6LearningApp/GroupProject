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

    /*componentDidMount() {
        let posts = [];
        db.collection("Posts").get().then((snapshot) => (
            snapshot.forEach((doc) => (
                posts.push({
                    contents: doc.data().Contents
                })
            ))
        ));
        this.setState({ posts })
    }*/

    updateInput = e => {
        this.setState({
            [e.target.contents]: e.target.value
        });
    }

    addUser = e => {
        e.preventDefault();
        let posts = [];
        db.settings({
        timestampsInSnapshots: true
        });
        const userRef = db.collection("Posts").get.then(snapshot => {
            posts.push({
                contents: this.state.Contents
            })
        });  
        this.setState({
            userRef
        });
    };

    /*async componentDidMount() {
        let posts = [];
        await db.collection("Posts").get().then(function (querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.id, ' => ', doc.data());
                posts.push({ contents: doc.data().Contents.replace(/( )/g, ''), });
            });
        });
        this.setState({
          posts
        });
    }*/

    /*handleSubmit = (formState, { resetForm }) => {
      // Now, you're getting form state here!
      const fdb = fire.firestore();
      const payload = {
        ...formState,
        fieldOfResearch: formState.fieldOfResearch.map(t => t.value)
      }
      console.log("formvalues", payload);
      fdb
      .collection("project")
      .add(payload)
      .then(docRef => {
        console.log("docRef>>>", docRef);
        resetForm(TopPosts);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
    }*/

    render() {
        let ForumInfo = this.state.posts.map((person) => 
            <ListGroup.Item>{person.contents}</ListGroup.Item> 
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