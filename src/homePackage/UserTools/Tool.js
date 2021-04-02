import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'

import DeleteTool from "./DeleteTool"

class Tool extends Component {
    constructor(props) {
        super(props);
    this.state = {
        myToolArgs: props.tools
     }
    }

    render () {
        return (
            <tr >
                <td>{this.state.myToolArgs[0]}</td>
                <td>{this.state.myToolArgs[1]}</td>
                <td>{this.state.myToolArgs[2]}</td>
                <td>n/a</td>
                <td>n/a</td>
                <td>n/a</td>
                <td>{this.state.myToolArgs[4]}</td>
                <td>edit</td>
                <td><DeleteTool tool={this.state.myToolArgs[0]}></DeleteTool></td>
            </tr>
        )
    }

}
export default Tool;