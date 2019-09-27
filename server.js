const express = require('express')
const app = express()
const port = 3000

app.get('/', function (req, res) {
  res.sendFile('/views/index.html', { root: '.' })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

