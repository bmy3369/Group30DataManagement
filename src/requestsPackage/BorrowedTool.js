import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import {Button} from 'reactstrap';

class BorrowedTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: props.user,
            myBorrowedToolArgs: props.borrowedTools,
            color: 'white'
        }
    }

    /**
     * Calls fetch to delete the request form the database as the tool is returned
     */
    returnTool = () => {
        const data = {
            tool_owner: this.state.myBorrowedToolArgs[0],
            tool_requested: this.state.myBorrowedToolArgs[1],
            date_acquired: this.state.myBorrowedToolArgs[2],
            duration: this.state.myBorrowedToolArgs[3]
        }
        const reqOptions = {
            method: 'POST',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }
        const url = '/returnTool/' + this.state.myBorrowedToolArgs[0] + '/' + this.state.myBorrowedToolArgs[1] + '/' + this.state.currentUser + '/' + this.state.myBorrowedToolArgs[3] + '/' + this.state.myBorrowedToolArgs[2]
        fetch(url, reqOptions)
            .then(response => response.json())
            .then(
                this.fetchData
            )
    }

    submitForm = () => {
        this.returnTool()
    }

    componentDidMount() {
        console.log('user: ' + this.state.currentUser)
        const lendDate = new Date(this.state.myBorrowedToolArgs[2]);
        const returnDate = new Date(lendDate.valueOf());
        returnDate.setDate(returnDate.getDate() + parseInt(this.state.myBorrowedToolArgs[3]))
        if (new Date() > returnDate) {
            this.setState({color: 'red'});
        }
    }


    render() {
        return (
            <tr>
                <td align={'center'}>{this.state.myBorrowedToolArgs[0]}</td>
                <td align={'center'}>{this.state.myBorrowedToolArgs[1]}</td>
                <td bgcolor={this.state.color} align={'center'}>{this.state.myBorrowedToolArgs[2]}</td>
                <td align={'center'}>{this.state.myBorrowedToolArgs[3]}</td>
                <td align={'center'}><Button color={'danger'} onClick={this.submitForm}>Return</Button></td>
            </tr>
        )
    }
}

export default BorrowedTool;