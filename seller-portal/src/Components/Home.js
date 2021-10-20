import React from 'react';
import { Component } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import NavigationBar from './NavigationBar';

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
            <Form>
              <h4 className="my-3">Track your parcel</h4>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Enter parcel tracking id" value={this.state.parcelId} />
              </Form.Group>
              <Button variant="primary" onClick={() => this.postData()}>
                Submit
              </Button>
            </Form>
            {!this.state.hideParcelDetails ?
              <div className="my-3 border-top py-3">
                <h5>Parcel Details</h5>
                <p>Parcel ID: </p>
                <p>Status: </p>
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