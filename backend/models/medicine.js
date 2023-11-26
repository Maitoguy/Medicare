// Medicine Model
const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({

    medicineName:{
        type: String
    },

    morning:{
        type: String
    },

    afternoon:{
        type: String
    },

    evening:{
        type: String
    }

   
},{
    timestamps: true
});

const Medicine = mongoose.model('Medicine' , medicineSchema);

module.exports= Medicine;