import React from 'react';
import { Component } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import NavigationBar from "./NavigationBar";

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parcelId: "",
      location: "",
      api: process.env.API_URL,
      hideResultSuccess: true
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
            <Form>
              <h3 className="my-3">Update Parcel Location</h3>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Parcel Id</Form.Label>
                <Form.Control type="text" value={this.state.parcelId} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" value={this.state.location} />
              </Form.Group>
              <Button variant="primary" onClick={() => this.postData()}>
                Submit
              </Button>
            </Form>
            {!this.state.hideResultSuccess ?
              <div className="my-3">
                <p>Successfully updated!</p>
              </div>
              : null}
          </Container>
        </Container>
      </div>
    );
  }
}

export default Location;