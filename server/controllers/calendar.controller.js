/**
 * The calendar controller defines all routes for the Node.js + MySQL CRUD API
 */
const responseHandler = require("../_middleware/response-handler");
const { listEvents } = require("../lib/getCalender");

module.exports = {
  getAll,
};

async function getAll(req, res, next) {
  //   await listEvents()
  //     .then((result) => responseHandler(req, res, "Records Found", true, result))
  //     .catch((error) => responseHandler(req, res, error));
  console.log(await listEvents());
}
