import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import {
  Nav, NavLink, NavItem, TabContent, TabPane
} from 'reactstrap';
import classNames from 'classnames';
import UserTools from "./UserTools";
import UserRequests from "../../requestsPackage/UserRequests";
import UserLentTools from "../../requestsPackage/UserLentTools"
import BorrowedTools from "../../requestsPackage/UserBorrowedTools"

class UserMainPage extends Component {
    constructor (props) {
        super(props)
        this.state = {
            currentUser: props.user,
            activeTab: '1'
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
                        onClick={() => this.toggle('1')}
                        >My Tools</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classNames({active: this.state.activeTab === '2'})}
                        onClick={() => this.toggle('2')}
                        >My Incoming Requests</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classNames({active: this.state.activeTab === '3'})}
                        onClick={() => this.toggle('3')}
                        >My Lent Tools</NavLink>
                    </NavItem>
                     <NavItem>
                        <NavLink className={classNames({active: this.state.activeTab === '4'})}
                        onClick={() => this.toggle('4')}
                        >My Borrowed Tools</NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <UserTools user={this.state.currentUser}/>
                    </TabPane>
                    <TabPane tabId="2">
                        <UserRequests user={this.state.currentUser}/>
                    </TabPane>
                    <TabPane tabId="3">
                        <UserLentTools user = {this.state.currentUser}/>
                    </TabPane>
                    <TabPane tabId="4">
                        <BorrowedTools user = {this.state.currentUser}/>
                    </TabPane>

                </TabContent>
            </div>
        )
    }

}
export default UserMainPage;