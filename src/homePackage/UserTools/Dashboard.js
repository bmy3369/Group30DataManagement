import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import {
    Table
} from 'reactstrap';
import TopLent from "../../requestsPackage/TopLent";
import TopBorrowed from "../../requestsPackage/TopBorrowed";

class UserTools extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: props.user,
            toolCount: 0,
            lentCount: 0,
            borrowedCount: 0,
            topLent: [],
            topBorrowed: []
        }
    }

    updateToolCount = (count) => {
        this.setState({toolCount: count})
    }

    updateLentCount = (count) => {
        this.setState({lentCount: count})
    }

    updateBorrowedCount = (count) => {
        this.setState({borrowedCount: count})
    }

    update10Lent = (allTools) => {
        this.setState({topLent: allTools})
    }

    update10Borrowed = (allTools) => {
        this.setState({topBorrowed: allTools})
    }

    fetchToolCount = () => {
        fetch('/getToolCount/' + this.state.currentUser)
            .then(
                response => response.json()
            ).then(jsonOutput => {
            this.updateToolCount(jsonOutput[0])
        })
    }

    fetchLentCount = () => {
        fetch('/getLentCount/' + this.state.currentUser)
            .then(
                response => response.json()
            ).then(jsonOutput => {
            this.updateLentCount(jsonOutput[0])
        })
    }

    fetchBorrowedCount = () => {
        fetch('/getBorrowedCount/' + this.state.currentUser)
            .then(
                response => response.json()
            ).then(jsonOutput => {
            this.updateBorrowedCount(jsonOutput[0])
        })
    }


    fetch10Lent = () => {
        fetch('/getTopLent/' + this.state.currentUser)
            .then(
                response => response.json()
            ).then(jsonOutput => {
            this.update10Lent(jsonOutput)
        })
    }

    fetch10Borrowed = () => {
        fetch('/getTopBorrowed/' + this.state.currentUser)
            .then(
                response => response.json()
            ).then(jsonOutput => {
            this.update10Borrowed(jsonOutput)
        })
    }

    componentDidMount() {
        this.fetchToolCount()
        this.fetchLentCount()
        this.fetchBorrowedCount()
        this.fetch10Lent()
        this.fetch10Borrowed()
    }


    display10Lent = (currentUser, topLent) => {
        return (
            <TopLent user={currentUser} topLent={topLent}/>
        )
    }

    display10Borrowed = (currentUser, topBorrowed) => {
        return (
            <TopBorrowed user={currentUser} topBorrowed={topBorrowed}/>
        )
    }

    render() {
        return (
            <div className="m-4">
                <h2 className="text-center">Your Tools Available: {this.state.toolCount}</h2>
                <h2 className="text-center">Lent Tools: {this.state.lentCount}</h2>
                <h2 className="text-center">Borrowed Tools: {this.state.borrowedCount}</h2>

                <header className="text-center">Top 10 Most Frequently Lent Tools</header>
                <Table>
                    <thead>
                    <tr className="text-center">
                        <th>Tool Barcode</th>
                        <th>Tool Name</th>
                        <th>Times Lent</th>
                        <th>Average Lent Time</th>
                        <th>Percentage of time lent</th>
                    </tr>
                    </thead>
                    <tbody className="text-left">
                    {this.state.topLent.map(topLent => this.display10Lent(this.state.currentUser, topLent))}
                    </tbody>
                </Table>
                
                <header className="text-center">Top 10 Most Frequently Borrowed Tools</header>
                <Table>
                    <thead>
                    <tr className="text-center">
                        <th>Tool Owner</th>
                        <th>Tool Borrowed</th>
                        <th>Tool Name</th>
                        <th>Times Borrowed</th>
                    </tr>
                    </thead>
                    <tbody className="text-left">
                    {this.state.topBorrowed.map(topBorrowed => this.display10Borrowed(this.state.currentUser, topBorrowed))}
                    </tbody>
                </Table>
            </div>
        )
    }

}

export default UserTools;