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
      api: "https://6i7fwdnnph.execute-api.us-east-1.amazonaws.com/api/location",
      hideResultSuccess: true,
      showUpdating: false,
      showError: false
    }
  }

  postData() {
    this.setState({
      showUpdating: true
    });
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.parcelId,
        location: this.state.location
      })
    };

    fetch(this.state.api, requestOptions).then(res => res.json()).then(
      (data) => {
        if (data.parcels.length === 0) {
          this.setState({
            showUpdating: false,
            showError: true
          });
        } else {
          this.setState({
            hideResultSuccess: false,
            showUpdating: false
          });
        }
        console.log(data);
      },
      (error) => {
        this.setState({
          showUpdating: false,
          showError: true
        });
        console.log(error);
      }
    )
  }

  handleChange(evt) {
    const value = evt.target.value;
    this.setState({
      [evt.target.name]: value,
      showError: false,
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
              <h3 className="my-3">Update Parcel Location</h3>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Parcel Id</Form.Label>
                <Form.Control type="text" value={this.state.parcelId} name="parcelId" onChange={(event) => this.handleChange(event)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" value={this.state.location} name="location" onChange={(event) => this.handleChange(event)} />
              </Form.Group>
              <Button variant="primary" onClick={() => this.postData()}>
                Submit
              </Button>
            </Form>
            {!this.state.hideResultSuccess ?
              <div className="my-3">
                <p className='text-success'>Successfully updated!</p>
              </div>
              : null}
            {this.state.showUpdating ?
              <div>
                <br />
                <p className='text-secondary'>Updating....</p>
              </div>
              : null
            }
            {this.state.showError ?
              <div>
                <br />
                <p className='text-danger'>Invalid id!</p>
              </div>
              : null
            }
          </Container>
        </Container>
      </div>
    );
  }
}

export default Location;