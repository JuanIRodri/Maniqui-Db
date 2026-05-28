require('dotenv').config();
const mysql = require('mysql2/promise');

const rpgData = [
  { id: 1, nombre: 'Xanthar the Bold', clase: 'Guerrero', nivel: 50 },
  { id: 2, nombre: 'Lyra Silverleaf', clase: 'Mago', nivel: 42 },
  { id: 3, nombre: 'Grommash Ironhide', clase: 'Paladín', nivel: 60 },
  { id: 4, nombre: 'Sylvana Nightshade', clase: 'Cazador', nivel: 35 },
  { id: 5, nombre: 'Kaelen Duskrunner', clase: 'Pícaro', nivel: 28 },
  { id: 6, nombre: 'Thalor Brightmane', clase: 'Paladín', nivel: 55 },
  { id: 7, nombre: 'Morana Stormborn', clase: 'Mago', nivel: 12 },
  { id: 8, nombre: 'Valerius Shadowbane', clase: 'Pícaro', nivel: 48 },
  { id: 9, nombre: 'Elowen Moonwhisper', clase: 'Cazador', nivel: 22 },
  { id: 10, nombre: 'Ryker Steelheart', clase: 'Guerrero', nivel: 15 },
  { id: 11, nombre: 'Balthazar the Wise', clase: 'Mago', nivel: 99 },
];

async function migrate() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  try {
    console.log('--- Iniciando Migración MMORPG ---');
    
    // 1. Añadir columnas si no existen
    await connection.query(`
      ALTER TABLE Personaje 
      ADD COLUMN IF NOT EXISTS nombre VARCHAR(100),
      ADD COLUMN IF NOT EXISTS clase VARCHAR(50),
      ADD COLUMN IF NOT EXISTS nivel INT DEFAULT 1
    `);
    console.log('✅ Columnas añadidas (o ya existían).');

    // 2. Actualizar datos
    for (const char of rpgData) {
      await connection.query(
        'UPDATE Personaje SET nombre = ?, clase = ?, nivel = ? WHERE idPersonaje = ?',
        [char.nombre, char.clase, char.nivel, char.id]
      );
    }
    console.log('✅ Datos de personajes actualizados.');

    // 3. Para los que no están en la lista (si el usuario añadió más)
    await connection.query(`
      UPDATE Personaje SET 
        nombre = CONCAT('Héroe #', idPersonaje), 
        clase = 'Aventurero', 
        nivel = 1 
      WHERE nombre IS NULL
    `);

    console.log('🚀 Migración completada con éxito.');
  } catch (err) {
    console.error('❌ Error en la migración:', err);
  } finally {
    await connection.end();
  }
}

migrate();
