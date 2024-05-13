
const mongoose = require('mongoose');

const JuegosSchema = new mongoose.Schema({
    nombre : String,
    disponibles : String,
    categoria : String,
    consola : String,
    precio : Number,

    
})

const JuegoModel = mongoose.model('Juego',JuegosSchema,'Juego');
module.exports = JuegoModel;