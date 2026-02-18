import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

function Games({ favorites, toggleFavorite }) {
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchParams] = useSearchParams()
    const search = searchParams.get('search')

    useEffect(() => {
        setLoading(true)
        const apiKey = import.meta.env.VITE_RAWG_API_KEY
        let url = `https://api.rawg.io/api/games?key=${apiKey}`

        if (search) {
            url += `&search=${search}`
        }

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de la API')
                }
                return response.json()
            })
            .then(data => {
                setGames(data.results)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [search])

    if (loading) return <div>Cargando juegos...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div>
            <h1>{search ? `Resultados para: "${search}"` : 'Catálogo de Juegos'}</h1>
            {games.length === 0 && !loading && <p>No se encontraron juegos para esa búsqueda.</p>}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
                {games.map(game => {
                    const isFavorite = favorites.some(f => f.id === game.id)
                    return (
                        <div key={game.id} style={{ border: '1px solid #ccc', padding: '1rem', textAlign: 'center' }}>
                            {game.background_image && (
                                <img
                                    src={game.background_image}
                                    alt={game.name}
                                    style={{ width: '100%', height: '150px', objectFit: 'cover', marginBottom: '0.5rem' }}
                                />
                            )}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <Link to={`/game/${game.id}`} style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>
                                    {game.name}
                                </Link>
                                <div style={{ fontSize: '0.8rem', color: '#555' }}>
                                    <strong>Plataformas:</strong> {game.platforms?.map(p => p.platform.name).join(', ')}
                                </div>
                                <button
                                    onClick={() => toggleFavorite(game)}
                                    style={{
                                        cursor: 'pointer',
                                        padding: '0.5rem',
                                        backgroundColor: isFavorite ? '#ff4d4d' : '#f0f0f0',
                                        color: isFavorite ? 'white' : 'black',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px'
                                    }}
                                >
                                    {isFavorite ? '❤️ Quitar de Favoritos' : '🤍 Añadir a Favoritos'}
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Games
