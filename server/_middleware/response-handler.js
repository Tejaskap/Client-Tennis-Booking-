/**
 * Custom API Response handler
 * Take 4 arguments -
 * 1 - Response object
 * 2 - For displaying appropriate messages for which action is performed
 * 3 - For checking if the error has occurred or not
 * 4 - Data sent to user
 */
module.exports = (req, res, message, status = false, data) => {
  let resObject = {
    status: status,
    message: message,
  };

  if (status) {
    if (data) {
      resObject["data"] = data;
    }
  }

  return res.status(200).json(resObject).end();
};
