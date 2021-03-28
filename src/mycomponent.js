import React, { Component } from 'react';


class MyComponent extends Component{
    constructor(props){
        super(props);
        this.state={data: ""}
    }

    updateData = (apiResponse) => {
        this.setState({data: apiResponse})
    }

    fetchData = () => {
        //In package.json add "proxy": "http://localhost:5000" 
        //This will allow redirect to REST api in Flask w/o CORS errors
         fetch('/example_api')
         .then(
             response => response.json() 
             )//The promise response is returned, then we extract the json data
         .then (jsonOutput => //jsonOutput now has result of the data extraction
                  {
                      this.updateData(jsonOutput)
                    }
              )
      }
    componentDidMount(){
        this.fetchData();
    }


    render(){
        {/*If the data has not yet been loaded from the server, return empty page */}
        if ( this.state.data == null )
        return (<div>No data</div>)
        else
        {

        return (
            <div>
                <div><h2>The api response is: {this.state.data}</h2>
                </div>
            </div>
        )
        }
    }
}

export default MyComponent;