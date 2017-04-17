import React from 'react'
import {FormGroup,FormControl,form,Button,block,Well,FieldGroup,h5,Label,NavLink,Table,thead} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import axios from 'axios'

const wellStyles = {width: '80%', margin: '0 auto 10px', marginTop:'5%'};
const inputStyle = {borderLeftWidth:5, borderLeftColor:'red'}


var itemsv = [];

export default React.createClass({

    
getInitialState () { 

    this.state = { items:[] };

    this.topten = (component) => {
    this.setState(this.state);
    axios
    .get("http://localhost:3000/api/top10")
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
    topten: function ()
    {
        axios.get('http://localhost:3000/api/top10', {
           
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
    
   componentWillMount(){
        this.topten();
        this.setState({ items: itemsv })
    },
    
	render: function() {
        console.log("aqui")
            console.log(this.state.items)
		var listItems = this.state.items.map(function(item) {
            
			return (
                <tr key={item._id}>
                    <td>{item.name}</td>
                    <td colSpan="2">{item.resources.length}</td>
                </tr>
			);
		});

		return (
            <div>
            <div className="well" style={wellStyles}>
            <h2>Top Ten Topics</h2>

            <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Topic</th>
                <th>Resources</th>
              </tr>
            </thead>
            <tbody>
            {listItems}
            </tbody>
            </Table>
           
            </div>
            </div> 		
		);
	}
});
