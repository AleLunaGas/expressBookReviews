const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
    const username = req.body.username;
    const password = req.body.password;
    
    if (username && password) {
        // Check if the user does not already exist
        if (isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
    //return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let getListPromise = new Promise ((resolve, reject) => {
    setTimeout (() => {
        res.send(JSON.stringify(books, null, 4));
        resolve("getList success")
    }, 6000)});

    getListPromise.then((successMessage) => {
        console.log (successMessage)
    })
  //res.send(JSON.stringify(books, null, 4));
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let getISBNPromise = new Promise ((resolve, reject) => {
    setTimeout (() => {
        const isbn = req.params.isbn;
        res.send(books[isbn]);
        resolve("getISBNPromise success");
    }, 6000)});

    getISBNPromise.then((successMessage) => {
        console.log (successMessage)
    })
  
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let getAuthorPromise = new Promise ((resolve, reject) => {
    setTimeout (() => {
        const author = req.params.author;
        let k = Object.keys(books);
        for (i = 0; i < k.length; i++) {
          let book = books[k[i]];
          if (book['author'] == author){
             return res.send(book);
          } 
        }
        res.send(`book with author ${author} does not exists.`);
        resolve("getAuthorPromise success");
    }, 6000)});

    getAuthorPromise.then((successMessage) => {
        console.log (successMessage)
    })

 
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let getTitlePromise = new Promise ((resolve, reject) => {
    setTimeout (() => {
        const title = req.params.title;
        let k = Object.keys(books);
        for (i = 0; i < k.length; i++) {
            let book = books[k[i]];
            if (book['title'] == title){
                res.send(book);
            }   
        } 
        resolve("getTitlePromise success");
    }, 6000)});

    getTitlePromise.then((successMessage) => {
        console.log (successMessage)
    })


  
  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn]["reviews"]);
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
