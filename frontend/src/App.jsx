import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [personajes, setPersonajes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPersonajes = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:3000/api/personajes')
      setPersonajes(response.data)
      setError(null)
    } catch (err) {
      console.error('Error fetching personajes:', err)
      setError('No se pudo conectar con el servidor. Asegúrate de que el backend esté corriendo.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPersonajes()
  }, [])

  return (
    <div className="container">
      <h1>Maniquí Dashboard 👤</h1>
      <p>Gestión y personalización de rasgos físicos</p>
      
      <button onClick={fetchPersonajes} className="refresh-btn">
        🔄 Actualizar Datos
      </button>

      {loading && <p>Cargando personajes...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <div className="grid">
          {personajes.length === 0 ? (
            <p>No hay personajes registrados.</p>
          ) : (
            personajes.map((p) => (
              <div key={p.idPersonaje} className="card">
                <h3>Personaje #{p.idPersonaje}</h3>
                <div className="stats">
                  <p><strong>📏 Altura:</strong> {p.altura} cm</p>
                  <p><strong>💪 Musculatura:</strong> {p.musculatura}</p>
                  <p><strong>👤 Cabeza:</strong> {p.Forma_Cabeza}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default App
