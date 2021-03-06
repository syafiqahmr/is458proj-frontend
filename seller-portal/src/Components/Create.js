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
      weight: "",
      location: "",
      destination: "",
      price: "",
      hideResultSuccess: true,
      trackingNo: "",
      api: "https://6i7fwdnnph.execute-api.us-east-1.amazonaws.com/api/parcels",
      showCreating: false
    }
  }

  postData() {
    this.setState({
      showCreating: true
    });
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        seller: this.state.seller,
        buyer: this.state.buyer,
        weight: this.state.weight,
        location: this.state.location,
        destination: this.state.destination,
        price: this.state.price
      })
    };

    fetch(this.state.api, requestOptions).then(res => res.json()).then(
      (data) => {
        console.log(requestOptions.body);
        data = data.parcels[0];
        console.log(data);
        this.setState({
          trackingNo: data[0],
          hideResultSuccess: false,
          showCreating: false
        });
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  handleChange(evt) {
    const value = evt.target.value;
    this.setState({
      [evt.target.name]: value,
      hideResultSuccess: true
    });
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
                <Form.Control type="text" value={this.state.seller} name="seller" onChange={(event) => this.handleChange(event)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Buyer</Form.Label>
                <Form.Control type="text" value={this.state.buyer} name="buyer" onChange={(event) => this.handleChange(event)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Weight</Form.Label>
                <Form.Control type="text" value={this.state.weight} name="weight" onChange={(event) => this.handleChange(event)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" value={this.state.location} name="location" onChange={(event) => this.handleChange(event)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Destination</Form.Label>
                <Form.Control type="text" value={this.state.destination} name="destination" onChange={(event) => this.handleChange(event)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" value={this.state.price} name="price" onChange={(event) => this.handleChange(event)} />
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
            {this.state.showCreating ?
              <div>
                <br />
                <p className='text-secondary'>Creating....</p>
              </div>
              : null
            }
          </Container>
        </Container>
      </div >
    );
  }
}

export default Create;