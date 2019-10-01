const express = require('express'),
      app = express(),
      Rawger = require('rawger'),
      port = 3000

app.get('/', function (req, res) {
  res.sendFile('/views/index.html', { root: '.' })
})
app.get('/requests', function (req, res) {
  res.sendFile('/views/requests.html', { root: '.' })
})
app.get('/games', function (req, res) {
  res.sendFile('/views/games.html', { root: '.' })
})
app.get('/catalog', function (req, res) {
  res.sendFile('/views/catalog.html', { root: '.' })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

