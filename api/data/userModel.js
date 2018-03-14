const mongoose = require("mongoose");
const userSchema = mongoose.Schema({

    id: { type: String },
    address: {
        line1: { type: String },
        line2: { type: String },
        country: { type: String },
        state: { type: String },
        zipCode: { type: Number }
    }

});

mongoose.model("userModel", userSchema);