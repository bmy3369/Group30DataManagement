import 'bootstrap/dist/css/bootstrap.min.css';
import {Component} from "react/cjs/react.production.min";
import React from 'react'
import {
Label, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, ModalFooter, Button, ListGroup, ListGroupItem
} from 'reactstrap'

class EditTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wholeTool: props.tool,
            initialCategories: props.categories,
            categories: [],
            modal: false,
            inputCategory: ""
        }
    }

    toggle = () => {
        this.setState({categories: this.state.initialCategories})
        this.setState({modal: !this.state.modal});
    }

    editTool = () => {
        const data = {
            name: this.state.wholeTool[1],
            description: this.state.wholeTool[2],
            purchase_date: this.state.wholeTool[3],
            purchase_price: this.state.wholeTool[4],
        }
        const reqOptions = {
            method: 'PUT',
            headers: {Accept:'application/json', 'Content-Type':'application/json'},
            body: JSON.stringify(data)
        }
        fetch('/editTool/' +this.state.wholeTool[0], reqOptions)
            .then(response => response.json())
    }

    updateProp = (event) => {
        const args = this.state.wholeTool
        if(event.target.id === "enteredName") {
            args[1] = event.target.value
        } else if(event.target.id === "enteredDescription") {
             args[2] = event.target.value
        }else if(event.target.id === "enteredPurchaseDate") {
             args[3] = event.target.value
        }else if(event.target.id === "enteredPurchasePrice") {
             args[4] = event.target.value
        }
        this.setState({wholeTool: args})
    }

    updateUserInput = (event) => {
        this.setState({inputCategory: event.target.value})
    }

    submitForm = () => {
        this.editTool()
        this.toggle()
    }
    removeCategory = (event) => {
        let cats = this.state.categories
        for(let i=0; i < cats.length; i++) {
            let str = cats[i][0]
            let eve = event.target.value
            if (str === eve) {
                console.log("i made it")
                cats.splice(i, 1);
            }
        }
        this.setState({categories: cats})
    }

    displayCategories = (category) => {
        return (
             <Label>{category}
                <Button value={category} onClick={this.removeCategory}>Remove</Button>
             </Label>
        )
    }

    addCategory = () => {
        let cats = this.state.categories
        cats.push([this.state.inputCategory])
        this.setState({categories: cats})
    }

    updateCategories = (list) => {
        if (list !== null) {
            this.setState({initialCategories: list})
        }
    }
    componentDidMount() {
        console.log("MOUNTING")
        fetch('/getToolCategories/' +this.state.wholeTool[0])
            .then(
                response => response.json()
            ).then(jsonOutput => {
                this.updateCategories(jsonOutput)
        })
    }
    render() {
        return (
            <div>
                <Button className="m-2" color="primary" onClick={this.toggle}>Edit</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Create New Tool</ModalHeader>
                    <ModalBody className={"m-4"}>
                        <Form>
                            <FormGroup>
                                <Label>Tool Name</Label>
                                <Input type="text" id="enteredName" value={this.state.wholeTool[1]} onChange={this.updateProp}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Description</Label>
                                <Input type="text" id="enteredDescription" value={this.state.wholeTool[2]} onChange={this.updateProp}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Purchase Date</Label>
                                <Input type="text" id="enteredPurchaseDate" value={this.state.wholeTool[3]} onChange={this.updateProp}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Purchase Price</Label>
                                <Input type="text" id="enteredPurchasePrice" value={this.state.wholeTool[4]} onChange={this.updateProp}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Categories:</Label>
                                 <ListGroup>
                                    {this.state.categories.map(category => this.displayCategories(category))}
                                    <Input type="text" id="inputText" value={this.state.inputCategory} onChange={this.updateUserInput}/>
                                    <Button onClick={this.addCategory}>Add Category</Button>
                                </ListGroup>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.submitForm}>Confirm Edit</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}
export default EditTool



