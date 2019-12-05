import React, {Component} from 'react'
import { Accordion, Card, ListGroup, Button } from 'react-bootstrap';
//(Shane) \/ Rewrote code in friendlier format
import fire from '../config/Fire';

//import { Component } from 'react';
//import GetInfo from '../Functions/GetInfo';

/*function TopPosts() {
    var DInfo = ["Most Liked Question", "Second Most Liked Question", "etc", "etc", "etc..."]; 
    DInfo.push("etc", "etc", "etc", "etc", "Tenth Most Liked Question")
    /*for (var i = 0; i < DInfo.length; i++) {
        if (DInfo[i] != null) {
            DInfo[i] = <ListGroup.Item>{DInfo[i]}</ListGroup.Item>;
        }
    }*/

//const db = fire.firestore();

class TopPosts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Posts: []
            /*people: [
                {
                  id: 1,
                  name: 'db',
                  company: "Some Company, Inc",
                  description: "Met at a party. Will connect with later"
                },
                {
                  id: 2,
                  name: "Mark Markson",
                  company: "Some Company, Inc",
                  description: "Met at a party. Will connect with later"
                },
                {
                  id: 3,
                  name: "Judy Judyson",
                  company: "Some Company, Inc",
                  description: "Met at a party. Will connect with later"
                },
                {
                  id: 4,
                  name: "James Jameson",
                  company: "Some Company, Inc",
                  description: "Met at a party. Will connect with later"
                }
            ]*/
        }
        //this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }



    /*componentDidMount() {
        fire.auth().onAuthStateChanged((Posts) => {
            if(Posts) {
                this.setState({ Posts });
                var ref = fire.firestore().collection('users').doc(this.state.Posts.uid);
                ref.get().then((doc) => {
                    if(doc.exists) {
                        console.log(doc.data());
                        this.setState({
                            Post: doc.data(),
                            key: doc.id
                        })
                    }
                })
            }
        });
    }


    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const itemsRef = firebase.database().ref('items');
        const item = {
            Post: this.state.Posts
        }
        itemsRef.push(Post);
        this.setState({
            Posts: []
        });
    }*/

    async componentDidMount() {
        const fsDB = fire.firestore(); // Don't worry about this line if it comes from your config.
        let Posts = [];
        await fsDB.collection("Posts").get().then(function (querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.id, ' => ', doc.data());
                Posts.push({
                    Contents: doc.data(),
                    Creator: doc.data(),
                    UpVotes: doc.data()
                });
            });
        });
        this.setState({
            Posts
        });
    }

    render() {
        /*let Posts = [];
        fire.auth().onAuthStateChanged((Posts) => {
            if(Posts) {
                this.setState({ Posts });
                var ref = fire.firestore().collection('Posts').doc(this.state.Posts.uid);
                ref.get().then((doc) => {
                    if(doc.exists) {
                        console.log(doc.data());
                        this.setState({
                            Posts
                            //key: doc.id
                        })
                    }
                })
            }
        })*/

        let ForumInfo = this.state.Posts./*people.*/map(person => {
            console.log(this.state);
            const { Posts } = this.state;
            return (
              <ListGroup.Item>{person.Contents}</ListGroup.Item>
            )
        })

        return (
        //export const TopPosts = (props) => (
           <Accordion defaultActiveKey="0">
           <Card>
               <Card.Header>
               <Accordion.Toggle as={Button} variant="link" eventKey="0">
                   Most Upvoted Posts
               </Accordion.Toggle>
               </Card.Header>
               <Accordion.Collapse eventKey="0">
               <ListGroup>
                   {ForumInfo}
               </ListGroup>
               </Accordion.Collapse>
           </Card>
           <Card>
               <Card.Header>
               <Accordion.Toggle as={Button} variant="link" eventKey="1">
                   Most Viewed Posts
               </Accordion.Toggle>
               </Card.Header>
               <Accordion.Collapse eventKey="1">
               <Card.Body>Hello! I'm another body</Card.Body>
               </Accordion.Collapse>
           </Card>
           </Accordion>
        )
    }
}
//    );
//}

export default TopPosts;

/*export const TopPosts = (props) => (
    <Accordion defaultActiveKey="0">
    <Card>
        <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
            Most Upvoted Posts
        </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
        <Card.Body>{GetInfo}</Card.Body>
        </Accordion.Collapse>
    </Card>
    <Card>
        <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="1">
            Most Viewed Posts
        </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
        <Card.Body>Hello! I'm another body</Card.Body>
        </Accordion.Collapse>
    </Card>
    </Accordion>
)*/

//<ListGroup variant="flush">{GetInfo}</ListGroup>