const handleError = (err, res) => {
  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
  return;
};

const sendResponse = (code = 204, body, res) => {
  let resObj = body ? { ...body } : undefined;
  if (resObj) {
    res.status(code).json(resObj);
  } else {
    res.status(code).end();
  }
  return;
};

module.exports = { handleError, sendResponse };
