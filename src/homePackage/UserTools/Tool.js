import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'

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
                <td align={'center'}>{this.state.myToolArgs[0]}</td>
                <td align={'center'}>{this.state.myToolArgs[1]}</td>
                <td align={'center'}>{this.state.myToolArgs[2]}</td>
                <td align={'center'}>n/a</td>
                <td align={'center'}>>n/a</td>
                <td align={'center'}>n/a</td>
                <td align={'center'}>{this.state.myToolArgs[4]}</td>
                <td align={'center'}>edit</td>
                <td align={'center'}>delete</td>
            </tr>
        )
    }

}
export default Tool;