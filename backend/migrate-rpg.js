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
    database: process.env.DB_NAME,
    charset: 'utf8mb4'
  });

  try {
    console.log('--- Iniciando Migración MMORPG ---');
    
    // 1. Añadir columnas
    const columns = [
      { name: 'nombre', definition: 'VARCHAR(100)' },
      { name: 'clase', definition: 'VARCHAR(50)' },
      { name: 'nivel', definition: 'INT DEFAULT 1' }
    ];
    for (const col of columns) {
      try {
        await connection.query(`ALTER TABLE Personaje ADD COLUMN ${col.name} ${col.definition}`);
        console.log(`✅ Columna ${col.name} añadida.`);
      } catch (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
          console.log(`ℹ️ La columna ${col.name} ya existe.`);
        } else {
          throw err;
        }
      }
    }

    // 2. Crear tabla Estadistica si no existe
    await connection.query(`
      CREATE TABLE IF NOT EXISTS Estadistica (
        idPersonaje INT(11) NOT NULL,
        fuerza INT(11) DEFAULT 10,
        destreza INT(11) DEFAULT 10,
        inteligencia INT(11) DEFAULT 10,
        constitucion INT(11) DEFAULT 10,
        agilidad INT(11) DEFAULT 10,
        PRIMARY KEY (idPersonaje),
        CONSTRAINT fk_estadistica_personaje FOREIGN KEY (idPersonaje) REFERENCES Personaje (idPersonaje) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    console.log('✅ Tabla Estadistica verificada/creada.');

    // 3. Actualizar datos de personajes
    for (const char of rpgData) {
      await connection.query(
        'UPDATE Personaje SET nombre = ?, clase = ?, nivel = ? WHERE idPersonaje = ?',
        [char.nombre, char.clase, char.nivel, char.id]
      );
    }
    console.log('✅ Datos de personajes actualizados.');

    // 4. Para los que no están en la lista (si el usuario añadió más)
    await connection.query(`
      UPDATE Personaje SET 
        nombre = CONCAT('Héroe #', idPersonaje), 
        clase = 'Aventurero', 
        nivel = 1 
      WHERE nombre IS NULL
    `);

    // 5. Inicializar o recalcular estadísticas para todos
    const [personajes] = await connection.query('SELECT idPersonaje, clase, nivel FROM Personaje');
    for (const p of personajes) {
      const totalPoints = 10 + (p.nivel - 1) * 3;
      
      let fuerza = 10, destreza = 10, inteligencia = 10, constitucion = 10, agilidad = 10;
      let weights = { f: 2, d: 2, i: 2, c: 2, a: 2 }; // Default Aventurero
      
      if (p.clase === 'Guerrero') {
        weights = { f: 4, d: 1, i: 0.5, c: 3.5, a: 1 };
      } else if (p.clase === 'Mago') {
        weights = { f: 0.5, d: 1, i: 6, c: 1, a: 1.5 };
      } else if (p.clase === 'Pícaro') {
        weights = { f: 2, d: 4.5, i: 1, c: 1, a: 1.5 };
      } else if (p.clase === 'Paladín') {
        weights = { f: 3, d: 1, i: 2, c: 3, a: 1 };
      } else if (p.clase === 'Cazador') {
        weights = { f: 1.5, d: 4, i: 1, c: 1.5, a: 2 };
      }
      
      const totalWeight = weights.f + weights.d + weights.i + weights.c + weights.a;
      
      fuerza += Math.round((weights.f / totalWeight) * totalPoints);
      destreza += Math.round((weights.d / totalWeight) * totalPoints);
      inteligencia += Math.round((weights.i / totalWeight) * totalPoints);
      constitucion += Math.round((weights.c / totalWeight) * totalPoints);
      agilidad += Math.round((weights.a / totalWeight) * totalPoints);
      
      const diff = totalPoints - ((fuerza - 10) + (destreza - 10) + (inteligencia - 10) + (constitucion - 10) + (agilidad - 10));
      fuerza += diff;

      await connection.query(`
        INSERT INTO Estadistica (idPersonaje, fuerza, destreza, inteligencia, constitucion, agilidad)
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
          fuerza = VALUES(fuerza),
          destreza = VALUES(destreza),
          inteligencia = VALUES(inteligencia),
          constitucion = VALUES(constitucion),
          agilidad = VALUES(agilidad)
      `, [p.idPersonaje, fuerza, destreza, inteligencia, constitucion, agilidad]);
    }
    console.log('✅ Estadísticas de personajes inicializadas/actualizadas.');

    console.log('🚀 Migración completada con éxito.');
  } catch (err) {
    console.error('❌ Error en la migración:', err);
  } finally {
    await connection.end();
  }
}

migrate();
