const { v4: uuidv4 } = require("uuid")
const axios = require("axios").default
const StatusCodes = require("../Values/StatusCodes")
const ErrorHandler = require("../Handler/ErrorHandler")

class UtilService {
  constructor() {}
  async uuidv4() {
    return uuidv4()
  }
  async escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
  }

  async roundTripPrice(amount) {
    amount = (amount / 1000).toString().split(".")
    if (amount[1]) {
      amount[1] = amount[1] + "000"
      if (!(parseInt(amount[1].substring(0, 3)) < 500)) amount[0] = parseInt(amount[0]) + 1
    }
    return parseInt(amount[0] + "000")
  }

  async axiosInstance({ url, data = {}, token, type }) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      let result
      if (type === "post") {
        result = await axios.post(url, data, config)
        return result.data.result
      } else if (type === "put") {
        result = await axios.put(url, data, config)
        return result.data.result
      } else if (type === "get") {
        result = await axios.get(url, config)
        return result.data.result
      }
    } catch (e) {
      console.log(e)
      return false
    }
  }
  async calcShare(share, amount) {
    let calcShare = {}
    const result = Object.keys(share).map((key, index) => {
      calcShare[key] = ((share[key] / 100) * amount).toFixed(2)
    })
    return calcShare
  }
}
module.exports = new UtilService()
