import React from 'react';
import { Component } from 'react';
import { Container, Table, Row } from 'react-bootstrap';
import NavigationBar from "./NavigationBar";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parcelId: "",
      api: process.env.API_URL,
      hideParcelDetails: true
    }
  }

  postData() {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ seller: this.state.seller })
    };
    this.setState({
      hideParcelDetails: false,
    });

    // fetch(this.state.api, requestOptions).then(res => res.json()).then(
    //   (data) => {
    //     this.setState({
    //       hideParcelDetails: false,
    //     });
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // )
  }

  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            <NavigationBar />
          </Row>
          <Container className="my-5 col-sm-4">
            <h3 className="my-3">Overall Metrics</h3>
            <h5>Number of parcels delivered</h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>No of parcels</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>13/06/2021</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>14/06/2021</td>
                  <td>100</td>
                </tr>
              </tbody>
            </Table>
          </Container>
        </Container>
      </div>
    );
  }
}

export default Home;