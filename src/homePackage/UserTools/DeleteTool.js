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

class DeleteTool extends Component {
    constructor(props) {
        super(props);

        this.state = {
            /*username: props.user,*/
            tool: props.tool,
            date_required: "",
            modal: false
        }
    }

    toggle = () => {
        this.setState({modal: !this.state.modal});

    }
    deleteTool = () => {
        const data = {
            /*username: this.state.username,*/
            tool: this.state.tool,
            /*duration_requested: this.state.duration_requested,
            date_required: this.state.date_required*/
        }
        const reqOptions = {
            method: 'POST',
            headers: {Accept:'application/json', 'Content-Type':'application/json'},
            body: JSON.stringify(data)
        }
        const getUrl = '/deleteTool/' + this.state.tool
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
        this.deleteTool()
        this.toggle()
    }
    render() {
        return (
            <div>
                <Button className="m-2" color="danger" onClick={this.toggle}>Delete</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Confirm Delete</ModalHeader>
                    <ModalBody className={"m-4"}>
                        <Form>
                            <FormGroup>
                                <Label>Are you sure you want to delete this tool from your toolbox?</Label>
                                <Label>Note: if the tool has been previously borrowed, its history will be saved</Label>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.submitForm}>Delete</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}
export default DeleteTool



