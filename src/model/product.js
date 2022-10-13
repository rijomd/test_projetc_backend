const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    status: { type: Number },
    price: { type: Number },
    name: {
        type: String,
        required: true,
        trim: true
    },
   
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
});

module.exports = mongoose.model('Product', productSchema);