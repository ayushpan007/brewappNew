const { Books } = require("../modals/books");
const { handleError, sendResponse } = require("../utils/basic");
const mongoose = require("mongoose");

const saveBook = async (req, res) => {
  try {
    const { title, author, summary } = req.body;
    var book = await Books.create({ title, author, summary });
    if (book) {
      book = await book.sanitize();
      return sendResponse(201, { ...book }, res);
    }
    return sendResponse(400, { message: "book can not be saved" }, res);
  } catch (err) {
    handleError(err, res);
  }
};

const updateBookDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, author, summary } = req.body;
    if (!id) {
      return sendResponse(400, { message: "ID is required" }, res);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(400, { message: "Invalid ID format" }, res);
    }
    var book = await Books.findOne({ _id: id });
    if (!book) {
      return sendResponse(
        404,
        { message: "Book with matching details not found" },
        res
      );
    }
    if (title) {
      book.title = title;
    }
    if (author) {
      book.author = author;
    }
    if (summary) {
      book.summary = summary;
    }
    await book.save();
    book = book.sanitize();
    return sendResponse(200, { ...book, message: "sucessfully updated" }, res);
  } catch (err) {
    handleError(err, res);
  }
};

const getbook = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return sendResponse(400, { message: "ID is required" }, res);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(400, { message: "Invalid ID format" }, res);
    }
    var book = await Books.findOne({ _id: id });
    if (!book) {
      return sendResponse(
        404,
        { message: "Book with matching details not found" },
        res
      );
    }
    book = book.sanitize();
    return sendResponse(
      200,
      { message: "Book with matching details found", ...book },
      res
    );
  } catch (err) {
    handleError(err, res);
  }
};

const getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    var books = await Books.find().skip(startIndex).limit(limit);

    const totalBooks = await Books.countDocuments();

    const pagination = {};

    if (endIndex < totalBooks) {
      pagination.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit: limit,
      };
    }
    books = books.map((book) => book.sanitize());
    return sendResponse(200, { books, pagination }, res);
  } catch (err) {
    handleError(err, res);
  }
};

const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return sendResponse(400, { message: "ID is required" }, res);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(400, { message: "Invalid ID format" }, res);
    }
    var book = await Books.findOne({ _id: id });
    if (!book) {
      return sendResponse(
        404,
        { message: "Book with matching details not found" },
        res
      );
    }
    await Books.deleteOne({ _id: id });
    return sendResponse(200, { message: "Book deleted successfully" }, res);
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = {
  saveBook,
  updateBookDetails,
  getbook,
  getAllBooks,
  deleteBook,
};
