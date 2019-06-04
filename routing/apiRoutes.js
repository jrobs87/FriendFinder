// ====  Express Routes  =========================================================

// importing our data
const friends = require('../data/friends.js');

// ===============================================================================

module.exports = function (app) {

    // get route for serving up data
    app.get('/api/friends/data', (req, res) => {
        console.log('API Endpoint');
        res.send(friends);
    });

    // post route to handle user data submission, comparison, and best match response
    app.post('/api/friends', (req, res) => {

        console.log(`User input from ${req.body.name} received.`);

        let user = req.body;

        // variables to hold our comparison objects
        let matchDiff = 100;
        let bestMatch = '';

        // outer loops for comparison - cycles thru profiles
        for (i = 0; i < friends.length; i++) {
            let currentDiff = 0; // holds the loop-specific differnce in answers

            let profile = friends[i]; // holds the current profile for comparison

            // inner loop compares all answers from user and profiles
            for (z = 0; z < 10; z++) {
                test = Math.abs(user.answers[z] - profile.answers[z]);
                currentDiff = + test;
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
}






