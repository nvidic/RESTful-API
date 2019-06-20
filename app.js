var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

/*
import express from 'express';
var app = express();
import { json } from 'body-parser';
import { connect, connection } from 'mongoose';
*/

app.use(bodyParser.json());

Genre = require('./models/genre');
Book = require('./models/books');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

// Setting route for home page
app.get('/', function(req, res){
    res.send('Please use 1 /api/books or /api/genres');
});

app.get('/api/genres', function(req, res){
    Genre.getGenres(function(err, genres){
        if(err)
            throw err;
        res.json(genres);
    });
});

app.post('/api/genres', function(req, res){
    // body-parser
    var genre = req.body;

    Genre.addGenre(genre, function(err, genre){
        if(err)
            throw err;
        res.json(genre);
    });
});

app.put('/api/genres/:_id', function(req, res){
    var id = req.params._id;
    var genre = req.body;

    Genre.updateGenre(id, genre, {}, function(err, genre){
        if(err)
            throw err;
        res.json(genre);
    });
});

app.delete('/api/genres/:_id', function(req, res){
    var id = req.params._id;
    Genre.removeGenre(id, function(err, genre){
        if(err)
            throw err;
        res.json(genre);
    });
});

app.get('/api/books', function(req, res){
    Book.getBooks(function(err, book){
        if(err)
            throw err;
        res.json(book);
    });
});

app.get('/api/books/:_id', function(req, res){
    Book.getBookById(req.params._id, function(err, books){
        if(err)
            throw err;
        res.json(books);
    });
});

app.post('/api/books', function(req, res){
    // potrebna je autentifikacija
    // body-parser
    var book = req.body;

    Book.addBook(book, function(err, book){
        if(err)
            throw err;
        res.json(book);
    });
});

app.put('/api/books/:_id', function(req, res){
    var id = req.params._id;
    var book = req.body;

    Book.updateBook(id, book, {}, function(err, book){
        if(err)
            throw err;
        res.json(book);
    });
});

app.delete('/api/books/:_id', function(req, res){
    var id = req.params._id;
    Book.removeBook(id, function(err, book){
        if(err)
            throw err;
        res.json(book);
    });
});

// port 3000
app.listen(3000);
console.log('Running on port 3000');

