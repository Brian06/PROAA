import React from 'react'
import {FormGroup,FormControl,form,Button,block,Well,FieldGroup,h5,Label,NavLink} from 'react-bootstrap';

const wellStyles = {maxWidth: 400, margin: '0 auto 10px', marginLeft:'10%', marginTop:'5%'};
const inputStyle = {borderLeftWidth:5, borderLeftColor:'green'}


export default React.createClass({
  render() {
    return <div> 
        
    <div className="well" style={wellStyles}>
    <h2>Edit Topic</h2>
   
    
    <h5><b>Name:</b></h5>

    
    <form>
    <FormGroup >
      <FormControl type="text" placeholder="Topic Name" style={inputStyle}/>
    </FormGroup>
    
      
    <Button bsStyle="info" bsSize="small">
    Save
    </Button>
    <h6><a href="/signup">Back to list</a> </h6>
      
      
          
  </form>
      
      
    </div>
    </div> 
  }
})