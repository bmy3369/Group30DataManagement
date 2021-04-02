import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import {
    Table, Row, Input, Label, Col
} from 'reactstrap';
import AvTool from "./AvTool";

class AvailableTools extends Component {
    constructor(props) {
        super(props)
    this.state = {
        currentUser: props.user,
        available: [],
     }
    }

    updateAllTools = (allTools) => {
        this.setState({available: allTools})
        this.setState({user: this.state.currentUser})
    }

    fetchAllTools = () => {
        fetch('/getAvailableTools/' +this.state.currentUser)
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
            <AvTool available={tool} user={this.state.currentUser}/>
        );
    }

    render () {
        return (
            <div className="m-4">
                <Row className="m-2">
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
                             <th>Tool Name</th>
                             <th>Desc.</th>
                             <th>Categories</th>
                            <th>Owned by</th>
                             <th>Request</th>
                        </tr>
                    </thead>
                    <tbody className="text-left">
                        {this.state.available.map(available => this.displayTool(available))}
                    </tbody>
                </Table>
            </div>
        )
    }

}
export default AvailableTools;