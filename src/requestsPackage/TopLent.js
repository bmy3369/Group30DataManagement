import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import {Button} from 'reactstrap';

class TopLent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: props.user,
            myTop10Args: props.topLent,
            totalTime: 0,
            lentTime: 0,
            percentage: 0,
        }
    }

    componentDidMount() {

        console.log('user: ' + this.state.currentUser)
        const todaysDate = new Date();
        const purchaseDate = new Date(this.state.myTop10Args[3]);
        const totalTime = todaysDate.getTime() - purchaseDate.getTime();
        const totalDays = totalTime / (1000*3600*24);
        const lentTime = (this.state.myTop10Args[4] / this.state.myTop10Args[2]).toFixed(1);
        const percentage = ((this.state.myTop10Args[4] / totalDays) * 100).toFixed(2);
        this.setState({totalTime:totalDays});
        this.setState({lentTime: lentTime})
        this.setState({percentage: percentage})
    }



    render() {
        return (
            <tr>
                <td align={'center'}>{this.state.myTop10Args[1]}</td>
                <td align={'center'}>{this.state.myTop10Args[0]}</td>
                <td align={'center'}>{this.state.myTop10Args[2]}</td>
                <td align={'center'}>{this.state.lentTime} days</td>
                <td align={'center'}>{this.state.percentage}%</td>
            </tr>
        )
    }
}

export default TopLent;