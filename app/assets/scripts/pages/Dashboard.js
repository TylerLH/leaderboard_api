import React from "react";
import ScoreService from "../services/ScoreService";
import {Table, Grid, Row, Col, Panel} from "react-bootstrap";
import _ from "underscore";
import AuthenticatedComponent from "../components/AuthenticatedComponent";
import SmartTimeAgo from "react-smart-time-ago";

export default AuthenticatedComponent(class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: [],
      latestScore: null
    }
  }

  getScores() {
    ScoreService.leaderboard( (err, scores) => {
      if (err) console.log(err.message);
      this.setState({scores: scores});
    });
  }

  componentDidMount() {
    this.getScores();
  }

  render() {
    let scores = _.map(this.state.scores, (score, i) => {
      return (
        <tr key={'score-' + score._id}>
          <td>{i+1}</td>
          <td>{score._player.name.full}</td>
          <td>{score.score.toLocaleString()}</td>
        </tr>
      );
    });

    let latestTimestamp = "N/A";

    return (
      <div className="Dashboard container">
        <div className="page-header">
          <h1>Dashboard</h1>
        </div>
        <Row>
          <Col md={3} lg={4}>
            <p><span className="text-muted text-uppercase">Last game played</span> <span>{latestTimestamp}</span></p>
          </Col>
        </Row>
        <div className="row">
          <div className="col-md-6 col-lg-6">
            <Panel header={<h2>Top 10 Scores</h2>}>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Player</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {scores}
                </tbody>
              </Table>
            </Panel>
          </div>
        </div>
      </div>
    );
  }
});