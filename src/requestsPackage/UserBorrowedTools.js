import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import {
    Button, Table, Row, Input, Label, Col
} from 'reactstrap';
import BorrowedTool from "./BorrowedTool";

/**
 * this most likely needs to be changed, it's mostly copied from the UserRequests page, it is updated in the render
 * function but I don't know what to do with the smaller functions
 */
class BorrowedTools extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: props.user,
            borrowedTools: [],
        }
    }

    updateAllTools = (allTools) => {
        this.setState({borrowedTools: allTools})
    }

    fetchAllTools = () => {
        fetch('/getBorrowedTools/' + this.state.currentUser)
            .then(
                response => response.json()
            ).then(jsonOutput => {
            this.updateAllTools(jsonOutput)
        })
    }

    componentDidMount() {
        this.fetchAllTools()
    }

    displayTools = (borrowedTools) => {
        return (
            <BorrowedTool borrowedTools={borrowedTools}/>
        );
    }

    render() {
        return (
            <div className="m-4">
                <Button color={'success'} onClick={this.fetchAllTools}>Refresh</Button>
                <header className="text-center">Borrowed Tools</header>
                <Table>
                    <thead>
                    <tr className="text-center">
                        <th>Tool Owner</th>
                        <th>Tool Borrowed</th>
                        <th>Date Required</th>
                        <th>Duration</th>
                        <th>Return Tool</th>
                    </tr>
                    </thead>
                    <tbody className="text-left">
                    {this.state.borrowedTools.map(borrowedTools => this.displayTools(borrowedTools))}
                    </tbody>
                </Table>
            </div>
        )
    }

}

export default BorrowedTools;