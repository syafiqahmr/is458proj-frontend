import React, { useState } from 'react';
import { Component } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import NavigationBar from "./NavigationBar";

class Today extends Component {
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
            <h3>Today's Metrics</h3>
            <p>Total Number of Parcels Delivered:</p>
            {!this.state.hideResultSuccess ?
              <div className="my-3">
              </div>
              : null}
          </Container>
        </Container>
      </div >
    );
  }
}

export default Today;