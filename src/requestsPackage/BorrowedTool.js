import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import {Button} from 'reactstrap';

class BorrowedTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myBorrowedToolArgs: props.borrowedTools,
            color: 'white'
        }
        this.dateColor()
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
        const url = '/returnTool/' + this.state.myBorrowedToolArgs[0] + '/' + this.state.myBorrowedToolArgs[1]
        fetch(url, reqOptions)
            .then(response => response.json())
            .then(
                this.fetchData
            )
    }

    submitForm = () => {
        this.returnTool()
    }

    dateColor = () => {
        const lendDate = new Date(this.state.myBorrowedToolArgs[2]);
        const returnDate = new Date(lendDate.valueOf());
        //returnDate.setDate(returnDate.getDate() + this.state.myBorrowedToolArgs[3])
        console.log('lend date: ' + lendDate)
        //console.log('change in date: ' + returnDate.getDate() + this.state.myBorrowedToolArgs[3])
        console.log('return date: ' + returnDate.getDate())
        console.log(new Date() > returnDate)
        const args = this.state.myBorrowedToolArgs.slice();
        args[2] = returnDate;
        this.setState({myBorrowedToolArgs: args})
        if (new Date() > returnDate) {
            this.setState({color: 'red'});
        }
    }

    render() {
        return (
            <tr>
                <td align={'center'}>{this.state.myBorrowedToolArgs[0]}</td>
                <td align={'center'}>{this.state.myBorrowedToolArgs[1]}</td>
                <td bgcolor={this.color} align={'center'}>{this.state.myBorrowedToolArgs[2]}</td>
                <td align={'center'}>{this.state.myBorrowedToolArgs[3]}</td>
                <td align={'center'}><Button color={'danger'} onClick={this.submitForm}>Return</Button></td>
            </tr>
        )
    }
}

export default BorrowedTool;