import React from 'react';

export function StatsFields({ form, availablePoints, totalPoints, adjustStat, handleAutoDistribute }) {
  return (
    <div className="stats-assignment">
      <div className="points-pool">
        <span>Puntos: <strong>{availablePoints}</strong> / {totalPoints}</span>
        <button type="button" className="btn-auto-distribute" onClick={handleAutoDistribute}>🎲 Auto</button>
      </div>
      <div className="stats-fields-grid">
        {['fuerza', 'destreza', 'inteligencia', 'constitucion', 'agilidad'].map(stat => (
          <div className="stat-assign-row" key={stat}>
            <label>{stat.toUpperCase().substring(0,3)}</label>
            <div className="stat-controls">
              <button type="button" className="btn-stat-control" onClick={() => adjustStat(stat, -1)} disabled={form[stat] <= 10}>-</button>
              <span className="stat-value">{form[stat]}</span>
              <button type="button" className="btn-stat-control" onClick={() => adjustStat(stat, 1)} disabled={availablePoints <= 0}>+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
