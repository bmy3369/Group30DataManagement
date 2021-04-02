import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'

class Outgoing extends Component {
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
                <td align={'center'}>not JSON serializable smh</td>
                <td align={'center'}>{this.state.myRequestArgs[2]}</td>
                <td align={'center'}>cancel </td>
            </tr>
        )
    }

}
export default Outgoing;