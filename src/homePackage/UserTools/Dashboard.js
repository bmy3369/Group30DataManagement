import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'

class UserTools extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: props.user,
            toolCount: 0,
            lentCount: 0,
            borrowedCount: 0
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

    componentDidMount() {
        this.fetchToolCount()
        this.fetchLentCount()
        this.fetchBorrowedCount()
    }

    render() {
        return (
            <div className="m-4">
                <h2 className="text-center">Your Tools Available: {this.state.toolCount}</h2>
                <h2 className="text-center">Lent Tools: {this.state.lentCount}</h2>
                <h2 className="text-center">Borrowed Tools: {this.state.borrowedCount}</h2>
            </div>
        )
    }

}

export default UserTools;