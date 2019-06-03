// bringing in express and setting up server
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const path = require('path'); 
const friends = require('./data/friends.js') // path would elimanate the need for this ././/
// const profiles = require('./data/profiles.json'); // testing sending JSON responses
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ===============================================================================================

// needed to serve the css and images in public
app.use(express.static(__dirname + '/public'));

// ===============================================================================================

// home html route
app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/public/home.html')))

// survey html route
app.get('/survey', (req, res) => res.sendFile(path.join(__dirname + '/public/survey.html')))

// ===============================================================================================

// API routes - this is not showing in the HTML and I can't figure out why - same methods works in other work I have done....
// home.html is just writing out a note to check the console and the API data is logged to the console as a stand-in
app.get('/api/friends/data', (req, res) => {
    console.log('API Endpoint Requested');
    res.setHeader('Content-Type', 'application/json');
    // res.send(profiles); // testing json
    res.send(friends);
});

// route to handle user data submission, comparison, and best match response
app.post('/api/friends', (req, res) => {

    console.log('User input received.');

    let user = req.body;
    console.log(req.body);

    // variables to hold our comparison objects
    let matchDiff = 100;
    let bestMatch = '';

    // outer loops for comparison - cycles thru profiles
    for (i = 0; i < friends.profiles.length; i++) {

        let currentDiff = 0; // holds the loop-specific differnce in answers
        let profile = friends.profiles[i]; // holds the current profile for comparison

        // inner loop compares all answers from user and profiles
        for (z = 0; z < 10; z++) {
            test = Math.abs(user.answers[z] - profile.answers[z]);
            currentDiff =+ test;
        }

        // set new best match if currentDiff is less than current
        if (currentDiff < matchDiff) {
            matchDiff = currentDiff;
            bestMatch = profile;
        }
    }

    console.log(`Best match is ${bestMatch.name}`); // server log the best match

    res.send(bestMatch); // send match back to caller (submit function in survey.html)
}); 

// ===============================================================================================

// launch the server and start the app
app.listen(port, () => console.log(`FriendFinder App listening on port ${port}!`));