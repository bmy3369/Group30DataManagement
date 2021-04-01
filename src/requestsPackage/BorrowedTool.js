import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'

class BorrowedTool extends Component {
    constructor(props) {
        super(props);
    this.state = {
        myBorrowedToolArgs: props.borrowedTools
     }
    }

    render () {
        return (
            <tr >
                <td align={'center'}>{this.state.myBorrowedToolArgs[0]}</td>
                <td align={'center'}>{this.state.myBorrowedToolArgs[1]}</td>
                <td align={'center'}>n/a</td>
                <td align={'center'}>{this.state.myBorrowedToolArgs[2]}</td>
            </tr>
        )
    }
}
export default BorrowedTool;