import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import {
    Table, Button, Row, Input, Label, Col, ListGroup
} from 'reactstrap';
import Tool from "./Tool";
import AddTool from "./AddTool"

class UserTools extends Component {
    constructor(props) {
        super(props)
    this.state = {
        currentUser: props.user,
        tools: [],
     }
    }

    updateAllTools = (allTools) => {
        this.setState({tools: allTools})
    }

    fetchAllTools = () => {
        fetch('/getTools/' +this.state.currentUser)
            .then(
                response => response.json()
            ).then(jsonOutput => {
                this.updateAllTools(jsonOutput)
        })
    }
    componentDidMount() {
        this.fetchAllTools()
    }

    displayTool = (tool) => {
        return (
            <Tool tools={tool}/>
        );
    }

    render () {
        return (
            <div className="m-4">
                <Row className="m-2">
                     <AddTool user={this.state.currentUser} updateTable={this.fetchAllTools}/>
                    <Button onClick={this.fetchAllTools}>Refresh</Button>
                    <Input className="m-2" type="searchType" id="search" placeholder="Search Params" />
                    <Col xs="auto" className="text-center">
                        <Label>Search Type</Label>
                    </Col>
                    <Col>
                        <Input className="m-2" type="select" name="Search For">
                        <option>name</option>
                         <option>barcode</option>
                         <option>category</option>
                     </Input>
                    </Col>
                </Row>
                 <header className="text-center">Tool List</header>
                <Table>
                    <thead>
                        <tr className="text-center">
                            <th>Barcode</th>
                             <th>Name</th>
                             <th>Desc</th>
                             <th>Categories</th>
                             <th>Purchase Date</th>
                             <th>Purchase Price</th>
                             <th>Borrowable</th>
                             <th>Edit</th>
                             <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="text-left">
                        {this.state.tools.map(tool => this.displayTool(tool))}
                    </tbody>
                </Table>
            </div>
        )
    }

}
export default UserTools;