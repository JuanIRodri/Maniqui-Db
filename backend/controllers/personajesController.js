const db = require('../config/db');

exports.getPersonajes = (req, res) => {
    const query = `
        SELECT p.idPersonaje, p.nombre, p.clase, p.nivel, p.altura, p.musculatura, c.Forma as Forma_Cabeza
        FROM Personaje p
        JOIN Cuerpo cu ON p.idCuerpo = cu.idCuerpo
        JOIN Cabeza c ON cu.idCabeza = c.idCabeza;
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching characters:', err);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json(results);
    });
};

exports.getPersonajeDetail = (req, res) => {
    const query = `
        SELECT 
            p.idPersonaje, p.nombre, p.clase, p.nivel, p.altura, p.musculatura,
            c.Forma as Cabeza_Forma,
            ca.Corte as Cabello_Corte, ca.Tinte as Cabello_Tinte,
            b.Forma as Boca_Forma, b.Tamanio as Boca_Tamanio, b.Color as Boca_Color,
            n.Forma as Nariz_Forma, n.Tamanio as Nariz_Tamanio,
            cu.Cantidad as Cuernos_Cantidad, cu.Tamanio as Cuernos_Tamanio, cu.Color as Cuernos_Color,
            o.Color as Ojos_Color, o.Forma as Ojos_Forma, o.Tamanio as Ojos_Tamanio,
            ce.Tinte as Cejas_Tinte, ce.Forma as Cejas_Forma,
            pe.Forma as Pestanias_Forma, pe.Tamanio as Pestanias_Tamanio,
            t.Forma as Torso_Forma, t.Tamanio as Torso_Tamanio, t.Bello as Torso_Bello,
            br_f.Tipo as Brazo_Tipo, br_f.color as Brazo_Color, br.Cantidad as Brazo_Cantidad,
            pi.Tipo as Pierna_Tipo, pi.Tamanio as Pierna_Tamanio
        FROM Personaje p
        JOIN Cuerpo cr ON p.idCuerpo = cr.idCuerpo
        JOIN Cabeza c ON cr.idCabeza = c.idCabeza
        JOIN Cabello ca ON c.idCabello = ca.idCabello
        JOIN Boca b ON c.idBoca = b.idBoca
        JOIN Nariz n ON c.idNariz = n.idNariz
        JOIN Cuernos cu ON c.idCuernos = cu.idCuernos
        JOIN Ojos o ON c.idOjos = o.idOjos
        JOIN Cejas ce ON o.idCejas = ce.idCejas
        JOIN Pestanias pe ON o.idPestanias = pe.idPestanias
        JOIN Torso t ON cr.idTorso = t.idTorso
        JOIN Brazo br ON cr.idBrazo = br.idBrazo
        JOIN FormaBrazo br_f ON br.idFormaBrazo = br_f.idFormaBrazo
        JOIN Pierna pi ON cr.idPierna = pi.idPierna
        WHERE p.idPersonaje = ?;
    `;
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            console.error('Error fetching character detail:', err);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Personaje no encontrado' });
            return;
        }
        res.json(results[0]);
    });
};

exports.deletePersonaje = (req, res) => {
    const query = 'DELETE FROM Personaje WHERE idPersonaje = ?';
    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json({ message: 'Personaje eliminado' });
    });
};

exports.updatePersonaje = (req, res) => {
    const { nombre, clase, nivel, altura, musculatura } = req.body;
    const query = `
        UPDATE Personaje 
        SET nombre = ?, clase = ?, nivel = ?, altura = ?, musculatura = ? 
        WHERE idPersonaje = ?
    `;
    db.query(query, [nombre, clase, nivel, altura, musculatura, req.params.id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json({ message: 'Personaje actualizado' });
    });
};

exports.createPersonaje = (req, res) => {
    const { nombre, clase, nivel, altura, musculatura } = req.body;
    
    // Simplificado: Para crear uno nuevo, le asignamos el idCuerpo = 1 por defecto 
    // (en un sistema real crearíamos toda la cadena de partes)
    const query = `
        INSERT INTO Personaje (nombre, clase, nivel, altura, musculatura, idCuerpo)
        VALUES (?, ?, ?, ?, ?, 1)
    `;
    db.query(query, [nombre, clase, nivel, altura, musculatura], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.status(201).json({ id: result.insertId, message: 'Personaje creado' });
    });
};
