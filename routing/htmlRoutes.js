

// home html route
app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/public/home.html')))

// survey html route
app.get('/survey', (req, res) => res.sendFile(path.join(__dirname + '/public/survey.html')))