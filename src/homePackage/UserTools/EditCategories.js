import 'bootstrap/dist/css/bootstrap.min.css';
import {Component} from "react/cjs/react.production.min";
import React from 'react'
import {
Label
} from 'reactstrap'

class EditCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: props.category,
        }
    }

    render() {
        return (
            <div>
                <Label>{this.state.category}</Label>
            </div>
        )
    }

}
export default EditCategories



