import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import RequestButton from "./RequestButton"


class AvTool extends Component {
    constructor(props) {
        super(props);
    this.state = {
        myToolArgs: props.available,
        user: props.user,
        categories: [],
        listCategories: ""
     }
    }
    displayCategories = () => {
        let myCategories = this.state.categories[0];
        for (let i = 1; i < this.state.categories.length; i++) {
            myCategories += (", " + this.state.categories[i])
        }
        this.setState({listCategories: myCategories})
    }

    updateCategories = (list) => {
        if (list !== null) {
            this.setState({categories: list})
            this.displayCategories()
        }
    }

    fetchCategories = () => {
        fetch('/getToolCategories/' + this.state.myToolArgs[0])
            .then(
                response => response.json()
            ).then(jsonOutput => {
                this.updateCategories(jsonOutput)
        })
    }

    componentDidMount() {
        this.fetchCategories()
    }

    render () {
        return (
            <tr >
                <td align={'center'}>{this.state.myToolArgs[0]}</td>
                <td align={'center'}>{this.state.myToolArgs[1]}</td>
                <td align={'center'}>{this.state.myToolArgs[2]}</td>
                <td align={'center'}>{this.state.listCategories}</td>
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