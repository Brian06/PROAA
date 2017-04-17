import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './modules/App'
import Login from './modules/Login'
import Signup from './modules/SignUp'
import Repo from './modules/Repo'
import Home from './modules/Home'
import NewTopic from './modules/NewTopic'
import EditTopic from './modules/EditTopic'
import NewResource from './modules/NewResource'
import MyTopics from './modules/MyTopics'
import MyResources from './modules/MyResources'


render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/signup" component={Signup}>
        <Route path="/repos/:userName/:repoName" component={Repo}/>
      </Route>
      <Route path="/login" component={Login}/>
        <Route path="/newtopic" component={NewTopic}/>
    <Route path="/edittopic" component={EditTopic}/>
    <Route path="/newresource" component={NewResource}/>
    <Route path="/mytopics" component={MyTopics}/>
    <Route path="/myresources" component={MyResources}/>
    </Route>
    
      
    
  </Router>
), document.getElementById('app'))
