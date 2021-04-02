import 'bootstrap/dist/css/bootstrap.min.css';
import {Component} from "react/cjs/react.production.min";
import React from 'react'
import {
Label, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, ModalFooter, Button, ListGroup
} from 'reactstrap'

class EditTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wholeTool: props.tool,
            initialCategories: props.categories,
            categories: [],
            categoriesToDelete: [],
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
            shareable: this.state.wholeTool[5]
        }
        const reqOptions = {
            method: 'PUT',
            headers: {Accept:'application/json', 'Content-Type':'application/json'},
            body: JSON.stringify(data)
        }
        fetch('/editTool/' +this.state.wholeTool[0], reqOptions)
            .then(response => response.json())
    }

    addToolCategory = () => {
        for (let i=0; i < this.state.categories.length; i++) {
            let addMe = this.state.categories[i][0]
            const reqOptions = {
                method: 'POST',
                headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            }
            fetch('/addToolCategory/' + this.state.wholeTool[0] +"/" +addMe, reqOptions)
                .then(response => response.json())
        }
    }
    removeToolCategory = () => {
        for (let i=0; i < this.state.categoriesToDelete.length; i++) {
            let addMe = this.state.categoriesToDelete[i]
            const reqOptions = {
                method: 'POST',
                headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            }
            fetch('/removeToolCategory/' + this.state.wholeTool[0] +"/" +addMe, reqOptions)
                .then(response => response.json())
        }
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
        } else if(event.target.id === "enteredShareable") {
            let currVal = args[5]
            args[5] = !currVal
        }
        this.setState({wholeTool: args})
    }

    updateUserInput = (event) => {
        this.setState({inputCategory: event.target.value})
    }

    submitForm = () => {
        let cats = this.state.categories
        for (let i=0; i < cats.length; i++) {
            if (cats[i][1] === undefined) {
                cats.splice(i, 1)
                i--;
            }
        }
        this.setState({categories: cats})

        this.editTool()

        this.addToolCategory()
        this.removeToolCategory()

        this.toggle()
    }

    removeCategory = (event) => {
        let cats = this.state.categories
        for(let i=0; i < cats.length; i++) {
            let str = cats[i][0]
            let eve = event.target.value
            console.log(eve)
            if (str === eve) {
                if (cats[i][1] !== null) {
                    let newList = this.state.categoriesToDelete
                    newList.push(cats[i][0])

                    this.setState({categoriesToDelete: newList})
                }
                cats.splice(i, 1);
            }
        }
        this.setState({categories: cats})
    }

    displayCategories = (category) => {
        return (
             <Label>{category}
                <Button value={category[0]} onClick={this.removeCategory}>Remove</Button>
             </Label>
        )
    }

    addCategory = () => {
        let cats = this.state.categories
        cats.push([this.state.inputCategory, false])
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
                                <Label>Shareable</Label>
                                <Input type="checkbox" id="enteredShareable" value={this.state.wholeTool[5]} checked={this.state.wholeTool[5]} onChange={this.updateProp}></Input>
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



