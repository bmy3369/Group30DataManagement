import 'bootstrap/dist/css/bootstrap.min.css';
import {Component} from "react/cjs/react.production.min";
import React from 'react'
import {
Label, Modal, ModalHeader, ModalBody, Form, FormGroup, ModalFooter, Button
} from 'reactstrap'

/**
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
*/

class CancelButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: props.username,
            requested_tool: props.requested_tool,
            owner: props.owner,
            modal: false
        }
    }

    toggle = () => {
        this.setState({modal: !this.state.modal})
        /*
        if (this.state.modal === false) {
            this.setState({username: ""})
             this.setState({requested_tool: ""})
             this.setState({tool_owner: ""})
             this.setState({date_required: ""})
             this.setState({duration: ""})
        }
        */
    }
    acceptTool = () => {
        const data = {
            username: this.state.username,
            requested_tool: this.state.requested_tool
        }
        const reqOptions = {
            method: 'POST',
            headers: {Accept:'application/json', 'Content-Type':'application/json'},
            body: JSON.stringify(data)
        }
        const getUrl = '/cancelRequest/' + this.state.requested_tool + "/"
            + this.state.username
        fetch( getUrl, reqOptions)
            .then(response => response.json())
            .then(
                this.fetchData
            )
    }

    submitForm = () => {
        this.acceptTool()
        this.toggle()
    }
    render() {
        return (
            <div>
                <Button className="m-2" color="danger" onClick={this.toggle}>Cancel</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Cancel Pending Request?</ModalHeader>
                    <ModalBody className={"m-4"}>
                        <Form>
                            <FormGroup>
                                <Label>This will cancel your request to {this.state.owner}</Label>
                                <Label>Are you sure about this?</Label>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.submitForm}>Confirm Cancel Request</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}
export default CancelButton



