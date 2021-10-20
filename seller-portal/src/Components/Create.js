import React, { useState } from 'react';
import { Component } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import NavigationBar from "./NavigationBar";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seller: "",
      buyer: "",
      weight: 0,
      location: "",
      destination: "",
      price: 0,
      hideResultSuccess: true,
      trackingNo: "",
      api: process.env.API_URL
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
      hideResultSuccess: false,
    });

    // fetch(this.state.api, requestOptions).then(res => res.json()).then(
    //   (data) => {
    //     this.setState({
    //       hideResultSuccess: false,
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
            <Form>
              <h4 className="my-3">Create your parcel</h4>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Seller</Form.Label>
                <Form.Control type="text" value={this.state.seller} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Buyer</Form.Label>
                <Form.Control type="text" value={this.state.buyer} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Weight</Form.Label>
                <Form.Control type="text" value={this.state.weight} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" value={this.state.location} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Destination</Form.Label>
                <Form.Control type="text" value={this.state.destination} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" value={this.state.price} />
              </Form.Group>
              <Button variant="primary" onClick={() => this.postData()}>
                Create
              </Button>
            </Form>
            {!this.state.hideResultSuccess ?
              <div className="my-3">
                <p>Successfully created!</p>
                <p>Tracking number : {this.state.trackingNo}</p>
              </div>
              : null}
          </Container>
        </Container>
      </div >
    );
  }
}

export default Create;