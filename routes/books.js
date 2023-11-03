const express=require("express")
const router=express.Router()
const Book=require("../models/book")
const booksController=require("../controllers/book")

 router.post("/", booksController.addBook)
  
  //GET Books
  
  router.get("/", booksController.fetchBooks)
  
  //PUT books
  router.put("/:ISBN", booksController.updateBook)
  // Delete book
  
  router.delete("/:ISBN", booksController.deleteBook)

  module.exports=router