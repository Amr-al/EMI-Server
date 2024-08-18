import mongoose from "mongoose";

const documentModel = new mongoose.Schema({
    images: [String],
    chief: { type: Boolean, default: false },
    infoChief: { type: Boolean, default: false },
    planChief: { type: Boolean, default: false },
    montChief: { type: Boolean, default: false },
    sections: [String],
    note: String,
    bossDescision: String,
    action: String,
    forwardTo: {
        type: String,
        enum: ['chief', 'montChief', 'infoChief', 'planChief']
    },
    faxNo: { type: String, maxLength: 50 },
    uniqueID: Number,
    receiver: String,
    from: String,
    object: String,
    type: { type: String, enum: ['income', 'outcome'] },
    reviewed: { type: Boolean, default: false },
}, {
    timestamps: true
});

const Document = mongoose.model('Document', documentModel);

export default Document;