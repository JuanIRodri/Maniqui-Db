const express = require('express');
const router = express.Router();
const personajesController = require('../controllers/personajesController');

router.get('/', personajesController.getPersonajes);
router.get('/:id', personajesController.getPersonajeDetail);
router.post('/', personajesController.createPersonaje);
router.put('/:id', personajesController.updatePersonaje);
router.delete('/:id', personajesController.deletePersonaje);

module.exports = router;
