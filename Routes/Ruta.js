const express = require('express');
const RUTAS = express.Router();
const JuegoModel = require('../Models/Juego');

RUTAS.get('/todo', async (req, res) =>{
    try {
        const npc = await JuegoModel.find();
        console.log(npc);
        res.json(npc);
    }
    catch(error){
        res.status(500).json({mensaje: error.message});
    }
});

RUTAS.post('/agregar', async (req, res) =>{
   
    const nuevoJuego = new JuegoModel({
        nombre: req.body.nombre,
        disponibles: req.body.disponibles,
        categoria: req.body.categoria,
        consola: req.body.consola,
        precio: req.body.precio,
       
    });
    try {
        const guardarJuego = await nuevoJuego.save();
        res.status(201).json(guardarJuego);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

RUTAS.put('/editar/:id', async (req, res) =>{
    try {
        const actualizarJuego = await JuegoModel.findByIdAndUpdate(req.params.id, req.body, { new: true});
        if (!actualizarJuego)
            return res.status(404).json({ mensaje : 'No se encontro'});
        else 

            return res.json(actualizarJuego);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

RUTAS.delete('/eliminar/:id', async (req, res) =>{
    try {
        const eliminarJuego = await JuegoModel.findByIdAndDelete(req.params.id);
        if (!eliminarJuego)
            return res.status(404).json({ mensaje : 'No se encontro'});
        else 

        return res.json({mensaje : 'Juego eliminada correctamente :)' });
    } catch(error){
        res.status(500).json({mensaje: error.message});
    }
});

//consultas  1  juego por nombres

RUTAS.get('/juegoNombre/:nombre', async (req, res) => {

    try {

        const juegoNombre = await JuegoModel.find({ nombre: new RegExp(req.params.nombre, 'i')});

        return res.json(juegoNombre);

    } catch(error) {

        res.status(500).json({ mensaje :  error.message})

    }

});
// consultas  2  juego ordenadas por nombre 

RUTAS.get('/ordenarNombre', async (req, res) => {
    try {
       const ordenarNombre = await JuegoModel.find().sort({ nombre: 1});
       res.status(200).json(ordenarNombre);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});
// consultas  3 PRECIOS
RUTAS.get('/porPrecio/:precio', async (req, res) => {
    try {
       const precios = await JuegoModel.find({ precio : req.params.precio});
       res.status(200).json(precios);


    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

// consultas  4  contar 
RUTAS.get('/cuantosJuegos/:categoria', async (req, res) => {
    try {
        const total = await JuegoModel.countDocuments({ categoria : req.params.categoria});
        return res.json({Disponibles: total });
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

// - eliminar todas las recetas
RUTAS.delete('/eliminarCategorias/:categoria', async (req, res) => {
    try {
        await JuegoModel.deleteMany({categoria : req.params.categoria});
        return res.json({mensaje: "La Categoria fue Eliminada :)"});
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});
module.exports = RUTAS;