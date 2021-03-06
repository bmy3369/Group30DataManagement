import 'bootstrap/dist/css/bootstrap.min.css';
import {Component} from "react/cjs/react.production.min";
import React from 'react'
import {
Label, Modal, ModalHeader, ModalBody, Form, FormGroup, ModalFooter, Button
} from 'reactstrap'

class DenyTool extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: props.username,
            requested_tool: props.requested_tool,
            date_required: "",
            modal: false
        }
    }

    toggle = () => {
        this.setState({modal: !this.state.modal});

    }
    denyTool = () => {
        const data = {
            username: this.state.username,
            requested_tool: this.state.requested_tool,
            /*date_required: this.state.date_required*/
        }
        const reqOptions = {
            method: 'POST',
            headers: {Accept:'application/json', 'Content-Type':'application/json'},
            body: JSON.stringify(data)
        }
        const getUrl = '/denyTool/' + this.state.requested_tool + "/" + this.state.username
        fetch( getUrl, reqOptions)
            .then(response => response.json())
            .then(
                this.fetchData
            )
    }

    submitForm = () => {
        this.denyTool()
        this.toggle()
    }
    render() {
        return (
            <div>
                <Button className="m-2" color="danger" onClick={this.toggle}>Deny</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Deny Request?</ModalHeader>
                    <ModalBody className={"m-4"}>
                        <Form>
                            <FormGroup>
                                <Label>Denying will remove this request from your inbound requests list.</Label>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.submitForm}>Confirm Deny</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}
export default DenyTool



