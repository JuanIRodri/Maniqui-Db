import React, { useState } from 'react';

const CLASES = ['Guerrero', 'Mago', 'Pícaro', 'Paladín', 'Cazador'];

export function CharacterForm({ onSubmit, onCancel, initialData }) {
  const isEditing = !!initialData;

  const [form, setForm] = useState({
    nombre: initialData?.nombre || '',
    clase: initialData?.clase || CLASES[0],
    nivel: initialData?.nivel || 1,
    altura: initialData?.altura || 170,
    musculatura: initialData?.musculatura || 50,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      nivel: Number(form.nivel),
      altura: Number(form.altura),
      musculatura: Number(form.musculatura),
    });
  };

  return (
    <div className="detail-modal">
      <div className="detail-content form-content">
        <button className="close-btn" onClick={onCancel}>&times;</button>
        <div className="detail-header">
          <h2>{isEditing ? 'Editar Héroe' : 'Nuevo Héroe'}</h2>
          <p className="subtitle">{isEditing ? 'Modifica los atributos' : 'Recluta un nuevo aventurero'}</p>
        </div>

        <form onSubmit={handleSubmit} className="character-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ej: Arthas Menethil"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="clase">Clase</label>
            <select id="clase" name="clase" value={form.clase} onChange={handleChange}>
              {CLASES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nivel">Nivel</label>
              <input id="nivel" name="nivel" type="number" min="1" max="100" value={form.nivel} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="altura">Altura (cm)</label>
              <input id="altura" name="altura" type="number" min="100" max="300" value={form.altura} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="musculatura">Musculatura</label>
              <input id="musculatura" name="musculatura" type="number" min="1" max="100" value={form.musculatura} onChange={handleChange} />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onCancel}>Cancelar</button>
            <button type="submit" className="btn-submit">
              {isEditing ? '💾 Guardar Cambios' : '⚔️ Reclutar Héroe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
