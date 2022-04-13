const express = require('express');
const path = require('path');
const app = express()
const db = require('./db')
const port = 3000

const views = path.join(__dirname, "../public")
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', views)

app.use(express.static(views))

// Get all movies in the database
app.get('/movies', (req, res) => {
    db.query("SELECT * FROM movie", (err, result) => {
        if(err)
            return res.send(err)
        
        res.render('index', {movies: result})
    })
})

// Get all shows for a particular movie
app.get('/movies/:id', (req, res) => {
    db.query(`SELECT title FROM movie WHERE movie_id=${req.params.id}`, (e, movieTitle) => {
        db.query(`SELECT * FROM shows WHERE movie_id=${req.params.id}`, (err, shows) => {
            if(err)
                return res.send(err)
            const response = {
                shows,
                ...movieTitle
            }
            res.render('shows', {shows: response})
        })
    })
})

// Get seats/tickets for a particular show for a movie
app.get('/movies/:id/:showId', (req, res) => {
    db.query(`SELECT * FROM tickets WHERE showId=${req.params.showId} AND availability=1`, (err, tickets) => {
        if(err)
            return res.send(err)
        res.render('seats', {tickets})
    })
})

// Book a ticket and block it for 1 minute
app.post('/movies/:id/:showId/book', (req, res) => {
    const tickets = req.body['tickets']
    for(let i = 0; i < tickets.length; i++){
        db.beginTransaction((err) => {
            if(err)
                return res.send(err)
        
            // Select the seat and check if it is available
            db.query(`SELECT availability FROM tickets WHERE showId=${req.params.showId} AND seat_number='${tickets[i]}'`, (e, result) => {
                if(err || result == 0){
                    db.rollback(() => {
                        res.status(500).send({'error': 'error'})
                    })
                }
                
                db.query(`UPDATE tickets SET availability=0 WHERE showId=${req.params.showId} AND seat_number='${tickets[i]}'`, (e, result) => {
                    if(err){
                        db.rollback(() => {
                            res.status(500).send({'error': 'error'})
                        })
                    }

                    db.commit((err) => {
                        if(err){
                            db.rollback(() => {
                                res.status(500).send({'error': 'error'})
                            })
                        }
                        
                        res.send({'success': 'Tickets booked successfully'})
                    })
                })
            })
        })
    }
})

app.get('/success', (req, res) => {
    res.render('success')
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