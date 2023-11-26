// User Model
const mongoose = require('mongoose');

const sunitaSchema = new mongoose.Schema({
    
    height: {
        type: Number
    },

    weight: {
        type: Number
    },

    wcircum:{
        type: Number
    },

    hcircum:{
        type: Number
    },

    bmi:{
        type: Number
    },

    whr:{
        type: Number
    },

    email:{
        type: String
    }
    
},{
    timestamps: true
});

const Sunita = mongoose.model('Sunita' , sunitaSchema);

module.exports= Sunita;