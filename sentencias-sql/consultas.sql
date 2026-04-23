USE `Maniqui`;

-- 1. Listado completo de personajes con sus rasgos básicos
-- Obtiene la altura, musculatura y la forma de la cabeza de todos los personajes.
SELECT p.idPersonaje, p.altura, p.musculatura, c.Forma as Forma_Cabeza
FROM Personaje p
JOIN Cuerpo cu ON p.idCuerpo = cu.idCuerpo
JOIN Cabeza c ON cu.idCabeza = c.idCabeza;

-- 2. Detalles estéticos de la cabeza
-- Muestra el color de ojos, tipo de cabello y si el personaje tiene cuernos.
SELECT 
    p.idPersonaje, 
    o.Color as Color_Ojos, 
    ca.Tinte as Color_Cabello, 
    cu.Cantidad as Cantidad_Cuernos
FROM Personaje p
JOIN Cuerpo c ON p.idCuerpo = c.idCuerpo
JOIN Cabeza cab ON c.idCabeza = cab.idCabeza
JOIN Ojos o ON cab.idOjos = o.idOjos
JOIN Cabello ca ON cab.idCabello = ca.idCabello
JOIN Cuernos cu ON cab.idCuernos = cu.idCuernos;

-- 3. Descripción física del cuerpo
-- Detalla las características del torso y las extremidades.
SELECT 
    p.idPersonaje, 
    t.Tamanio as Tamaño_Torso, 
    fb.Tipo as Tipo_Brazo, 
    pi.Tipo as Tipo_Pierna
FROM Personaje p
JOIN Cuerpo c ON p.idCuerpo = c.idCuerpo
JOIN Torso t ON c.idTorso = t.idTorso
JOIN Brazo b ON c.idBrazo = b.idBrazo
JOIN FormaBrazo fb ON b.idFormaBrazo = fb.idFormaBrazo
JOIN Pierna pi ON c.idPierna = pi.idPierna;
