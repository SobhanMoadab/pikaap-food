const { v4 } = require("uuid")
const axios = require("axios")
const StatusCodes = require("../Values/StatusCodes")
const ErrorHandle = require("../Handler/ErrorHandler")
axios.default()
class UtilService {
  constructor() { }
  async uuidv4() {
    return uuidv4()
  }
  async escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
  }

}
module.exports = new UtilService()
