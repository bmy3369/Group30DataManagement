import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import {Button} from 'reactstrap';

class TopBorrowed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: props.user,
            myTop10Args: props.topBorrowed,
        }
    }


    render() {
        return (
            <tr>
                <td align={'center'}>uhhh wip</td>
                <td align={'center'}>{this.state.myTop10Args[0]}</td>
                <td align={'center'}>{this.state.myTop10Args[1]}</td>
            </tr>
        )
    }
}

export default TopBorrowed;