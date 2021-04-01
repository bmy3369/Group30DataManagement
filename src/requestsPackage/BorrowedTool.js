import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import {Button} from 'reactstrap';

class BorrowedTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myBorrowedToolArgs: props.borrowedTools,
            color: 'danger',
            modal: false
        }
    }

    /**
     * Simple test function to make sure that program didn't hang up on returnTool
     * Will delete later
     */
    toggle = () => {
        this.setState({modal: !this.state.modal});
        if (this.state.modal === false) {
            this.setState({color: 'success'});
        }
    }

    /**
     * Calls fetch to delete the request form the database as the tool is returned
     * In Progress currently
     */
    returnTool = () => {
        const data = {
            tool_owner: this.state.myBorrowedToolArgs[0],
            tool_requested: this.state.myBorrowedToolArgs[1]
        }
        const reqOptions = {
            method: 'POST',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }
        fetch('/returnTool/' + reqOptions)
            .then(response => response.json())
            .then(
                this.fetchData
            )
    }

    submitForm = () => {
        this.returnTool()
        this.toggle()
    }

    render() {
        return (
            <tr>
                <td align={'center'}>{this.state.myBorrowedToolArgs[0]}</td>
                <td align={'center'}>{this.state.myBorrowedToolArgs[1]}</td>
                <td align={'center'}>n/a</td>
                <td align={'center'}>{this.state.myBorrowedToolArgs[2]}</td>
                <td align={'center'}><Button color={this.state.color} onClick={this.submitForm}>Return</Button></td>
            </tr>
        )
    }
}

export default BorrowedTool;