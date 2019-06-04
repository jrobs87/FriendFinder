// ====  Express Routes  =========================================================

// Include path get the correct file path for our html
var path = require("path");

// ===============================================================================

module.exports = function (app) {

    // home
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    // survey form
    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    // Default to home
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
}
