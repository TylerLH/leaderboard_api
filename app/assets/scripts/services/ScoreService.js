import request from "superagent";

class ScoreService {
  leaderboard(cb) {
    request
      .get('/api/scores/top')
      .end( (err, res) => {
        if (err) return cb(err);
        cb(null, res.body);
      });
  }
}

export default new ScoreService();