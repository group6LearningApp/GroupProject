import Select from 'react-select';
import React, { Component } from 'react';
import  fire from '../config/Fire';


//{/* Dummy search results */}
//const options1 = [
  //  { value: 'java', label: 'Java' },
    //{ value: 'python', label: 'Python' },
    //{ value: 'c++', label: 'C++' },
    //{ value: 'c#', label: 'C#' } 
  //];

//let options1 = fire.firestore().collection('tags').doc('Languages');

  //const initialValues = {
  //options:[]
//};


  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
    }, 1000);
  };


class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          options: []
        }
      }
            
        async componentWillMount() {
          const fdb = fire.firestore();
          let options = [];
          await fdb
            .collection("tags")
            .get()
            .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                options.push({
                  value: doc.data().title.replace(/( )/g, ""),
                  label: doc.data().title
                });
              });
            });
          this.setState({
            options
          });
  }

  

            //var ref = fire.firestore().collection('tags').doc('Languages');
            //ref.get().then((doc) => {
              //if(doc.exists) {
                //console.log(doc.data());
                //this.setState({
                  
                  //tags: doc.data(),
                  //key: doc.id
                  
                //})
              //}
            //});
          //}
         
          
        

          render() {
            console.log(this.state);
            const { options } = this.state;
            return (
              <div className="form-group">
                
        
                <Select
                 
                  
                  isMulti
                  classNamePrefix="react-select"
                  value={this.state.selectedValue1}
                  
                  
                  options={options}
                />
              </div>
            );
          }
        }

export default SearchBar;    