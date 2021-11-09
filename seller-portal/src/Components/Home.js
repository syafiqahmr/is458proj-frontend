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
      api: "https://6i7fwdnnph.execute-api.us-east-1.amazonaws.com/api/parcels/",
      hideParcelDetails: true,
      showError: false,
      showRetrieving: false
    }
  }

  postData() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    };
    this.setState({
      showRetrieving: true
    })

    fetch(this.state.api + this.state.parcelId, requestOptions).then(res => res.json()).then(
      (data) => {
        console.log(data);
        if (data === null || data.parcels === null || data.parcels.length === 0) {
          this.setState({
            showError: true,
            showRetrieving: false
          })
        } else {
          data = data.parcels[0];
          this.setState({
            seller: data[1],
            buyer: data[2],
            weight: data[3],
            location: data[5],
            destination: data[6],
            price: data[7],
            status: data[8],
            hideParcelDetails: false,
            showRetrieving: false
          })
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  handleChange(event) {
    this.setState({
      parcelId: event.target.value,
      hideParcelDetails: true,
      showRetrieving: false,
      showError: false
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
                <p>Buyer: {this.state.buyer}</p>
                <p>Weight: {this.state.weight}</p>
                <p>Location: {this.state.location}</p>
                <p>Destination: {this.state.destination}</p>
                <p>Price: {this.state.price}</p>
                {this.state.status ?
                  <p>Status: {this.state.status}</p>
                  : null
                }
              </div>
              : null
            }
            {this.state.showError ?
              <div>
                <br />
                <p className='text-danger'>Invalid ID!</p>
              </div>
              : null
            }
            {this.state.showRetrieving ?
              <div>
                <br />
                <p className='text-secondary'>Retrieving data....</p>
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