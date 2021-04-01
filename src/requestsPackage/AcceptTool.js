import 'bootstrap/dist/css/bootstrap.min.css';
import {Component} from "react/cjs/react.production.min";
import React from 'react'
import {
Label, Modal, ModalHeader, ModalBody, Form, FormGroup,NavLink, Input, ModalFooter, Button
} from 'reactstrap'

/**
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
*/

class AcceptTool extends Component {
    constructor(props) {
        super(props);

        this.state = {
            /*username: props.user,*/
            requested_tool: props.requested_tool,
            date_required: "",
            modal: false
        }
    }

    toggle = () => {
        this.setState({modal: !this.state.modal});
        /*
        if (this.state.modal === false) {
            this.setState({username: ""})
             this.setState({requested_tool: ""})
             this.setState({duration_requested: ""})
             this.setState({date_required: ""})
        }*/
    }
    acceptTool = () => {
        const data = {
            /*username: this.state.username,*/
            requested_tool: this.state.requested_tool,
            /*duration_requested: this.state.duration_requested,
            date_required: this.state.date_required*/
        }
        const reqOptions = {
            method: 'POST',
            headers: {Accept:'application/json', 'Content-Type':'application/json'},
            body: JSON.stringify(data)
        }
        const getUrl = '/acceptTool/' + this.state.requested_tool
        fetch( getUrl, reqOptions)
            .then(response => response.json())
            .then(
                this.fetchData
            )
    }
    updateProp = (event) => {
        if(event.target.id === "enteredReturnDate") {
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
                <Button className="m-2" color="success" onClick={this.toggle}>Accept</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Accept Request?</ModalHeader>
                    <ModalBody className={"m-4"}>
                        <Form>
                            <FormGroup>
                                <Label>By accepting, you agree to lend this user the specified tool.</Label>
                            </FormGroup>
                            <FormGroup>
                                <Label>Set Return date:</Label>

                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.submitForm}>Accept Request</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}
export default AcceptTool



