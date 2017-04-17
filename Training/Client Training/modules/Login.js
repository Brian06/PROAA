import React from 'react'
import {FormGroup,FormControl,form,Button,block,Well,FieldGroup,h5,Label,NavLink,Alert} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import axios from 'axios'
import { browserHistory } from 'react-router';
import FacebookLogin from '../public/js/facebookLogin'

const wellStyles = {maxWidth: 400, margin: '0 auto 10px', marginTop:'5%'};
//<Button bsStyle="primary" bsSize="large" block>Log in with Facebook</Button>

class Login extends React.Component{
    
    constructor(props){
        super(props);
        this.state = { inputValue: '', email: '', password: ''};
        this.onChange = this.onChange.bind(this);
        this.searchUser = this.searchUser.bind(this);
  }
    

   /*   handleChangeEmail (event) {
        this.setState({ email: event.target.value }); 
  }
    
    
         handleChangePassword (event) {
        this.setState({ password: event.target.value });  
  }
*/
    onChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }
        
    
    searchUser(e)
    {
        e.preventDefault();
        console.log(this.state.email);
        console.log(this.state.password);
        axios.post('http://localhost:3000/api/searchusers', {
            email: this.state.email,
            password: this.state.password
    })
        .then(function (response) {
            console.log(response);
            this.props.checkLog;
            browserHistory.push('/');
    })
        .catch(function (error) {
            console.log(error);
            alert('Error email/password incorrect');   
    });
}
    
    responseFacebook (response) {
       console.log(response);
        axios.post('http://localhost:3000/api/searchusers', {
            email: response.email,
            password: response.id
    })
        .then(function (response) {
            console.log(response);
            this.props.checkLog();
            browserHistory.push('/');
    })
        .catch(function (error) {
            console.log(error);
            alert('Error email/password incorrect');   
    });
        
  }
    
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
                                 buttonText="Login With Facebook"/>
   
    
    <h5>Log in with your email address</h5>

    
    <form onSubmit={this.searchUser}>
    <FormGroup >
      <FormControl type="text" name="email" placeholder="Email" onChange={this.onChange}/>
    </FormGroup>
    <FormGroup>
      <FormControl type="password" name="password" placeholder="Password" onChange={this.onChange} />
    </FormGroup>
                                     
    <Button type="submit" bsStyle="success" bsSize="small">
    Log In
    </Button>
    <LinkContainer  to="/signup"><h5> Don't have an account? <a href="#">Sing Up</a> </h5></LinkContainer>    
  </form>
    </div>
    </div> 
  }
}

export default Login;
