import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'

class UserTools extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: props.user,
            toolCount: 0
        }
    }

    updateToolCount = (count) => {
        this.setState({toolCount: count})
    }

    fetchToolCount = () => {
        fetch('/getToolCount/' + this.state.currentUser)
            .then(
                response => response.json()
            ).then(jsonOutput => {
            this.updateToolCount(jsonOutput)
            console.log(jsonOutput)
        })
    }

    componentDidMount() {
        this.fetchToolCount()
        console.log(this.state.toolCount)
    }

    render() {
        return (
            <div className="m-4">
                <h2 className="text-center">Your Tools Available: this.state.toolCount</h2>
                <h2 className="text-center">Lent Tools: </h2>
                <h2 className="text-center">Borrowed Tools: </h2>
            </div>
        )
    }

}

export default UserTools;