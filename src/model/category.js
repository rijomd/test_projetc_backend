let mongoose = require('mongoose');

// type main:1 sub:2 chid:3 if we need
let categorySchema = mongoose.Schema({
    status: { type: Number },
    parent:{type:Boolean},
    name: { type: String, trim: true, unique: true, required: true },
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
});
let Category = mongoose.model('Category', categorySchema);
module.exports = Category;