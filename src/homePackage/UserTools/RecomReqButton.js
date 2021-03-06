import 'bootstrap/dist/css/bootstrap.min.css';
import {Component} from "react/cjs/react.production.min";
import React from 'react'
import {
Label, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, ModalFooter, Button, Text, Table,

     Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, CardGroup
} from 'reactstrap'
import AvTool from "./AvTool"
import RecTool from "./RecTool"

class RecomReqButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: props.username,
            requested_tool: props.requested_tool,
            tool_owner: props.tool_owner,
            date_required: "",
            duration: "",
            modal: false,
            rectools: [],
        }

    }

    toggle = () => {
        this.setState({modal: !this.state.modal})
    }

    acceptTool = () => {
        const data = {
            username: this.state.username,
            requested_tool: this.state.requested_tool,
            tool_owner: this.state.tool_owner,
            date_required: this.state.date_required,
            duration: this.state.duration
        }
        const reqOptions = {
            method: 'POST',
            headers: {Accept:'application/json', 'Content-Type':'application/json'},
            body: JSON.stringify(data)
        }
        const getUrl = '/requestTool/' + this.state.requested_tool + "/"
            + this.state.username + "/" + this.state.tool_owner
        fetch( getUrl, reqOptions)
            .then(response => response.json())
            .then(
                this.fetchData
            )
    }

    updateProp = (event) => {
        if(event.target.id === "enteredDuration") {
            this.setState({duration: event.target.value})
        } else if(event.target.id === "enteredDateRequired") {
            this.setState({date_required: event.target.value})
        }
    }
    submitForm = () => {
        this.acceptTool()
        this.toggle()
    }

    render() {
        return (
            <div>
                <Button className="m-2" color="primary" onClick={this.toggle}>Request</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Request this tool?</ModalHeader>
                    <ModalBody className={"m-4"}>
                        <Form>
                            <FormGroup>
                                <Label >This will send a request to {this.state.tool_owner}</Label>
                            </FormGroup>
                            <FormGroup>
                                <Label>Input number of days being requested:</Label>
                                <Input type="text" id="enteredDuration" value={this.state.duration} onChange={this.updateProp}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Input what date the tool is needed by:</Label>
                                <Input type="text" id="enteredDateRequired" value={this.state.date_required}
                                       placeholder="Format: YEAR/MO/DA" onChange={this.updateProp}/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => {this.submitForm();}}>Request Tool</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}
export default RecomReqButton



