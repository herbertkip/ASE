var mongoose = require('mongoose');

var GameSchema = new mongoose.Schema({
  game_name: String,
  team: String,
  req_player_num: Number,
  curr_enrolled_player_num: Number,
  organizer: String,
  game_loc: String,
  game_date: Date,
  game_time: String,
  game_duration: String,
  contact_org: String,
  org_email_id: String,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Game1', GameSchema);
