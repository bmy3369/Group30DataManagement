import 'bootstrap/dist/css/bootstrap.min.css';
import {Component} from "react/cjs/react.production.min";
import React from 'react'
import {
Label, Modal, ModalHeader, ModalBody, Form, FormGroup,NavLink, Input, ModalFooter, Button
} from 'reactstrap'

class AddTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tool_name: "",
            description: "",
            purchase_date: "",
            purchase_price: "",
            shareable: false,
            owner: props.user,
            modal: false,
        }
    }

    toggle = () => {
        this.setState({modal: !this.state.modal});
        if (this.state.modal === false) {
            this.setState({tool_name: ""})
             this.setState({description: ""})
             this.setState({purchase_date: ""})
             this.setState({purchase_price: ""})
             this.setState({shareable: false})
        }
    }
    createTool = () => {
        const data = {
            name: this.state.tool_name,
            description: this.state.description,
            purchase_date: this.state.purchase_date,
            purchase_price: this.state.purchase_price,
            shareable: this.state.shareable,
            owner: this.state.owner
        }
        const reqOptions = {
            method: 'POST',
            headers: {Accept:'application/json', 'Content-Type':'application/json'},
            body: JSON.stringify(data)
        }
        fetch('/createTool/', reqOptions)
            .then(response => response.json())
            .then(
                this.fetchData
            )
        this.updateTool()
    }
    updateTool = () => {
        this.props.updateTable()
    }

    updateProp = (event) => {
        if(event.target.id === "enteredName") {
            this.setState({tool_name: event.target.value})
        } else if(event.target.id === "enteredDescription") {
            this.setState({description: event.target.value})
        }else if(event.target.id === "enteredPurchaseDate") {
            this.setState({purchase_date: event.target.value})
        }else if(event.target.id === "enteredPurchasePrice") {
            this.setState({purchase_price: event.target.value})
        }else if(event.target.id === "enteredShareable") {
            this.setState({shareable: event.target.value})
        }
    }
    submitForm = () => {
        this.createTool()
        this.toggle()
    }
    render() {
        return (
            <div>
                <Button className="m-2" color="primary" onClick={this.toggle}>+ New Tool</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Create New Tool</ModalHeader>
                    <ModalBody className={"m-4"}>
                        <Form>
                            <FormGroup>
                                <Label>Tool Name</Label>
                                <Input type="text" id="enteredName" value={this.state.tool_name} onChange={this.updateProp}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Description</Label>
                                <Input type="text" id="enteredDescription" value={this.state.description} onChange={this.updateProp}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Purchase Date</Label>
                                <Input type="text" id="enteredPurchaseDate" value={this.state.purchase_date} onChange={this.updateProp}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Purchase Price</Label>
                                <Input type="text" id="enteredPurchasePrice" value={this.state.purchase_price} onChange={this.updateProp}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Shareable</Label>
                                <Input type="checkbox" id="enteredShareable" value={this.state.shareable} onChange={this.updateProp}/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.submitForm}>Create Tool</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}
export default AddTool



