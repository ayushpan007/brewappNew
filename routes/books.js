const {
  saveBook,
  updateBookDetails,
  getbook,
  getAllBooks,
  deleteBook,
} = require("../controller/books");

module.exports = (router) => {
  router.post("/saveBook", saveBook);
  router.put("/updateBookDetails/:id", updateBookDetails);
  router.get("/getbook/:id", getbook);
  router.get("/getAllBooks", getAllBooks);
  router.delete("/deleteBook/:id", deleteBook);
};
