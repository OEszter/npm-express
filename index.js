const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/index.html'))
})

app.use('/public', express.static(path.join(__dirname, '/frontend/public')))

/* app.get('/kiskutya', (req, res) => {
  //res.send('kiskutya!')
  res.json("kiskutya")
})

app.get('/kismacska', (req, res) => {
  //res.send('kismacska!')
  res.json("kismacska")
}) */


app.get('/beers', (req, res) => {
  res.sendFile(path.join(__dirname, '/data/beers.json'))
})

app.get('/beers/:id', (req, res) => {
  const id = parseInt(req.params.id)

  if (isNaN(id)) {
    res.status(400).json({
      error: 400,
      message: "id must be a number!"
    })
  } else {
    fs.readFile(path.join(__dirname, '/data/beers.json'), 'utf8', (err, rawData) => {
      if (err) {
        console.log(err)
        res.status(500).json({
          error: 500,
          message: "file not found"
        })
      } else {
        const data = JSON.parse(rawData)
        const foundBeer = data.find((beer) => beer.id === id)
        if (foundBeer) res.json(foundBeer)
        else res.status(404).json({
          error: 404,
          message: "id not exists"
        })
      }
    })
  }
})

app.listen(port, () => {
  console.log(`listening on http://127.0.0.1:${port}`)
})










/* app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/public/style.css'))
})

app.get('/script.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/public/script.js'))
}) */

/* app.get('/beers/1', (req, res) => {
  res.json(`sending id: 1`)
})

app.get('/beers/2', (req, res) => {
  res.json(`sending id: 2`)
}) */