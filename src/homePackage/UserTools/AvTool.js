import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import RequestButton from "./RequestButton"


class AvTool extends Component {
    constructor(props) {
        super(props);
    this.state = {
        myToolArgs: props.available,
        user: props.user
     }
    }

    render () {
        return (
            <tr >
                <td align={'center'}>{this.state.myToolArgs[0]}</td>
                <td align={'center'}>{this.state.myToolArgs[1]}</td>
                <td align={'center'}>{this.state.myToolArgs[2]}</td>
                <td align={'center'}>n/a</td>
                <td align={'center'}>{this.state.myToolArgs[3]}</td>
                <td align={'center'}><RequestButton username={this.state.user}
                                                    requested_tool={this.state.myToolArgs[0]}
                                                    tool_owner={this.state.myToolArgs[3]}
                ></RequestButton></td>
            </tr>
        )
    }

}
export default AvTool;