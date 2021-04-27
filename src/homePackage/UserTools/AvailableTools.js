import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import {
    Table, Row, Input, Label, Col, Button,
} from 'reactstrap';
import AvTool from "./AvTool";
import AddTool from "./AddTool";

class AvailableTools extends Component {
    constructor(props) {
        super(props)
    this.state = {
        currentUser: props.user,
        available: [],
        searchParam: "",
        searchType: "category",

        pageIndex: 0,
        pageSize: 50,
        pageTotal: 0
     }
    }

    updateAllTools = (allTools) => {
        this.setState({available: allTools})
        this.setState({user: this.state.currentUser})
    }

    fetchAllTools = () => {
        fetch('/getAvailableTools/' +this.state.currentUser)
            .then(
                response => response.json()
            ).then(jsonOutput => {
                this.setState({available: []})
                this.updateAllTools(jsonOutput)
        })
    }
    componentDidMount() {
        this.fetchAllTools()
    }

    displayTool = (tool) => {
        return (
            <AvTool available={tool} user={this.state.currentUser}/>
        );
    }
    updateSearchParam = (event) => {
        this.setState({searchParam: event.target.value})
    }
    searchUpdate = (event) => {
        this.setState({searchType: event.target.value})
    }

    fetchSearch = (searchtype) => {
        fetch (searchtype +this.state.currentUser +"/" +this.state.searchParam)
            .then(
                response => response.json()
            ) .then(jsonOutput => {
                console.log(jsonOutput)
                this.setState({available: []})
                this.updateAllTools(jsonOutput)
        })
    }
    search = () => {
        if (this.state.searchParam === "") {
            this.fetchAllTools()
        } else {
            if (this.state.searchType === "category") {
                this.fetchSearch('/searchAvailableCategory/')
            } else if (this.state.searchType === "barcode") {
                this.fetchSearch('/searchAvailableBarcode/')
            } else if (this.state.searchType === "name") {
                this.fetchSearch('/searchAvailableName/')
            }
        }
    }

    handlePrevPageClick(event) {
        this.setState(prevState => ({
        pageIndex: prevState.pageIndex > 0 ? prevState.pageIndex - 1 : 0
        }));
        this.fetchAllTools();
    }

    handleNextPageClick(event) {
        this.setState(prevState => ({
        pageIndex:
        prevState.pageIndex <
        Math.floor(prevState.available.length / prevState.pageSize)
          ? prevState.pageIndex + 1
          : prevState.pageIndex
    }));
        this.fetchAllTools();
  }

    render () {
        return (
            <div className="m-4">
                <Row className="m-2">
                    <Input className="m-2" type="searchType" id="search" placeholder="Search Params" value={this.state.searchParam} onChange={this.updateSearchParam}/>
                    <Button onClick={this.search}>Search</Button>

                    <Col xs="auto" className="text-center">
                        <Label>Search Type</Label>
                    </Col>
                    <Col>
                        <Input className="m-2" type="select" id="search" name="Search For" value={this.state.searchType} onChange={this.searchUpdate}>
                        <option value="name">name</option>
                         <option value="barcode">barcode</option>
                         <option value="category">category</option>
                     </Input>
                    </Col>
                </Row>
                <Button color="primary"
                        onClick={event => this.handlePrevPageClick(event)}
                        >Previous</Button>
                <Button color="primary"
                        onClick={event => this.handleNextPageClick(event)}
                        >Next</Button>
                <Label>Page {this.state.pageIndex + 1} of {Math.ceil(this.state.available.length / this.state.pageSize)}</Label>
                <Table>
                    <thead>
                        <tr className="text-center">
                            <th>Barcode</th>
                             <th>Tool Name</th>
                             <th>Desc.</th>
                             <th>Categories</th>
                            <th>Owned by</th>
                             <th>Request</th>
                        </tr>
                    </thead>
                    <tbody className="text-left">
                        {this.state.available
                            .slice(
                                this.state.pageIndex * this.state.pageSize,
                                this.state.pageIndex * this.state.pageSize + this.state.pageSize
                            )
                            .map(available => this.displayTool(available))}
                    </tbody>
                </Table>
            </div>
        )
    }

}
export default AvailableTools;