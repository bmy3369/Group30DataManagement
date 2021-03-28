import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import {
    Label, Form, FormGroup, Input, Container, Col, Button
} from 'reactstrap';
//import userToken from "./userToken";
import CreateNewAccount from "./CreateNewAccount";
class LoginScreen extends Component {
    constructor(props) {
    super(props)
    this.state = {
        username: "",
        password: "",
        newUserChange: props.onChange
     }

    }
    handleOutput = (output) => {
        if (output !== false) {
            this.state.newUserChange(output)
        }


    }
    fetchUser = () => {
        const getUrl = '/login/'+this.state.username +"/"+this.state.password
        fetch( getUrl).then(
                response => response.json()
            ) .then(jsonOutput => {
            this.handleOutput(jsonOutput)
        })
    }
    tryLogin = () => {
        console.log(this.state.username +" "+ this.state.password)
        this.fetchUser();
    }
    updateUsername = (event) => {
        this.setState({username: event.target.value})
    }
    updatePassword = (event) => {
        this.setState({password: event.target.value})
    }

  render () {
       return (
      <div className="LoginScreen">
          <h1 align="center">Tool Management System</h1>
          <Container>
              <Col sm="12" md={{size:6, offset: 3}}>
             <Form>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="username" id="username" placeholder="Enter a username" onChange={this.updateUsername}/>
               </FormGroup>
                <FormGroup>
                     <Label for="password">Password</Label>
                     <Input type="password" id="password" placeholder="Enter your password" onChange={this.updatePassword}/>
                  </FormGroup>
                 <Button color="primary" onClick={this.tryLogin}>Login</Button>
                 <CreateNewAccount/>
             </Form>
              </Col>
          </Container>
      </div>
       );
    }
}

export default LoginScreen;
