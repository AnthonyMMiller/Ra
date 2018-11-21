var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.UserFeeling.findAll({}).then(function(dbExamples) {
      res.render("index", {
        // msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/signin", function(req, res) {
    db.UserFeeling.findOne({}).then(function(dbExample) {
      res.render("signin", {
        example: dbExample
      });
    });
  });

    // Load example page and pass in an example by id
    app.get("/user", function(req, res) {
      db.UserFeeling.findOne({}).then(function(dbExample) {
        res.render("user", {
          example: dbExample
        });
      });
    });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
