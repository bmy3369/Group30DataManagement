import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'

class LentTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myLentToolArgs: props.lentTools,
            color: 'white'
        }
    }

    componentDidMount() {
        const lendDate = new Date(this.state.myLentToolArgs[2]);
        const returnDate = new Date(lendDate.valueOf());
        returnDate.setDate(returnDate.getDate() + parseInt(this.state.myLentToolArgs[3]))
        if (new Date() > returnDate) {
            this.setState({color: 'red'});
        }
    }

    render() {
        return (
            <tr>
                <td align={'center'}>{this.state.myLentToolArgs[0]}</td>
                <td align={'center'}>{this.state.myLentToolArgs[1]}</td>
                <td bgcolor={this.state.color} align={'center'}>{this.state.myLentToolArgs[2]}</td>
                <td align={'center'}>{this.state.myLentToolArgs[3]}</td>

            </tr>
        )
    }
}

export default LentTool;