const Book= require("../models/book")

const fetchBooks=async(req,res)=>{
    try {
        let BooksToget;
        BooksToget = await Books.find();
        res.status(200).json(BooksToget);
      } catch (err) {
    ///index
      res.status(500).json({ msg: err.message });
      }
}

const addBook= async(req,res)=>{
    const newBook = new Book (req.body);
  
    try {
      const savedBook = await newBook.save();
      res.status(200).json(savedBook);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
}

const updateBook=async(req,res)=>{
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
}

const deleteBook=async(req,res)=>{
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
}

module.exports={
    fetchBooks,
    addBook,
    updateBook,
    deleteBook
}