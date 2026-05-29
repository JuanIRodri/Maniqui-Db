import React from 'react';
import './CharacterCard.css';

export function CharacterCard({ personaje, onClick, onEdit, viewMode }) {
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

  const handleCardClick = () => {
    if (viewMode === 'apariencia') {
      // En modo apariencia, abrimos el visor de detalles directamente
      onClick(personaje.idPersonaje);
    } else {
      // En modo estadística, el click en la tarjeta abre el editor directamente
      onEdit(personaje);
    }
  };

  return (
    <div 
      className={`card ${personaje.clase} ${viewMode === 'estadistica' ? 'showing-stats always-visible' : ''}`} 
      onClick={handleCardClick}
    >
      <div className="card-header">
        <h3>{personaje.nombre || `Héroe #${personaje.idPersonaje}`}</h3>
        <span className="level">Lvl {personaje.nivel}</span>
      </div>

      {viewMode === 'apariencia' ? (
        <>
          <p className="class-badge">{getIcon(personaje.clase)} {personaje.clase}</p>
        </>
      ) : (
        <div className="card-appearance-body">
          <section>
            <h4>⚔️ Estadísticas</h4>
            <div className="card-stats-grid interactive">
              <div className="stat-mini"><span>FUE</span> <strong>{personaje.fuerza}</strong></div>
              <div className="stat-mini"><span>DES</span> <strong>{personaje.destreza}</strong></div>
              <div className="stat-mini"><span>INT</span> <strong>{personaje.inteligencia}</strong></div>
              <div className="stat-mini"><span>CON</span> <strong>{personaje.constitucion}</strong></div>
              <div className="stat-mini"><span>AGI</span> <strong>{personaje.agilidad}</strong></div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
