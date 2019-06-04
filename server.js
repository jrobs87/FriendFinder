
// =====  Express Server  ========================================================================

const express = require('express'); // bringing in express module
const app = express() // initializing Express

const port = process.env.PORT || 3000; // Setting port
// const path = require('path');

// ===============================================================================================

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ===============================================================================================

// needed to serve the css and images in public
app.use(express.static(__dirname + '/public'));

// ===============================================================================================

// importing routing files
require("./routing/apiRoutes")(app);
require("./routing/htmlRoutes")(app);

// ===============================================================================================

// launch the server and start the app
app.listen(port, () => console.log(`FriendFinder App listening on port ${port}!`));