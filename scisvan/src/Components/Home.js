import React from 'react';
import { Component } from 'react';
import { Container, Table, Row, Col } from 'react-bootstrap';
import NavigationBar from "./NavigationBar";
import { Line, Bar } from 'react-chartjs-2';
import { transparentize, CHART_COLORS, OPTIONS_LINE, OPTIONS_STACKED_BAR } from './Utils'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parcelId: "",
      data: [],
      labels: [],
      noOfParcels: [],
      noOfOpen: [],
      noOfClose: [],
      avgPrice: [],
      api: "https://u2vjogr2z0.execute-api.us-east-1.amazonaws.com/default/GetAnalyticsData ",
      chartReady: false
    }
  }

  prepareChartData = () => {
    const noOfParcelChartData = {
      labels: this.state.labels,
      datasets: [
        {
          label: 'No of Parcels',
          data: this.state.noOfParcels,
          fill: false,
          backgroundColor: CHART_COLORS.blue,
          borderColor: transparentize(CHART_COLORS.blue, 0.5),
        },
      ],
    };

    const avgPriceChartData = {
      labels: this.state.labels,
      datasets: [
        {
          label: 'Average Price',
          data: this.state.avgPrice,
          fill: false,
          backgroundColor: CHART_COLORS.blue,
          borderColor: transparentize(CHART_COLORS.blue, 0.5),
        },
      ],
    };

    const noOfOpenCloseChartData = {
      labels: this.state.labels,
      datasets: [
        {
          label: 'Open',
          data: this.state.noOfOpen,
          borderColor: CHART_COLORS.red,
          backgroundColor: transparentize(CHART_COLORS.red, 0.5),
        },
        {
          label: 'Close',
          data: this.state.noOfClose,
          borderColor: CHART_COLORS.blue,
          backgroundColor: transparentize(CHART_COLORS.green, 0.5),
        }
      ]
    };

    this.setState({
      noOfParcelChartData: noOfParcelChartData,
      noOfOpenCloseChartData: noOfOpenCloseChartData,
      avgPriceChartData: avgPriceChartData,
      chartReady: true
    })
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
        // process data
        var labels = data.map(d => d[1]);
        var noOfParcels = data.map(d => d[2]);
        var noOfOpen = data.map(d => d[3]);
        var noOfClose = data.map(d => d[4]);
        var avgPrice = data.map(d => d[5]);

        this.setState({
          data: data,
          labels: labels,
          noOfParcels: noOfParcels,
          noOfClose: noOfClose,
          noOfOpen: noOfOpen,
          avgPrice: avgPrice
        });

        this.prepareChartData();
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
          <Container>
            {
              this.state.chartReady ?
                <div>
                  <Container>
                    <Row className="my-5">
                      <Col>
                        <h5>Number of Parcels Chart</h5>
                        <Line data={this.state.noOfParcelChartData} options={OPTIONS_LINE} />
                      </Col>
                      <Col>
                        <h5>Average Price Chart</h5>
                        <Line data={this.state.avgPriceChartData} options={OPTIONS_LINE} />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <h5>Number of Open/Close Parcels Chart</h5>
                        <Bar data={this.state.noOfOpenCloseChartData} options={OPTIONS_STACKED_BAR} />
                      </Col>
                      <Col>
                        <h5 className="my-3">Full Data</h5>
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
                      </Col>
                    </Row>
                  </Container>
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