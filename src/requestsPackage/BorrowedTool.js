import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import {Button} from 'reactstrap';

class BorrowedTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myBorrowedToolArgs: props.borrowedTools
        }
    }

    /**
     * Calls fetch to delete the request form the database as the tool is returned
     * In Progress currently
     */
    returnTool = () => {
        const data = {
            username: this.state.myBorrowedToolArgs[0],
            tool_requested: this.state.myBorrowedToolArgs[1]
        }
        const reqOptions = {
            method: 'POST',
            headers: {Accept:'application/json', 'Content-Type':'application/json'},
            body: JSON.stringify(data)
        }
        fetch('/returnTool/', reqOptions)
            .then(response => response.json())
            .then(
                this.fetchData
            )
    }

    render() {
        return (
            <tr>
                <td align={'center'}>{this.state.myBorrowedToolArgs[0]}</td>
                <td align={'center'}>{this.state.myBorrowedToolArgs[1]}</td>
                <td align={'center'}>n/a</td>
                <td align={'center'}>{this.state.myBorrowedToolArgs[2]}</td>
                <td align={'center'}><Button color={'danger'} onClick={this.returnTool()}>Return</Button></td>
            </tr>
        )
    }
}

export default BorrowedTool;