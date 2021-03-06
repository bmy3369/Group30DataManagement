import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import CancelButton from "./CancelButton"

class Outgoing extends Component {
    constructor(props) {
        super(props);
    this.state = {
        myRequestArgs: props.requests,
        user: props.user
     }
    }

    render () {
        return (
            <tr >
                <td align={'center'}>{this.state.myRequestArgs[0]}</td>
                <td align={'center'}>{this.state.myRequestArgs[1]}</td>
                <td align={'center'}>{this.state.myRequestArgs[3]}</td>
                <td align={'center'}>{this.state.myRequestArgs[2]}</td>
                <td align={'center'}><CancelButton username={this.state.user}
                                                   requested_tool={this.state.myRequestArgs[1]}
                                                   owner={this.state.myRequestArgs[0]}
                ></CancelButton></td>
            </tr>
        )
    }

}
export default Outgoing;