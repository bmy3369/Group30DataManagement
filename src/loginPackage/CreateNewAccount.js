import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import {
Label, Modal, ModalHeader, ModalBody, Form, FormGroup,NavLink, Input, ModalFooter, Button
} from 'reactstrap'

const CreateNewAccount = (props) => {

    const [modal, setModal] = React.useState(false);

    const toggle = () => setModal(!modal);

    const submitForm = () => {
        toggle()
    }
    return (
        <div>
            <NavLink onClick={toggle} >Create New Account</NavLink>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create New Account</ModalHeader>
                <ModalBody className={"m-4"}>
                    <Form>
                        <FormGroup>
                            <Label>Username</Label>
                            <Input type="text" id="enteredUsername" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Password</Label>
                            <Input type="text" id="enteredPassword" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input type="text" id="enteredLast" />
                        </FormGroup>
                        <FormGroup>
                            <Label>First Name</Label>
                            <Input type="text" id="enteredFirst" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Last Name</Label>
                            <Input type="text" id="enteredLast" />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={submitForm}>Create Account</Button>
                </ModalFooter>
            </Modal>
        </div>
    )

}
export default CreateNewAccount



