import React from 'react';
import { Component } from 'react';
import { Container, Table, Row } from 'react-bootstrap';
import NavigationBar from "./NavigationBar";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parcelId: "",
      data: [],
      api: "https://u2vjogr2z0.execute-api.us-east-1.amazonaws.com/default/GetAnalyticsData ",
      hideParcelDetails: true
    }
  }

  componentDidMount() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
    };

    fetch(this.state.api).then(res => res.json()).then(
      (data) => {
        this.setState({
          hideParcelDetails: false,
          data: data
        });
        console.log(data);
        console.log(this.state.data);
      },
      (error) => {
        console.log(error);
      }
    )
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
                  <th>Open</th>
                  <th>Close</th>
                  <th>Average Price</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((d) => (
                  <tr>
                    <td>{d[1]}</td>
                    <td>{d[2]}</td>
                    <td>{d[3]}</td>
                    <td>{d[4]}</td>
                    <td>{Math.round(d[5])}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </Container>
      </div>
    );
  }
}

export default Home;