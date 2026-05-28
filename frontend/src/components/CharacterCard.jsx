import React from 'react';

export function CharacterCard({ personaje, onClick }) {
  const getIcon = (clase) => {
    switch (clase) {
      case 'Guerrero': return '⚔️';
      case 'Mago': return '🪄';
      case 'Pícaro': return '🗡️';
      case 'Paladín': return '🛡️';
      case 'Cazador': return '🏹';
      default: return '👤';
    }
  };

  return (
    <div className={`card ${personaje.clase}`} onClick={() => onClick(personaje.idPersonaje)}>
      <div className="card-header">
        <h3>{personaje.nombre || `Héroe #${personaje.idPersonaje}`}</h3>
        <span className="level">Lvl {personaje.nivel}</span>
      </div>
      <p className="class-badge">{getIcon(personaje.clase)} {personaje.clase}</p>
    </div>
  );
}
