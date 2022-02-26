const SADERAT_CALLBACK_URL = "http://185.255.89.184:8457/api/v1/payment/saderat/verify"
const TERMINAL_ID = 69002403
const SADERAT_SERVICE_TOKEN = "https://mabna.shaparak.ir:8081/V1/PeymentApi/GetToken"
const WALLET_CHARGE = 1000
const SUBSCRIPTION = 2000
const REDIRECT_TO_APP_URL = "https://google.com"
const SUBSCRIPTION_SERVICE_URL = "http://localhost:8451/api/v1/wallet/subscription"
const ZARINPAL_API = "d6bf06fa-756b-46de-bbf0-55dee2989872"
const SADERAT_PAY = "https://sepehr.shaparak.ir:8080/Pay"
const getUserInfoUrl = "http://185.255.89.184:8451/api/v1/archivist/user-by-token"
const getUserByIdUrl = "http://185.255.89.184:8451/api/v1/archivist/user-by-id"
const accountantById = "http://185.255.89.184:8451/api/v1/accountant/charge-wallet_by_id"
const accountantCheckWalletById = "http://185.255.89.184:8451/api/v1/accountant/check-wallet-by-id"
const archivistFindUserById = "http://185.255.89.184:8451/api/v1/archivist/user-by-id"
const findAdminById = "http://185.255.89.184:8451/api/v1/administrator/find-admin-id"
const findTaxById = "http://185.255.89.184:8451/api/v1/administrator/find-tax-id"
const accountantByToken = "http://185.255.89.184:8451/api/v1/accountant/charge-wallet_by_token"
const getMultipleDriverById = "http://185.255.89.184:8451/api/v1/archivist/driver/multiple"
const financialIsUsed = "http://185.255.89.184:8451/api/v1/archivist/check-use/financial-group"
const travelGroupIsUsed = "http://185.255.89.184:8451/api/v1/archivist/check-use/travel-group"
const findTravelById = "http://185.255.89.184:8453/api/v1/travel/by-id"
const unblockUser = "http://185.255.89.184:8451/api/v1/block/unblock"
const addSubscriptionDays = "http://185.255.89.184:8451/api/v1/driver/subscription"

// const HEIMDALL_API =
module.exports = {
  addSubscriptionDays,
  unblockUser,
  travelGroupIsUsed,
  financialIsUsed,
  getMultipleDriverById,
  getUserInfoUrl,
  findTravelById,
  accountantCheckWalletById,
  SADERAT_CALLBACK_URL,
  archivistFindUserById,
  findAdminById,
  findTaxById,
  TERMINAL_ID,
  SADERAT_SERVICE_TOKEN,
  WALLET_CHARGE,
  SUBSCRIPTION,
  REDIRECT_TO_APP_URL,
  getUserByIdUrl,
  accountantById,
  accountantByToken,
  SUBSCRIPTION_SERVICE_URL,
  ZARINPAL_API,
  SADERAT_PAY,
}
