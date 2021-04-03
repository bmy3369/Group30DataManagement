import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import {
    Button,
    Table
} from 'reactstrap';
import Request from "./Request";

class UserRequests extends Component {
    constructor(props) {
        super(props)
    this.state = {
        currentUser: props.user,
        requests: [],
     }
    }

    updateAllTools = (allRequests) => {
        this.setState({requests: allRequests})
    }

    fetchAllTools = () => {
        fetch('/getRequests/' +this.state.currentUser)
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

    render () {
        return (
            <div className="m-4">
                <Button color={'success'} onClick={this.fetchAllTools}>Refresh</Button>
                 <header className="text-center">Requested Tools</header>
                <Table>
                    <thead>
                        <tr className="text-center">
                            <th>Requestee</th>
                             <th>Tool Requested</th>
                             <th>Date Required</th>
                             <th>Duration</th>
                             <th>Accept</th>
                             <th>Deny</th>
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
export default UserRequests;