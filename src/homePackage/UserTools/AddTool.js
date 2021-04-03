import 'bootstrap/dist/css/bootstrap.min.css';
import {Component} from "react/cjs/react.production.min";
import React from 'react'
import {
    Label, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, ModalFooter, Button, ListGroup
} from 'reactstrap'

class AddTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            barcode: "",
            tool_name: "",
            description: "",
            purchase_date: "",
            purchase_price: "",
            shareable: true,
            categories: [],
            inputCategory: "",
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
             this.setState({shareable: true})
        }
    }

    getToolBarcode = () => {
        fetch('/getLastTool/' +this.state.owner)
            .then(response => response.json())
            .then(jsonOutput =>
            this.addToolCategory(jsonOutput))
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
                this.getToolBarcode
            )
    }
    addToolCategory = (barcode) => {
        console.log(this.state.categories)
        for (let i=0; i < this.state.categories.length; i++) {
            let addMe = this.state.categories[i]
            const reqOptions = {
                method: 'POST',
                headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            }
            fetch('/addToolCategory/' + barcode +"/" +addMe, reqOptions)
                .then(response => response.json())
        }
    }
    addCategory = () => {
        let cats = this.state.categories
        cats.push(this.state.inputCategory)
        this.setState({categories: cats})
    }
    removeCategory = (event) => {
        let cats = this.state.categories
        for(let i=0; i < cats.length; i++) {
            let str = cats[i]
            let eve = event.target.value
            if (str === eve) {
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
            let curVal = !this.state.shareable
            this.setState({shareable: curVal})
        }
    }
    updateUserInput = (event) => {
         this.setState({inputCategory: event.target.value})
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
                                <Input type="text" id="enteredPurchaseDate" value={this.state.purchase_date}
                                       placeholder="Format: YEAR/MO/DA" onChange={this.updateProp}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Purchase Price</Label>
                                <Input type="text" id="enteredPurchasePrice" value={this.state.purchase_price}
                                       placeholder="Format: $00.00" onChange={this.updateProp}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Shareable</Label>
                                <Input type="checkbox" id="enteredShareable" value={this.state.shareable} checked={this.state.shareable} onChange={this.updateProp}/>
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
                        <Button color="primary" onClick={this.submitForm}>Create Tool</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}
export default AddTool



