import { useState } from 'react'
import { usePersonajes } from './hooks/usePersonajes'
import { CharacterGrid } from './components/CharacterGrid'
import { CharacterDetail } from './components/CharacterDetail'
import { CharacterForm } from './components/CharacterForm'
import './App.css'

function App() {
  const { 
    personajes, 
    loading, 
    error, 
    fetchPersonajes, 
    selectedCharacter, 
    selectCharacter,
    detailLoading,
    handleCreate,
    handleUpdate,
    handleDelete
  } = usePersonajes();

  const [showForm, setShowForm] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState(null);

  const openCreateForm = () => {
    setEditingCharacter(null);
    setShowForm(true);
  };

  const openEditForm = (character) => {
    setEditingCharacter(character);
    selectCharacter(null);
    setShowForm(true);
  };

  const onFormSubmit = async (data) => {
    if (editingCharacter) {
      await handleUpdate(editingCharacter.idPersonaje, data);
    } else {
      await handleCreate(data);
    }
    setShowForm(false);
    setEditingCharacter(null);
  };

  const onFormCancel = () => {
    setShowForm(false);
    setEditingCharacter(null);
  };

  const onDeleteCharacter = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este héroe?')) {
      await handleDelete(id);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Panel de Personajes</h1>
        <p>Administra tu gremio y explora las habilidades de cada aventurero</p>
        
        <div className="header-actions">
          <button onClick={fetchPersonajes} className="refresh-btn">
            📜 Consultar Oráculo
          </button>
          <button onClick={openCreateForm} className="refresh-btn create-btn">
            ➕ Nuevo Héroe
          </button>
        </div>
      </header>

      <main>
        {loading && <p>Cargando personajes...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <CharacterGrid 
            personajes={personajes} 
            onCharacterClick={selectCharacter} 
          />
        )}
      </main>

      {/* Modal de Detalle */}
      {detailLoading && <div className="detail-modal"><p>Cargando detalles...</p></div>}
      {selectedCharacter && !detailLoading && (
        <CharacterDetail 
          character={selectedCharacter} 
          onClose={() => selectCharacter(null)} 
          onEdit={openEditForm}
          onDelete={onDeleteCharacter}
        />
      )}

      {/* Modal de Formulario */}
      {showForm && (
        <CharacterForm
          initialData={editingCharacter}
          onSubmit={onFormSubmit}
          onCancel={onFormCancel}
        />
      )}
    </div>
  )
}

export default App
