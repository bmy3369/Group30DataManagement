import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'

class LentTool extends Component {
    constructor(props) {
        super(props);
    this.state = {
        myToolArgs: props.requests
     }
    }

    render () {
        return (
            <tr >
                <td>{this.state.myToolArgs[0]}</td>
                <td>{this.state.myToolArgs[1]}</td>
                <td>{this.state.myToolArgs[2]}</td>
                <td>{this.state.myToolArgs[3]}</td>
            </tr>
        )
    }
}
export default LentTool;