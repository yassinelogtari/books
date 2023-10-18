const express = require ("express")


const mongoose=require("mongoose")
const Task=require("./models/Book")

mongoose
  .connect(
   "mongodb+srv://kecar14274:p4HB1dc9UgIrkrXn@cluster0.fgmqzpq.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(console.log("connected to mongodb"))
  .catch((err) => console.log(err));

const app = express()
app.use(express.json())

//Create Book
app.post("/api/books", async (req, res) => {
    const newBook = new Books(req.body);
  
    try {
      const savedBook = await newBook.save();
      res.status(200).json(savedBook);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  });
  
  //GET Books
  app.get("/api/books/:ISBN", async (req, res) => {
    try {
     
      const Bookstoget = await Books.findOne({ ISBN: req.params.ISBN });
      res.status(200).json(Bookstoget);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  });
  
  app.get("/api/books", async (req, res) => {
    try {
      let BooksToget;
      BooksToget = await Books.find();
      res.status(200).json(BooksToget);
    } catch (err) {
  ///index
    res.status(500).json({ msg: err.message });
    }
  });
  
  //PUT books
  app.put("/api/books/:ISBN", async (req, res) => {
    try {
      const updatedBooks = await Books.findOneAndUpdate(
        { ISBN: req.params.ISBN },
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedBooks);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  });
  
  // Delete book
  
  app.delete("/api/books/:ISBN", async (req, res) => {
    try {
      const Bookstodelete = await Books.findOneAndDelete({
        ISBN: req.params.ISBN,
      });
  
      if (Bookstodelete) {
        res
          .status(200)
          .json("Book with ISBN: " + req.params.ISBN + " was deleted");
      }else
      {
        res
        .status(404)
        .json("Book with ISBN: " + req.params.ISBN + " not found");
      }
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  });
module.exports = app