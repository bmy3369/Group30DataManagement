import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import {
    Table, Button, Row, Input, Label, Col
} from 'reactstrap';
import Request from "./Request";

/**
 * this most likely needs to be changed, it's mostly copied from the UserRequests page, it is updated in the render
 * function but I don't know what to do with the smaller functions
 */
class LentTools extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: props.user,
            requests: [],
        }
    }

    updateAllTools = (allTools) => {
        this.setState({requests: allTools})
    }

    fetchAllTools = () => {
        fetch('/getUserLentTools/' + this.state.currentUser)
            .then(
                response => response.json()
            ).then(jsonOutput => {
            this.updateAllTools(jsonOutput)
        })
    }

    componentDidMount() {
        this.fetchAllTools()
    }

    displayRequests = (requests) => {
        return (
            <Request requests={requests}/>
        );
    }

    render() {
        return (
            <div className="m-4">
                <Row className="m-2">
                    <Input className="m-2" type="searchType" id="search" placeholder="Search Params"/>
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
                <header className="text-center">Lent Tools</header>
                <Table>
                    <thead>
                    <tr className="text-center">
                        <th>Borrower</th>
                        <th>Tool Requested</th>
                        <th>Date Required</th>
                        <th>Duration</th>
                    </tr>
                    </thead>
                    <tbody className="text-left">
                    {this.state.requests.map(requests => this.displayRequests(requests))}
                    </tbody>
                </Table>
            </div>
        )
    }

}

export default LentTools;