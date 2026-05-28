import { useState, useEffect } from 'react';
import { 
  getPersonajes, 
  getPersonajeDetail, 
  createPersonaje, 
  updatePersonaje, 
  deletePersonaje 
} from '../services/api';

export function usePersonajes() {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const fetchPersonajes = async () => {
    setLoading(true);
    try {
      const data = await getPersonajes();
      setPersonajes(data);
    } catch (err) {
      setError('Error al cargar la lista.');
    } finally {
      setLoading(false);
    }
  };

  const selectCharacter = async (id) => {
    if (!id) {
      setSelectedCharacter(null);
      return;
    }
    setDetailLoading(true);
    try {
      const data = await getPersonajeDetail(id);
      setSelectedCharacter(data);
    } catch (err) {
      console.error(err);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      await createPersonaje(data);
      await fetchPersonajes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await updatePersonaje(id, data);
      await fetchPersonajes();
      setSelectedCharacter(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePersonaje(id);
      await fetchPersonajes();
      setSelectedCharacter(null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPersonajes();
  }, []);

  return { 
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
  };
}
