import React from 'react';
import { Component } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import NavigationBar from './NavigationBar';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parcelId: "",
      seller: "",
      buyer: "",
      weight: 0,
      location: "",
      destination: "",
      price: 0,
      api: "https://hvl2bglabg.execute-api.us-east-1.amazonaws.com/api/parcels/",
      hideParcelDetails: true
    }
  }

  postData() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    };

    fetch(this.state.api + this.state.parcelId, requestOptions).then(res => res.json()).then(
      (data) => {
        data = data.parcels[0];
        this.setState({
          seller: data[1],
          buyer: data[2],
          weight: data[3],
          location: data[4],
          destination: data[5],
          price: data[6],
          status: data[7],
          hideParcelDetails: false
        })
      },
      (error) => {
        console.log(error);
      }
    )
  }

  handleChange(event) {
    this.setState({ parcelId: event.target.value });
  }

  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            <NavigationBar />
          </Row>
          <Container className="my-5 col-sm-4">
            <Form>
              <h4 className="my-3">Track your parcel</h4>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Enter parcel tracking id" value={this.state.parcelId} onChange={(event) => this.handleChange(event)} />
              </Form.Group>
              <Button variant="primary" onClick={() => this.postData()}>
                Submit
              </Button>
            </Form>
            {!this.state.hideParcelDetails ?
              <div className="my-3 border-top py-3">
                <h5 className="mb-3">Parcel Details</h5>
                <p>Parcel ID: {this.state.parcelId}</p>
                <p>Seller: {this.state.seller}</p>
                <p>Buyer: {this.state.seller}</p>
                <p>Weight: {this.state.weight}</p>
                <p>Location: {this.state.location}</p>
                <p>Destination: {this.state.destination}</p>
                <p>Price: {this.state.price}</p>
                <p>Status: {this.state.status}</p>
              </div>
              : null
            }
          </Container>
        </Container>
      </div>
    );
  }
}

export default Home;