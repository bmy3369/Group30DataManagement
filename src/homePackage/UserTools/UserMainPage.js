import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import {
  Nav, NavLink, NavItem, TabContent, TabPane
} from 'reactstrap';
import classNames from 'classnames';
import UserTools from "./UserTools";

class UserMainPage extends Component {
    constructor (props) {
        super(props)
        this.state = {
            activeTab: 1
        }
    }

    toggle = (tab) => {
        if(this.state.activeTab !== tab) {
            this.setState({activeTab: tab})
        }
    }

    render () {
        return (
            <div className="m-4">
                <Nav tabs>
                    <NavItem>
                        <NavLink className={classNames({active: this.state.activeTab === '1'})}
                        onClick={this.toggle('1')}
                        >My Tools</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classNames({active: this.state.activeTab === '2'})}
                        onClick={this.toggle}
                        >My Lent Tools</NavLink>
                    </NavItem>
                     <NavItem>
                        <NavLink className={classNames({active: this.state.activeTab === '3'})}
                        onClick={this.toggle}
                        >My Borrowed Tools</NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <UserTools/>
                    </TabPane>
                <TabPane tabId="2">
                        <div>HELLO TAB 1</div>
                    </TabPane>
                    <TabPane tabId="3">
                        <div>HELLO TAB 1</div>
                    </TabPane>

                </TabContent>
            </div>
        )
    }

}
export default UserMainPage;