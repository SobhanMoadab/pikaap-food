const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")
const moment = require("moment")

const userSchema = new mongoose.Schema(
    {
        userTypes: [{type: String}],
        firstName: {type: String},
        lastName: {type: String},
        phoneNumber: {type: String, required: true},
        balance: {type: Number, default: 0},
        currency: {type: String},
        countryCode: {type: String, required: true},
        token: {type: String},
        gender: {type: String, enum: ["MALE", "FEMALE", "OTHER"]},

        access: {},

        financial: {
            shabaNumber: {type: String},
            kartNumber: {type: String},
        },
        blocks: [
            {
                reason: {type: Number},
                description: {type: String},
                blocker: {type: String},
                userType: {type: String},
            },
        ],
        invoice: [
            {
                payType: {type: String, enum: ["POS", "BANK_KARD", "BANK_ACC"]},
                Status: {type: String, enum: ["PENDING", "ACCEPTED", "REJECTED"]},
                trackingCode: {type: String},
                createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
                creatorType: {type: String, enum: ["ADMIN", "SUPER_AGENT", "AGENT"]},
                receiverId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
                amount: {type: Number},
                reason: {type: String, enum: ["SUBSCRIPTION", "CHARGE_WALLET", "PAY_DEBTS"]},
                date: {type: Date},
            },
        ],
        driverInformation: {
            createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
            carBrand: {type: String},
            vin: {type: String},
            insuranceNumber: {type: String},
            insuranceExpiryDate: {type: String},
            carModel: {type: String},
            nationalCode: {type: String},
            debt: [
                {
                    receiverId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
                    payerId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
                    amount: {type: Number},
                    reason: {type: String},
                    commissionReceiverType: {type: String},
                    date: {type: Date},
                },
            ],
            carSystem: {type: String},
            financialGroup: {type: mongoose.Schema.Types.ObjectId, ref: "FinancialGroup"},
            travelGroup: {type: mongoose.Schema.Types.ObjectId, ref: "TravelGroup"},
            carColor: {type: String},
            uniqueCodeThirdPartyInsurance: {type: String},
            plateNumber: {
                twoDigit: {type: Number},
                letter: {type: String},
                threeDigit: {type: Number},
                iran: {type: Number},
            },
            isCompleteRegistration: {type: Boolean, default: false},
            agentCode: {type: String},
            agentId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
            updatedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
            agentName: {type: String},
            superAgentId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
            driverLicenseNumber: {type: String},
            status: {
                type: String,
                enum: ["NO_SERVICE", "REACHING_TO_PASSENGER", "IN_SERVICE", "WAITING_FOR_PASSENGER", "TRIP"],
                default: "NO_SERVICE",
            },
            isOnline: {type: Boolean, default: false},
            approved: {
                isApproved: {type: Boolean, default: false},
                approvedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
                approvedAt: {type: Date},
            },
            comments: [
                {
                    rate: {type: Number},
                    text: {type: String},
                    travelId: {type: mongoose.Schema.Types.ObjectId, ref: "FinancialGroup"},
                    passengerId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
                    date: {type: Date},
                },
            ],
            averageRate: {type: Number},
            subscriptionExpireAt: {type: String, default: moment().add(1, "m").format()},
        },
        passengerInformation: {
            status: {
                type: String,
                enum: ["NO_SERVICE", "IN_SERVICE", "TRIP"],
                default: "NO_SERVICE",
            },
        },
        agentInformation: {
            code: {type: String},
            name: {type: String},
            superAgent: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
            drivers: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
            nationalCode: {type: String},
            averageRate: {type: Number},
            financialGroup: {type: mongoose.Schema.Types.ObjectId, ref: "FinancialGroup"},
            travelGroup: {type: mongoose.Schema.Types.ObjectId, ref: "TravelGroup"},
            createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
            updatedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},

            approved: {
                isApproved: {type: Boolean, default: false},
                approvedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
                approvedAt: {type: Date},
            },
        },

        superAgentInformation: {
            createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
            averageRate: {type: Number},
            approved: {
                isApproved: {type: Boolean, default: false},
                approvedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
                approvedAt: {type: Date},
            },
            code: {type: String},
            drivers: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
            agentList: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
            nationalCode: {type: String},
            financialGroup: {type: mongoose.Schema.Types.ObjectId, ref: "FinancialGroup"},
            travelGroup: {type: mongoose.Schema.Types.ObjectId, ref: "TravelGroup"},
            updatedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        },

        addressInformation: [
            {
                city: {type: String},
                address: {type: String},
                province: {type: String},
            },
        ],

        favoriteAddresses: [
            {
                city: {type: String},
                address: {type: String},
                province: {type: String},
                name: String,
                lng: String,
                lat: String,
            },
        ],

        favoriteTravels: [
            {
                source: {
                    city: {type: String},
                    address: {type: String},
                    province: {type: String},
                    name: String,
                    lng: String,
                    lat: String,
                },
                destination: {
                    city: {type: String},
                    address: {type: String},
                    province: {type: String},
                    name: String,
                    lng: String,
                    lat: String,
                },
            },
        ],
    },
    {timestamps: true}
)

userSchema.plugin(mongoosePaginate)
module.exports = mongoose.model("User", userSchema)
