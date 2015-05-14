import React from "react";
import ScoreService from "../services/ScoreService";
import {Table} from "react-bootstrap";
import _ from "underscore";
import AuthenticatedComponent from "../components/AuthenticatedComponent";

export default AuthenticatedComponent(class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: []
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
          <td>{score.score}</td>
        </tr>
      );
    });

    return (
      <div className="Leaderboard container">
        <div className="page-header">
          <h1>Leaderboard</h1>
        </div>
        <Table responsive hover bordered>
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
      </div>
    );
  }
});