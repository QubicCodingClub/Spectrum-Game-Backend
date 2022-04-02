const db = require("./db");
const mongooseSchema = require("mongoose").Schema;
const mongooseObjectId = require("mongoose").Types.ObjectId;

const UserModel = db.model(
    "User",
    new mongooseSchema({
        name: { type: String, required: true },
        email: { type: String, required: true },
        que: {
            r1: { type: Array, required: true },
            r2: { type: Array, required: true },
        },
        s_r1: { type: Number, required: false, default: 0 },
        s_r2: { type: Number, required: false, default: 0 },
        verified: { type: Boolean, required: false, default: false },
    }),
    "User"
);

module.exports = UserModel;
