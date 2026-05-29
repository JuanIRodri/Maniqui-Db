import React from 'react';

export function AppearanceFields({ form, handleChange }) {
  return (
    <div className="appearance-sections">
      <div className="appearance-section">
        <h4>👤 Cabeza y Cabello</h4>
        <div className="appearance-grid">
          <div className="form-group">
            <label>Forma Cabeza</label>
            <select name="cabeza_forma" value={form.cabeza_forma} onChange={handleChange}>
              <option value="Ovalada">Ovalada</option>
              <option value="Redonda">Redonda</option>
              <option value="Cuadrada">Cuadrada</option>
              <option value="Alargada">Alargada</option>
            </select>
          </div>
          <div className="form-group">
            <label>Corte Cabello</label>
            <select name="cabello_corte" value={form.cabello_corte} onChange={handleChange}>
              <option value="Corto">Corto</option>
              <option value="Largo">Largo</option>
              <option value="Cresta">Cresta</option>
              <option value="Calvo">Calvo</option>
            </select>
          </div>
          <div className="form-group">
            <label>Color Cabello</label>
            <select name="cabello_tinte" value={form.cabello_tinte} onChange={handleChange}>
              <option value="Castaño">Castaño</option>
              <option value="Rubio">Rubio</option>
              <option value="Pelirrojo">Pelirrojo</option>
              <option value="Negro">Negro</option>
            </select>
          </div>
        </div>
      </div>

      <div className="appearance-section">
        <h4>👁️ Ojos y Rostro</h4>
        <div className="appearance-grid">
          <div className="form-group">
            <label>Color Ojos</label>
            <select name="ojos_color" value={form.ojos_color} onChange={handleChange}>
              <option value="Marrón">Marrón</option>
              <option value="Azul">Azul</option>
              <option value="Verde">Verde</option>
              <option value="Rojo">Rojo</option>
            </select>
          </div>
          <div className="form-group">
            <label>Forma Ojos</label>
            <select name="ojos_forma" value={form.ojos_forma} onChange={handleChange}>
              <option value="Almendrados">Almendrados</option>
              <option value="Rasgados">Rasgados</option>
              <option value="Grandes">Grandes</option>
            </select>
          </div>
          <div className="form-group">
            <label>Tipo Nariz</label>
            <select name="nariz_forma" value={form.nariz_forma} onChange={handleChange}>
              <option value="Recta">Recta</option>
              <option value="Aguileña">Aguileña</option>
              <option value="Chatata">Chata</option>
            </select>
          </div>
          <div className="form-group">
            <label>Tipo Boca</label>
            <select name="boca_forma" value={form.boca_forma} onChange={handleChange}>
              <option value="Común">Común</option>
              <option value="Fina">Fina</option>
              <option value="Grande">Grande</option>
            </select>
          </div>
        </div>
      </div>

      <div className="appearance-section">
        <h4>💪 Cuerpo y Detalles</h4>
        <div className="appearance-grid">
          <div className="form-group">
            <label>Altura (cm)</label>
            <input name="altura" type="number" value={form.altura} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Musculatura</label>
            <input name="musculatura" type="number" value={form.musculatura} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Forma Torso</label>
            <select name="torso_forma" value={form.torso_forma} onChange={handleChange}>
              <option value="Atlético">Atlético</option>
              <option value="Robusto">Robusto</option>
              <option value="Delgado">Delgado</option>
            </select>
          </div>
          <div className="form-group checkbox-group">
            <label>
              <input type="checkbox" name="torso_bello" checked={form.torso_bello === 1} onChange={handleChange} />
              Vello Pecho
            </label>
          </div>
        </div>
      </div>

      <div className="appearance-section">
        <h4>😈 Cuernos</h4>
        <div className="appearance-grid">
          <div className="form-group">
            <label>Tamaño</label>
            <select name="cuernos_tamanio" value={form.cuernos_tamanio} onChange={handleChange}>
              <option value="N/A">N/A</option>
              <option value="Pequeños">Pequeños</option>
              <option value="Medianos">Medianos</option>
              <option value="Grandes">Grandes</option>
            </select>
          </div>
          <div className="form-group">
            <label>Cantidad</label>
            <input type="number" name="cuernos_cantidad" value={form.cuernos_cantidad} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Color</label>
            <select name="cuernos_color" value={form.cuernos_color} onChange={handleChange}>
              <option value="N/A">N/A</option>
              <option value="Negro">Negro</option>
              <option value="Hueso">Hueso</option>
              <option value="Gris">Gris</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
