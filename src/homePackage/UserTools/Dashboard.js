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

    displayTool = (tool) => {
        return (
            <Tool tools={tool}/>
        );
    }

    fetchSearch = (searchtype) => {
        fetch(searchtype + this.state.currentUser + "/" + this.state.searchParam)
            .then(
                response => response.json()
            ).then(jsonOutput => {
            console.log(jsonOutput)
            this.setState({tools: []})
            this.updateAllTools(jsonOutput)
        })
    }

    render() {
        return (
            <div className="m-4">
                <header className="text-center">Tool List</header>
                <h2 className="text-center">Your Tools Available: </h2>
                <h2 className="text-center">Lent Tools: </h2>
                <h2 className="text-center">Borrowed Tools: </h2>
            </div>
        )
    }

}

export default UserTools;