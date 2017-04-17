import React from 'react'
import {FormGroup,FormControl,form,Button,block,Well,FieldGroup,h5,Label,NavLink} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import axios from 'axios'
import { browserHistory } from 'react-router';
import FacebookLogin from '../public/js/facebookLogin'

const wellStyles = {maxWidth: 400, margin: '0 auto 10px', marginTop:'5%'};



export default React.createClass({
  
  getInitialState: function() {
    return {
      inputValue: ''
    }
  },
    
      handleChangeEmail (event) {
        this.setState({ email: event.target.value }); 
  },
    
    
         handleChangePassword (event) {
        this.setState({ password: event.target.value });  
  },
    
    
         handleChangeName (event) {
        this.setState({ name: event.target.value }); 
  },
    
    
    saveUser: function ()
    {
        console.log(this.state.email)
        console.log(this.state.password)
        console.log(this.state.name)
        axios.post('http://localhost:3000/api/saveusers', {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name
    })
        .then(function (response) {
            console.log(response);
            alert('Your registration was successful');
            browserHistory.push('/login');
            
    })
        .catch(function (error) {
            console.log(error);
            alert('Error, try again');
    });
},
    
    responseFacebook (response) {
        console.log(response.email)
        console.log(response.name)
        console.log(response.id)
        axios.post('http://localhost:3000/api/saveusers', {
            email: response.email,
            password: response.id,
            name: response.name
    })
        .then(function (response) {
            console.log(response);
            alert('Your registration was successful');
            browserHistory.push('/login');
            
    })
        .catch(function (error) {
            console.log(error);
            alert('Error, try again');
    });
  },

    
    render() {
    return <div> 
        
    <div className="well" style={wellStyles}>
    <FacebookLogin appId= "384341465265776"
                                 language="en_US"
                                 scope="public_profile,email"
                                 responseHandler={this.responseFacebook}
                                 xfbml={true}
                                 fields="id,email,name"
                                 version="v2.5"
                                 class="facebook-login"
                                 buttonText="Sign up With Facebook"/>
   
    
    <h5>Sign up with your email address</h5>

    
    <form>
        <FormGroup >
          <FormControl type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChangeEmail}/>
        </FormGroup>
        <FormGroup>
          <FormControl type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChangePassword}/>
        </FormGroup>
        <FormGroup>
          <FormControl type="text" placeholder="Name" name="name" value={this.state.value} onChange={this.handleChangeName}/>
        </FormGroup>

        <Button bsStyle="success" bsSize="small" onClick={this.saveUser}>
        Sign up
        </Button>
        <LinkContainer  to="/login"><h5> Already have an account?  <a href="/#">Log In</a> </h5></LinkContainer >       
    </form>
      
      
    </div>
    </div> 
  }
})