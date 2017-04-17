import React from 'react';
import {FormGroup,FormControl,form,Button,block,Well,FieldGroup,h5,Label} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import ReactDOM from 'react-dom';
import axios from 'axios'
import { browserHistory } from 'react-router';


const wellStyles = {maxWidth: 400, margin: '0 auto 10px', marginLeft:'10%', marginTop:'5%'};
const inputStyle = {borderLeftWidth:5, borderLeftColor:'red'};

//const value = document.getElementById("in").value;
//
//var valor = document.getElementById("nombre").value;
//<input type="text" name="nombre" id="nombre" class="nombre" value=""/> 

//
// 
    
export default React.createClass({
    

  getInitialState: function() {
    return {
      inputValue: ''
    }
  },
    
      handleChange (event) {
    this.setState({ value: event.target.value });
  },
    
    
    saveNewTopic: function ()
{
    console.log(this.state.value)
    axios.post('http://localhost:3000/api/topics', {
    name: this.state.value,
    //idUser: "1"
        
    })
    .then(function (response) {
        console.log(response);
        alert('Topic created successfully');
    })
    .catch(function (error) {
        console.log(error);
        alert('Error, try again');
    });
},
    
    toMyTopics: function (){
        browserHistory.push('/mytopics');
    },
    
    
  render() {
    return <div> 
        
    <div className="well" style={wellStyles}>
    <h2>Add Topic</h2>
   
    <h5><b>Name:</b></h5>
    
    <form>

        <FormGroup >
             <FormControl type="text" placeholder="Topic Name" ref="myFormControl" style={inputStyle} value={this.state.value} onChange={this.handleChange} />
             <FormControl.Feedback />
        </FormGroup>

        <Button bsStyle="info" bsSize="small" onClick={this.saveNewTopic}>
            Save
        </Button>

        
            <h6><a href="javascript:void(0);" onClick={this.toMyTopics}>Back to list</a></h6>
        

    </form>
           
    </div>
    </div> 
  }
      

});




