import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import { Button } from 'reactstrap';
import AcceptTool from "./AcceptTool"
import DenyTool from "./DenyTool"

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
                <td align={'center'}><AcceptTool requested_tool={this.state.myRequestArgs[1]} user={this.state.myRequestArgs[0]}></AcceptTool></td>
                <td align={'center'}><DenyTool requested_tool={this.state.myRequestArgs[1]} user={this.state.myRequestArgs[0]}></DenyTool></td>
            </tr>
        )
    }

}
export default Request;