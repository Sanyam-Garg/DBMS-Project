const express = require('express');
const app = express()
const db = require('./db')
const port = 3000

// Get all movies in the database
app.get('/movies', (req, res) => {
    db.query("SELECT * FROM movie", (err, result) => {
        if(err)
            return res.send(err)
        
        res.send(result)
    })
})

// Get all shows for a particular movie
app.get('/movies/:id', (req, res) => {
    db.query(`SELECT title FROM movie WHERE id=${req.params.id}`, (e, movieTitle) => {
        db.query(`SELECT * FROM shows WHERE id=${req.params.id}`, (err, shows) => {
            if(err)
                return res.send(err)
            const response = {
                shows,
                ...movieTitle
            }
            res.send(response)
        })
    })
})

// Get seats/tickets for a particular show for a movie
app.get('/movies/:id/:showId', (req, res) => {
    db.query(`SELECT * FROM tickets WHERE showId=${req.params.showId}`, (err, tickets) => {
        if(err)
            return res.send(err)
        
        res.send(tickets)
    })
})


app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})