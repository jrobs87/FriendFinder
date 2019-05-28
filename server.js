// bringing in express and setting up server
const express = require('express')
const app = express()
const port = 3000

const path = require('path');

// needed to serve the css in public
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/public/home.html')))

// why is public not needed?  because of the realtive filepath?
app.get('/survey', (req, res) => res.sendFile(path.join(__dirname + '/public/survey.html')))

app.post('/api/friends', (req, res) => res.send('hi')); // works, now to append the array in the file

app.listen(port, () => console.log(`Friend Finder App listening on port ${port}!`))