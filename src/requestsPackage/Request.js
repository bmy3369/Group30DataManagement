import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import { Button } from 'reactstrap';

class Request extends Component {
    constructor(props) {
        super(props);
    this.state = {
        myRequestArgs: props.requests
     }
    }

    render () {
        return (
            <tr >
                <td>{this.state.myRequestArgs[0]}</td>
                <td>{this.state.myRequestArgs[1]}</td>
                <td>n/a</td>
                <td>{this.state.myRequestArgs[2]}</td>
                <td>{this.state.myRequestArgs[4]}</td>
                <td><Button color={'success'}>Accept</Button></td>
                <td><Button color={'danger'}>Deny</Button></td>
            </tr>
        )
    }

}
export default Request;