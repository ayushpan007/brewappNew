const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

bookSchema.methods.sanitize = function () {
  var book = this;
  book = book.toObject();

  delete book.createdAt;
  delete book.updatedAt;

  return book;
};
const Books = mongoose.model("Books", bookSchema);

module.exports = { Books };
