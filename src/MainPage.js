import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import {
  Nav, Navbar, NavbarBrand, NavLink
} from 'reactstrap';

class MainPage extends Component {
    constructor() {
        super()

    }

  render () {
       return (
      <div className="MainMenu">
          <Navbar style={{background: '#34495e'}} >
            <NavbarBrand href="">Navbar</NavbarBrand>
            <Nav className="mr-auto">
                <NavLink href="#home">Home</NavLink>
                <NavLink href="#features">Features</NavLink>
             <NavLink href="#pricing">Pricing</NavLink>
            </Nav>
          </Navbar>
      </div>
       );
    }
}

export default MainPage;
