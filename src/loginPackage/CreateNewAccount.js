import 'bootstrap/dist/css/bootstrap.min.css';
import {Component} from "react/cjs/react.production.min";
import React from 'react'
import {
Label, Modal, ModalHeader, ModalBody, Form, FormGroup,NavLink, Input, ModalFooter, Button
} from 'reactstrap'

class CreateNewAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            last: "",
            first: "",
            modal: false
        }
    }

    toggle = () => {
        this.setState({modal: !this.state.modal});
        if (this.state.modal === false) {
            this.setState({username: ""})
             this.setState({password: ""})
             this.setState({email: ""})
             this.setState({first: ""})
             this.setState({last: ""})
        }
    }
    createUser = () => {
        const data = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            first: this.state.first,
            last: this.state.last
        }
        const reqOptions = {
            method: 'POST',
            headers: {Accept:'application/json', 'Content-Type':'application/json'},
            body: JSON.stringify(data)
        }
        fetch('/createUser/', reqOptions)
            .then(response => response.json())
            .then(
                this.fetchData
            )
    }
    updateProp = (event) => {
        if(event.target.id === "enteredUsername") {
            this.setState({username: event.target.value})
        } else if(event.target.id === "enteredPassword") {
            this.setState({password: event.target.value})
        }else if(event.target.id === "enteredEmail") {
            this.setState({email: event.target.value})
        }else if(event.target.id === "enteredFirst") {
            this.setState({first: event.target.value})
        }else if(event.target.id === "enteredLast") {
            this.setState({last: event.target.value})
        }
    }
    submitForm = () => {
        this.createUser()
        this.toggle()
    }
    render() {
        return (
            <div>
                <NavLink onClick={this.toggle}>Create New Account</NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Create New Account</ModalHeader>
                    <ModalBody className={"m-4"}>
                        <Form>
                            <FormGroup>
                                <Label>Username</Label>
                                <Input type="text" id="enteredUsername" value={this.state.username} onChange={this.updateProp}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input type="text" id="enteredPassword" value={this.state.password} onChange={this.updateProp}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input type="text" id="enteredEmail" value={this.state.email} onChange={this.updateProp}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>First Name</Label>
                                <Input type="text" id="enteredFirst" value={this.state.first} onChange={this.updateProp}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Last Name</Label>
                                <Input type="text" id="enteredLast" value={this.state.last} onChange={this.updateProp}/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.submitForm}>Create Account</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}
export default CreateNewAccount



