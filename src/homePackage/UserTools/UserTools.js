import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import {
    Table, Button, Row, Input, Label, Col
} from 'reactstrap';

class UserTools extends Component {
    constructor(props) {
        super(props)
    this.state = {
        currentUser: props.user
     }
    }

    render () {
        return (
            <div className="m-4">
                <Row className="m-2">
                     <Button className="m-2" color="primary">+ New Tool</Button>
                    <Input className="m-2" type="searchType" id="search" placeholder="Search Params" />
                    <Col xs="auto" className="text-center">
                        <Label>Search Type</Label>
                    </Col>
                    <Col>
                        <Input className="m-2" type="select" name="Search For">
                        <option>name</option>
                         <option>barcode</option>
                         <option>category</option>
                     </Input>
                    </Col>
                </Row>
                 <header className="text-center">Tool List</header>
                <Table>
                    <thead>
                        <tr className="text-center">
                            <th>Tool Name</th>
                             <th>Barcode</th>
                             <th>Desc</th>
                             <th>Categories</th>
                             <th>Purchase Date</th>
                             <th>Purchase Price</th>
                             <th>Status</th>
                             <th>Edit</th>
                             <th>Delete</th>
                        </tr>
                    </thead>
                </Table>
            </div>
        )
    }

}
export default UserTools;