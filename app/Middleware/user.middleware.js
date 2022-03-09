const UtilService = require('../Utils/util.service')
const StatusCodes = require('../Values/StatusCodes')
class UserMiddleware {
  constructor(utilService){
    this.utilService = utilService
  }
   async auth(req,res,next) {
    // const token = req.headers.authorization.split(" ")[1]
    // if (!token) res.status(403).json({ CODE: StatusCodes.AUTH_FAILED })
    // // const decodeToken = jwt.decode(token)
    // // if (!decodeToken) res.status(403).json({ CODE: StatusCodes.AUTH_FAILED })
    // // const foundedUser = await User.findById({ _id: decodeToken.id })
    // const foundedUser = await UtilService.axiosInstance({ url: Constant.getUserInfoUrl, token, type: 'get' })
    // if (!foundedUser) res.status(403).json({ CODE: StatusCodes.AUTH_FAILED })
    // else {
    //   req.token = foundedUser.token
    //   req.driverInformation = foundedUser.driverInformation
    //   req.userId = foundedUser._id
      req.userId = '620cc7477cd53fbb0b00c944'
      req.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjkxMTM5MzA5MTgiLCJpZCI6IjYxZmEzZWIzZmNmNmFmYzIwMTAwYTJlMiIsImlhdCI6MTY0Mzc5MDAwMywiZXhwIjoxNjc2MTkwMDAzfQ.UuHnzbifyl0CcpHop1d6ghp_mxslEDD1hwn6UBcL7W4'
      next()
    // }
  }
}
module.exports = new UserMiddleware(UtilService)
