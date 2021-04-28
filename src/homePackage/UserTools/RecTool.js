import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import RequestButton from "./RequestButton"
import{ Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, CardGroup } from 'reactstrap'
import RecomReqButton from "./RecomReqButton"

class RecTool extends Component {
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
            <Card>
                <CardBody>
                    <CardTitle tag="h5">{this.state.myToolArgs[1]} - {this.state.myToolArgs[0]}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">{this.state.myToolArgs[3]}</CardSubtitle>
                    <CardText>{this.state.myToolArgs[2]}
                    <RecomReqButton  username={this.state.user}
                                                    requested_tool={this.state.myToolArgs[0]}
                                                    tool_owner={this.state.myToolArgs[3]}
                ></RecomReqButton>
                    </CardText>
                </CardBody>
            </Card>
        )
    }

}
export default RecTool;