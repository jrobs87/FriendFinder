// bringing in express and setting up server
const express = require('express')
const app = express()
const port = 3000

const path = require('path'); // dont need 

const friends = require('./data/friends.js') // path would elimanate the need for this ././/

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ===============================================================================================

// needed to serve the css in public
app.use(express.static(__dirname + '/public'));

// ===============================================================================================

// HTML routes 
app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/public/home.html')))

// why is public not needed?  because of the realtive filepath?
app.get('/survey', (req, res) => res.sendFile(path.join(__dirname + '/public/survey.html')))

// ===============================================================================================

// API routes
app.post('/api/friends', (req, res) => {
    // console.log(req.body);
    let user = req.body;
    console.log('User input received.');
    console.log(user);
    
    // friends.profiles.push(req.body);
    // console.log(friends.profiles);

    let currentDiff = 100;
    let currentMatch = '';

    for (i = 0; i < friends.profiles.length; i ++) {
        diff = 0;

        let profile = friends.profiles[i];

        for (z = 0; z < 10; z ++) {
            test = Math.abs(user.answers[z] - profile.answers[z]);
            diff =+ test;
            
        }

        console.log(`${profile.name} diff is ${diff}`)

      if (diff < currentDiff) {
          currentDiff = diff;
          currentMatch = profile;
      }

    }
    console.log(`Best match is ${currentMatch.name}`);

    res.send(currentMatch)}); // send match back to caller (submit function in survey.html)

// ===============================================================================================

app.listen(port, () => console.log(`FriendFinder App listening on port ${port}!`)) // fire up the server!