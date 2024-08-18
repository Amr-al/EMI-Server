import mongoose from "mongoose";

const auto = new mongoose.Schema({
    docNumber: Number
})

const AutoInc = mongoose.model('AutoInc', auto);

export default AutoInc;