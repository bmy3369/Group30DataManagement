import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import {
    Nav, NavLink, NavItem, TabContent, TabPane
} from 'reactstrap';
import classNames from 'classnames';
import Dashboard from "./Dashboard";
import UserTools from "./UserTools";
import UserRequests from "../../requestsPackage/UserRequests";
import UserLentTools from "../../requestsPackage/UserLentTools"
import BorrowedTools from "../../requestsPackage/UserBorrowedTools"
import AvailableTools from "./AvailableTools"
import UserOutgoing from "../../requestsPackage/UserOutgoing"

class UserMainPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: props.user,
            activeTab: '1'
        }
    }

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({activeTab: tab})
        }
    }

    render() {
        return (
            <div className="m-4">
                <Nav tabs>
                    <NavItem>
                        <NavLink className={classNames({active: this.state.activeTab === '1'})}
                                 onClick={() => this.toggle('1')}
                        >Dashboard</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classNames({active: this.state.activeTab === '2'})}
                                 onClick={() => this.toggle('2')}
                        >My Tools</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classNames({active: this.state.activeTab === '3'})}
                                 onClick={() => this.toggle('3')}
                        >My Incoming Requests</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classNames({active: this.state.activeTab === '4'})}
                                 onClick={() => this.toggle('4')}
                        >My Outgoing Requests</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classNames({active: this.state.activeTab === '5'})}
                                 onClick={() => this.toggle('5')}
                        >My Lent Tools</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classNames({active: this.state.activeTab === '6'})}
                                 onClick={() => this.toggle('6')}
                        >My Borrowed Tools</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classNames({active: this.state.activeTab === '6'})}
                                 onClick={() => this.toggle('7')}
                        >Available Tools</NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Dashboard user={this.state.currentUser}/>
                    </TabPane>
                    <TabPane tabId="2">
                        <UserTools user={this.state.currentUser}/>
                    </TabPane>
                    <TabPane tabId="3">
                        <UserRequests user={this.state.currentUser}/>
                    </TabPane>
                    <TabPane tabId="4">
                        <UserOutgoing user={this.state.currentUser}/>
                    </TabPane>
                    <TabPane tabId="5">
                        <UserLentTools user={this.state.currentUser}/>
                    </TabPane>
                    <TabPane tabId="6">
                        <BorrowedTools user={this.state.currentUser}/>
                    </TabPane>
                    <TabPane tabId="7">
                        <AvailableTools user={this.state.currentUser}/>
                    </TabPane>
                </TabContent>
            </div>
        )
    }

}

export default UserMainPage;