const {v4: uuidv4} = require("uuid")
const axios = require("axios").default

class UtilService {
    constructor() {
    }

    async uuidv4() {
        return uuidv4()
    }

    async escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
    }

}

module.exports = new UtilService()
