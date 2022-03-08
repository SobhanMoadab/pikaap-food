const { ErrorHandler } = require("../Handler");
const { StatusCodes } = require("../Values");

module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalfee = oldCart.totalfee || 0;

    this.add = function (item, id) {
        let storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = { item: item, qty: 0, fee: 0 };
        }
        storedItem.qty++;
        storedItem.fee = storedItem.item.fee * storedItem.qty;
        this.totalQty++;
        this.totalfee += storedItem.item.fee;
    };

    this.reduceByOne = function (id) {
        if (!this.items[id]) throw new ErrorHandler({ httpCode: 404, statusCode: StatusCodes.ERROR_NOT_FOUND, result: 'Item does not exists in cart' })
        this.items[id].qty--;
        this.items[id].fee -= this.items[id].item.fee;
        this.totalQty--;
        this.totalfee -= this.items[id].item.fee;

        if (this.items[id].qty <= 0) {
            delete this.items[id];
        }
    };

    this.removeItem = function (id) {
        this.totalQty -= this.items[id].qty;
        this.totalfee -= this.items[id].fee;
        delete this.items[id];
    };

    this.getItems = function () {
        return this.items;
    };
};