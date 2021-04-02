import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import {
    Table, Row, Input, Label, Col
} from 'reactstrap';
import LentTool from "./LentTool";

/**
 * this most likely needs to be changed, it's mostly copied from the UserRequests page, it is updated in the render
 * function but I don't know what to do with the smaller functions
 */
class UserLentTools extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: props.user,
            lentTools: [],
        }
    }

    /**
     * Sets the lentTools variable in state
     * @param allTools an array of lent tools
     */
    updateAllTools = (allTools) => {
        this.setState({lentTools: allTools})
    }

    /**
     * Gets the tools from the database through the server
     */
    fetchAllTools = () => {
        fetch('/getLentTools/' + this.state.currentUser)
            .then(
                response => response.json()
            ).then(jsonOutput => {
            this.updateAllTools(jsonOutput)
        })
    }

    componentDidMount() {
        this.fetchAllTools()
    }

    /**
     * Formats the tools into a form usable in html
     * @param lentTools the array of tools
     * @returns {JSX.Element} a html representation of the tools from the database
     */
    displayTools = (lentTools) => {
        return (
            <LentTool lentTools={lentTools}/>
        );
    }

    render() {
        return (
            <div className="m-4">
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
                    {this.state.lentTools.map(lentTools => this.displayTools(lentTools))}
                    </tbody>
                </Table>
            </div>
        )
    }

}

export default UserLentTools;