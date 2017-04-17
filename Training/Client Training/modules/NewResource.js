import React from 'react'
import {FormGroup,FormControl,form,Button,block,Well,FieldGroup,h5,Label,DropdownButton,MenuItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import axios from 'axios'
import { browserHistory } from 'react-router';

const wellStyles = {maxWidth: 400, margin: '0 auto 10px', marginLeft:'10%', marginTop:'5%'};
const inputStyle = {borderLeftWidth:5, borderLeftColor:'red'}
const dropStyle = {borderLeftWidth:5, borderLeftColor:'green'}


var itemsv = [];


export default React.createClass({
  
    getInitialState: function() {
        
        this.state = { items:[], inputValue: '', value:''};
        
        this.topics = (component) => {
        this.setState(this.state);
        axios
        .get("http://localhost:3000/api/topics")
        .then(res => {
            itemsv = res.data;
            this.setState({
            items: itemsv
            })

        console.log(this.state.items);
        })
        .catch(err => console.log(err));
        };
        
        //this.state = { items:itemsv}
        return {title:'Select the Topic', id:''}
        
  },
    
          handleChangeDescription (event) {
        this.setState({ description: event.target.value }); 
  },
    
    
         handleChangeUrl (event) {
        this.setState({ url: event.target.value });  
  },
    

    
    saveNewResource: function ()
{
    console.log(this.state.description);
    console.log(this.state.url);
    console.log(this.state.id);
    axios.post(' http://localhost:3000/api/saveresource', {
        description: this.state.description,
        url: this.state.url,
        //idUser: "1",
        idTopic: this.state.id       
    })
    .then(function (response) {
        console.log(response);
        alert('Resource created successfully');
    })
    .catch(function (error) {
        console.log(error);
        alert('Error, try again');
    });
},
    
     toMyResources: function (){
        browserHistory.push('/myresources');
    },
                     
    componentWillMount(){
        this.topics();
        this.setState({ items: itemsv })
    },
    
    onTargetSelect(target,target2) {
    this.setState({ id: target, title:target2});
  },

    render() {
                  
    let listItems = this.state.items.map(tempOpt => {
     return(
       <MenuItem key={tempOpt._id}
        eventKey={tempOpt._id}
        onSelect={() => this.onTargetSelect(tempOpt._id,tempOpt.name)}>
              {tempOpt.name}
      </MenuItem>
     )
    })
                  
    return <div> 
        
    <div className="well" style={wellStyles}>
    <h2>Add New Resource</h2>
    <br/><br/>
    <form>
    <FormGroup >
      <FormControl type="text" placeholder="Description" style={inputStyle} name="description" value={this.state.description} onChange={this.handleChangeDescription}/>
    </FormGroup>
      <FormGroup >
      <FormControl type="text" placeholder="Url" style={inputStyle} name="url" value={this.state.url} onChange={this.handleChangeUrl}/>
    </FormGroup>
      <FormGroup >
        <DropdownButton title={this.state.title} style={dropStyle} value={this.state.id} onChange={this.handleChange} name="topic">
            {listItems}
        </DropdownButton>
          
      
      
    </FormGroup>
    
      
    <Button bsStyle="info" bsSize="small" onClick={this.saveNewResource}>
    Save
    </Button>
    
    
    <h6><a href="javascript:void(0);" onClick={this.toMyResources}>Back to list</a></h6>
    
            
  </form>
      
      
    </div>
    </div> 
  }
})