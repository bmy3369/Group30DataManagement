import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'


class AvTool extends Component {
    constructor(props) {
        super(props);
    this.state = {
        myToolArgs: props.available
     }
    }

    render () {
        return (
            <tr >
                <td align={'center'}>{this.state.myToolArgs[0]}</td>
                <td align={'center'}>{this.state.myToolArgs[1]}</td>
                <td align={'center'}>{this.state.myToolArgs[2]}</td>
                <td align={'center'}>n/a</td>
                <td align={'center'}>n/a</td>
                <td align={'center'}>n/a</td>
                <td align={'center'}>request</td>
            </tr>
        )
    }

}
export default AvTool;