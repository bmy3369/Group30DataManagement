import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'

class LentTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myLentToolArgs: props.lentTools
        }
    }

    render() {
        return (
            <tr>
                <td align={'center'}>{this.state.myLentToolArgs[0]}</td>
                <td align={'center'}>{this.state.myLentToolArgs[1]}</td>
                <td align={'center'}>{this.state.myLentToolArgs[2]}</td>
                <td align={'center'}>{this.state.myLentToolArgs[3]}</td>

            </tr>
        )
    }
}

export default LentTool;