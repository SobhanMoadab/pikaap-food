const UtilService = require('../Utils/util.service')
const StatusCodes = require('../Values/StatusCodes')
const User = require('../ExternalModels/user.model')
const jwt = require('jsonwebtoken')

class UserMiddleware {
    constructor(utilService) {
        this.utilService = utilService
    }

    async auth(req, res, next) {
        try {
            //  if (!req.headers || !req.headers.authorization) return res.status(403).json({CODE: StatusCodes.AUTH_FAILED})
            // const token = req.headers.authorization.split(" ")[1]
            // if (!token) res.status(403).json({CODE: StatusCodes.AUTH_FAILED})
            // const decodeToken = jwt.decode(token)
            // if (!decodeToken) res.status(403).json({CODE: StatusCodes.AUTH_FAILED})
            // const foundedUser = await User.findById({_id: decodeToken.id})
            // if (!foundedUser) res.status(403).json({CODE: StatusCodes.AUTH_FAILED})
            // else {
            //     req.phoneNumber = foundedUser.phoneNumber
            //     req.userId = foundedUser._id
            //     next()
            // }
            req.userId = '620cba277cd53fbb0b00c8ed'
            next()
        } catch (e) {
            console.log({e})
            res.status(403).json({CODE: StatusCodes.AUTH_FAILED})
        }

    }
}

module.exports = new UserMiddleware(UtilService)
