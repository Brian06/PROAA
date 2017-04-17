import React from 'react'
import NavLink from './NavLink'
import {Navbar,NavItem,Nav,Button} from 'react-bootstrap';
import { IndexLinkContainer,LinkContainer } from 'react-router-bootstrap'
import axios from 'axios';


class Contacts extends React.Component {
    
    constructor(props){
    super(props);
    this.state = { email: ''};
        
    this.checkLog = (component) => {
        this.setState(this.state);
        axios
        .get("http://localhost:3000/api/check")
        .then(res => {
            this.setState({
            email: res.data.email,
            id: res.data.id
            })

        console.log('App check');
        console.log(this.state.email);
        })
        .catch(err => console.log(err));
        };
    }
    
componentDidMount() {
    console.log('Mount log');
    this.checkLog();
  }
    
content() {
    return React.Children.map(this.props.children, child =>
    React.cloneElement(child, {
    checkLog: this.checkLog
      })
    );
  }
    
render() {
    return (
      <div>
        {this.state.email === '' ?  <LoginBar/> : <UserBar onClick={this.checkLog}/>}
        {this.content()}
      </div>
    )
  }
}

export default Contacts;


class LoginBar extends React.Component{
    constructor(props){
    super(props);
    this.logOut = this.logOut.bind(this);
  }
    
    logOut(){
    axios.get("http://localhost:3000/api/logout");
    this.props.onClick();
  }
    
  render() {
    return (
        <div>        
            <Navbar>
                <Navbar.Header>
                  <Navbar.Brand>
                    <LinkContainer  to="/"><a href="#">Avantica Training</a></LinkContainer>
                  </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                  <Nav pullRight>
                  <IndexLinkContainer  to="/login">
                    <NavItem eventKey={ 2 }>Log In</NavItem>
                  </IndexLinkContainer >
                  <IndexLinkContainer  to="/signup">
                    <NavItem eventKey={ 2 }>Sign Up</NavItem>
                  </IndexLinkContainer >
                  </Nav>
                </Navbar.Collapse>
            </Navbar>
        {this.props.children}
      </div>
    )
  }
}

class LoggedBar extends React.Component{
  constructor(props){
    super(props);
    this.logOut = this.logOut.bind(this);
  }
    
  logOut(){
    axios.get("http://localhost:3000/api/logout");
    this.props.onClick();
  }
    
  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">PROAA</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <IndexLinkContainer  to="/topics">
              <NavItem eventKey={ 2 }>Topics</NavItem>
            </IndexLinkContainer >
            <LinkContainer to="/resources">
              <NavItem eventKey={ 3 }>Resources</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <IndexLinkContainer to="/logout">
              <NavItem eventKey={4} onClick={this.logOut}>Log Out</NavItem>
            </IndexLinkContainer >
          </Nav>
        </Navbar>
      </div>
    )
  }
}



class UserBar extends React.Component{

    constructor(props){
    super(props);
    this.logOut = this.logOut.bind(this);
  }
    
    logOut(){
    axios.get("http://localhost:3000/api/logout");
    this.props.onClick();
  }
    
  render() {
    return (
        <div>        
            <Navbar>
                <Navbar.Header>
                  <Navbar.Brand>
                    <LinkContainer  to="/"><a href="#">Avantica Training</a></LinkContainer>
                  </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <IndexLinkContainer  to="/mytopics">
                        <NavItem eventKey={ 2 }>Topics</NavItem>
                    </IndexLinkContainer >
                </Nav>
                <Nav>
                    <IndexLinkContainer  to="/myresources">
                        <NavItem eventKey={ 2 }>Resources</NavItem>
                    </IndexLinkContainer >
                </Nav>
                <Navbar.Collapse>
                  <Nav pullRight>
                    <IndexLinkContainer  to="/">
                        <NavItem eventKey={ 2 } onClick={this.logOut}>Log Out</NavItem>
                    </IndexLinkContainer >
                  </Nav>
                </Navbar.Collapse>
            </Navbar>
        {this.props.children}
      </div>
    )
  }
}