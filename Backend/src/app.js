const express = require('express');
const app = express()
const db = require('./db')
const port = 3000

app.use(express.json())

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
    db.query(`SELECT * FROM tickets WHERE showId=${req.params.showId} AND availability=1`, (err, tickets) => {
        if(err)
            return res.send(err)
        
        res.send(tickets)
    })
})

// Book a ticket and block it for 1 minute
app.post('/movies/:id/:showId/', (req, res) => {
    const ticket = req.body['ticket']
    db.query(`UPDATE tickets SET availability=0 WHERE showId=${req.params.showId} AND seat_number='${ticket}'`, (err, result) => {
        if(err)
            return res.send(err)
        
        res.send({"success": 'Ticket booked successfully!'})
    })
})

// Show booked tickets
app.get('/movies/:id/:showId/booked', (req, res) => {
    db.query(`SELECT * FROM tickets WHERE availability=0`, (err, result) => {
        if(err)
            return res.send(err)
        
        res.send(result)
    })
})


app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})