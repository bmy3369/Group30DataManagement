import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import {

    Table, Button, Row, Input, Label, Col, ListGroup
} from 'reactstrap';
import Tool from "./Tool";
import AddTool from "./AddTool"

class UserTools extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: props.user,
            tools: [],
            searchParam: "",
            searchType: "category",
        }
    }

    updateAllTools = (allTools) => {
        this.setState({tools: allTools})
    }

    fetchAllTools = () => {
        fetch('/getTools/' + this.state.currentUser)
            .then(
                response => response.json()
            ).then(jsonOutput => {
            this.setState({tools: []})
            this.updateAllTools(jsonOutput)
        })
    }

    componentDidMount() {
        this.fetchAllTools()
    }

    render() {
        return (
            <div className="m-4">
                <h2 className="text-center">Your Tools Available: </h2>
                <h2 className="text-center">Lent Tools: </h2>
                <h2 className="text-center">Borrowed Tools: </h2>
            </div>
        )
    }

}

export default UserTools;