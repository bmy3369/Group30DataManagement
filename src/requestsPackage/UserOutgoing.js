import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import {
    Table, Row, Input, Label, Col
} from 'reactstrap';
import Outgoing from "./Outgoing";

class UserOutgoing extends Component {
    constructor(props) {
        super(props)
    this.state = {
        currentUser: props.user,
        requests: [],
     }
    }

    updateAllTools = (allRequests) => {
        this.setState({requests: allRequests})
        this.setState({user: this.state.currentUser})
    }

    fetchAllTools = () => {
        fetch('/getOutgoing/' +this.state.currentUser)
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
            <Outgoing requests={requests} user={this.state.currentUser}/>
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
                 <header className="text-center">Requested Tools</header>
                <Table>
                    <thead>
                        <tr className="text-center">
                            <th>Tool Owner</th>
                             <th>Tool Requested</th>
                             <th>Date Required</th>
                             <th>Duration</th>
                             <th>Cancel</th>
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
export default UserOutgoing;