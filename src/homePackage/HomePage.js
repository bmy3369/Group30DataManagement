import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import {
  Navbar,NavbarBrand, NavItem, NavbarText
} from 'reactstrap';
import UserMainPage from "./UserTools/UserMainPage";

class HomePage extends Component {
    constructor(props) {
        super(props)
    this.state = {
        currentUser: props.user
     }
    }

    render () {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand >Home</NavbarBrand>
                    <NavItem >Borrowable Tools                  -  </NavItem>
                    <NavbarText> {this.state.currentUser}'s Tool Management System</NavbarText>
                </Navbar>

                <UserMainPage user={this.state.currentUser}/>
            </div>
        )
    }
}
export default HomePage;