import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import {
  Navbar,NavbarBrand, NavItem, NavbarText
} from 'reactstrap';

class Tool extends Component {
    constructor(props) {
        super(props)
    this.state = {
        currentUser: props.user
     }
    }

    render () {
        return (
            <div className="m-4">
                hi im ur tools
            </div>
        )
    }

}
export default Tool;