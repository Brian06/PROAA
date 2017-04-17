import React from 'react'
import {FormGroup,FormControl,form,Button,block,Well,FieldGroup,h5,Label,Table,thead} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import axios from 'axios'
import { browserHistory } from 'react-router';

const wellStyles = {width: '80%', margin: '0 auto 10px', marginTop:'5%'};
const inputStyle = {borderLeftWidth:5, borderLeftColor:'red'}

var itemsv = [];

export default React.createClass({
  
    toNewResource: function (){
        browserHistory.push('/newresource');
    },
    
    /*myResources: function ()
    {
        axios.get('http://localhost:3000/api/myresources/0', {
           
    })
        .then(function (response) {
            console.log(response);
            items = response.data;
            console.log(items)
    })
        .catch(function (error) {
            console.log(error);
    });
},*/
    
getInitialState () { 
     
    this.state = { items:[] };

    this.myResources = (component) => {
    this.setState(this.state);
    axios
    .get("http://localhost:3000/api/myresources/0")
    .then(res => {
        itemsv = res.data;
        this.setState({
        items: itemsv
        })

    console.log(this.state.items);
    })
    .catch(err => console.log(err));
    };

    return this.state = { items:itemsv}
  },
   /* 
    componentDidMount() {
    this.myResources();
  },*/
    
      componentWillMount(){
        this.myResources();
        this.setState({ items: itemsv })
    },
    
	render: function() {
        console.log("aqui")
        console.log(this.state.items)
		var listItems = this.state.items.map(function(item) {
            
			return (
                <tr key={item._id}>
                    <td>{item._id}</td>
                    <td colSpan="2">{item.description}</td>
                </tr>
			);
		});

		return (
            <div>
            <div className="well" style={wellStyles}>
            <h2>My Resources</h2>

            <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Description Name</th>
              </tr>
            </thead>
            <tbody>
            {listItems}
            </tbody>
            </Table>
            
            <Button bsStyle="info" bsSize="small" onClick={this.toNewResource}>
            New
            </Button>
            </div>
            </div> 		
		);
	}
});
