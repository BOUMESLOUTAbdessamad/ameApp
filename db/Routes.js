
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
var dateFormat = require('dateformat');
var now = new Date();
var md5 = require('md5');
const stamp = dateFormat(now, "yyyy-mm-dd h:MM:ss");

const connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'ame',
  multipleStatements: true
  // insecureAuth : true

});

// Create our app.
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.get('/movies', function (req, res) {
     
    connection.getConnection(function (err, connection) {

      var sql = "SELECT * FROM movies WHERE movies.score IS NOT NULL AND movies.score > 8.5; SELECT * FROM watchlists WHERE user = 1";
      connection.query(sql, function (error, results, fields) {
        if (error) throw error;

        res.send(results);
        // console.log(results);
      });

  });
});

// Get Movie by ID
app.post('/get_movie',(req, res) => {

    connection.getConnection(function (err, connection) {
      var sql = "SELECT * FROM movies WHERE movies.id=" + req.body.movie + 
      ";SELECT * FROM watchlists WHERE movie=" + req.body.movie  + " AND user = " + 1 + 
      ";SELECT genres.name as genre FROM genres JOIN movies_genres ON movies_genres.genre=genres.id WHERE movies_genres.movie=" + req.body.movie;

      connection.query( sql, (err, results) => {

      if(err) throw err;
      if(results.length != 0 ) {
        res.send(JSON.stringify(results));
      }
    });

  });
}); 

app.post('/count_reviews',(req, res) => {

    connection.getConnection(function (err, connection) {
      var sql = "SELECT COUNT(*) as reviews_count FROM reviews WHERE status='approved' AND entry_id=" + req.body.movie;

      connection.query( sql, (err, results) => {

      if(err) throw err;
      if(results.length != 0 ) {
        res.send(JSON.stringify(results));
      }
    });

  });
});

app.post('/add_to_watchlist',(req, res) => {
  connection.getConnection(function (err, connection) {

    connection.query("SELECT * FROM watchlists WHERE watchlists.movie ="+req.body.movie, (err, results) => {

      if(err) throw err;

      if(results.length != 0 ) {
        
        connection.query("DELETE FROM watchlists WHERE movie="+req.body.movie,(error, results) => {

          if(err) throw err;
          console.log("Removed from watchlist")

          res.send(results);
         });
      } else{

        connection.query("INSERT INTO watchlists SET ?", {user: req.body.user, movie: req.body.movie, created: stamp},(error, results) => {
          if(err) throw err;
          console.log("Added to watchlist")

          res.send(results);
         });
      }
      
    });

  });
});

app.post('/get_reviews', function (req, res) {

  connection.getConnection(function (err, connection) {
    connection.query('SELECT * FROM reviews WHERE reviews.status="approved" AND entry_id=' +
     req.body.entry_id + ' AND entry="'+ req.body.entry + '"', function (error, results, fields) {

      if (error) throw error;
      res.send(results);
    });

});
}); 

app.post('/add_review', function (req, res) {
  
  req.body.created = stamp;
  req.body.updated = stamp;
  // console.log(req.body);
  connection.getConnection(function (err, connection) {
    connection.query('INSERT INTO reviews SET ?', req.body,  function (error, results, fields) {

    if (error) throw error;
      res.send(results);
    });

  });
});

app.post('/login', function(req, res) {
  connection.getConnection(function (err, connection) {
   //Get user by email
    connection.query("SELECT * FROM users WHERE users.email='"+req.body.email+ "'" ,  function (error, results, fields) {

        if(results.length != 0) {
         if(req.body.password != null && md5(req.body.password) == results[0].password) {
          res.send(results);
         }
          else {
          res.send([]);
        }
      }
       else {
        res.send([]);

      }
        if (error) throw error;
    });

  });
})
    app.post('/get_watchlist', function( req, res) {
        connection.getConnection(function(err, connection) {
            connection.query("SELECT *, watchlists.movie as movie_id FROM movies JOIN watchlists on watchlists.movie=movies.id WHERE watchlists.user=1 ORDER BY watchlists.id DESC" , function(error, results, fields) {
                
                if (error) throw error;
                res.send(results);
            })
        })
    })

    app.post('/remove_watchlist', function(req ,res) {  // TODO remove a movie from watchlist

      connection.getConnection(function(err, connection) {
        // console.log(req.body.movie);
        connection.query("DELETE FROM watchlists WHERE watchlists.movie=" + req.body.movie, function(error,results,fields ) {
            if (error) throw error;

            res.send(results);

        });
   
      })
    })

    app.post('/get_user_reviews', function( req, res) {
      connection.getConnection(function(err, connection) {
          connection.query("SELECT reviews.*,reviews.id as review_id, movies.title as movie_title, reviews.title as review_title FROM reviews JOIN movies on reviews.entry_id=movies.id WHERE reviews.user=1 AND reviews.status='approved' ORDER BY reviews.id DESC" , function(error, results, fields) {

              if (error) throw error;

              res.send(results);
          })
      })
  })

app.listen(3000, () => {
 console.log('Node server on');
});

