const passport = require("passport");
const local = require("./localStrategy.js");
const User = require("../models/users");

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log(user.userId);
    done(null, user.userId); // session에 저장
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then((user) => {
        console.log(user);
        done(null, user);
      })
      .catch((err) => done(err));
  });

  local();
};
