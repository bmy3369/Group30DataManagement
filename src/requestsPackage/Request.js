import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import { Button } from 'reactstrap';
import AcceptTool from "./AcceptTool"

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
                <td align={'center'}>{this.state.myRequestArgs[0]}</td>
                <td align={'center'}>{this.state.myRequestArgs[1]}</td>
                <td align={'center'}>n/a</td>
                <td align={'center'}>{this.state.myRequestArgs[2]}</td>
                <td align={'center'}><AcceptTool></AcceptTool></td>
                <td align={'center'}><Button color={'danger'}>Deny</Button></td>
            </tr>
        )
    }

}
export default Request;