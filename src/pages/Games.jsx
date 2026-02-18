import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

function Games({ favorites, toggleFavorite }) {
    const [games, setGames] = useState([])
    const [platforms, setPlatforms] = useState([])
    const [genres, setGenres] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get('search') || ''
    const platform = searchParams.get('platform') || ''
    const genre = searchParams.get('genre') || ''
    const ordering = searchParams.get('ordering') || ''

    const apiKey = import.meta.env.VITE_RAWG_API_KEY

    // Cargar plataformas y géneros una sola vez
    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const [platRes, genRes] = await Promise.all([
                    fetch(`https://api.rawg.io/api/platforms?key=${apiKey}`),
                    fetch(`https://api.rawg.io/api/genres?key=${apiKey}`)
                ])
                const platData = await platRes.json()
                const genData = await genRes.json()
                setPlatforms(platData.results || [])
                setGenres(genData.results || [])
            } catch (err) {
                console.error("Error cargando metadatos:", err)
            }
        }
        fetchMetadata()
    }, [apiKey])

    useEffect(() => {
        setLoading(true)
        let url = `https://api.rawg.io/api/games?key=${apiKey}`

        if (search) url += `&search=${search}`
        if (platform) url += `&platforms=${platform}`
        if (genre) url += `&genres=${genre}`
        if (ordering) url += `&ordering=${ordering}`

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de la API')
                }
                return response.json()
            })
            .then(data => {
                setGames(data.results || [])
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [search, platform, genre, ordering, apiKey])

    const handleFilterChange = (name, value) => {
        const newParams = new URLSearchParams(searchParams)
        if (value) {
            newParams.set(name, value)
        } else {
            newParams.delete(name)
        }
        setSearchParams(newParams)
    }

    if (loading) return <div>Cargando juegos...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div>
            <h1>{search ? `Resultados para: "${search}"` : 'Catálogo de Juegos'}</h1>

            {/* Controles de Filtro y Ordenación */}
            <div style={{
                display: 'flex',
                gap: '1.5rem',
                marginBottom: '3rem',
                flexWrap: 'wrap',
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Plataforma</label>
                    <select
                        value={platform}
                        onChange={(e) => handleFilterChange('platform', e.target.value)}
                        style={{
                            padding: '0.6rem',
                            borderRadius: '8px',
                            background: '#1e293b',
                            color: 'white',
                            border: '1px solid #334155'
                        }}
                    >
                        <option value="">Todas las plataformas</option>
                        {platforms.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Género</label>
                    <select
                        value={genre}
                        onChange={(e) => handleFilterChange('genre', e.target.value)}
                        style={{
                            padding: '0.6rem',
                            borderRadius: '8px',
                            background: '#1e293b',
                            color: 'white',
                            border: '1px solid #334155'
                        }}
                    >
                        <option value="">Todos los géneros</option>
                        {genres.map(g => (
                            <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                    </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Ordenar por</label>
                    <select
                        value={ordering}
                        onChange={(e) => handleFilterChange('ordering', e.target.value)}
                        style={{
                            padding: '0.6rem',
                            borderRadius: '8px',
                            background: '#1e293b',
                            color: 'white',
                            border: '1px solid #334155'
                        }}
                    >
                        <option value="">Predeterminado</option>
                        <option value="name">Nombre (A-Z)</option>
                        <option value="-name">Nombre (Z-A)</option>
                        <option value="-rating">Mejor Valoración</option>
                        <option value="rating">Peor Valoración</option>
                        <option value="-released">Más recientes</option>
                        <option value="released">Más antiguos</option>
                    </select>
                </div>

                {(platform || genre || ordering) && (
                    <button
                        onClick={() => {
                            const newParams = new URLSearchParams()
                            if (search) newParams.set('search', search)
                            setSearchParams(newParams)
                        }}
                        style={{
                            alignSelf: 'flex-end',
                            padding: '0.6rem 1rem',
                            cursor: 'pointer',
                            background: 'rgba(255,255,255,0.1)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '600'
                        }}
                    >
                        Limpiar Filtros
                    </button>
                )}
            </div>

            {games.length === 0 && !loading && (
                <div style={{ textAlign: 'center', padding: '4rem' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>No se encontraron juegos con esos criterios.</p>
                </div>
            )}

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '2rem'
            }}>
                {games.map(game => {
                    const isFavorite = favorites.some(f => f.id === game.id)
                    return (
                        <div key={game.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                            {game.background_image && (
                                <img
                                    src={game.background_image}
                                    alt={game.name}
                                    style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }}
                                />
                            )}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                                <Link to={`/game/${game.id}`} style={{ textDecoration: 'none', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                    {game.name}
                                </Link>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                                    {game.platforms?.slice(0, 3).map(p => p.platform.name).join(' • ')}
                                    {game.platforms?.length > 3 && ' ...'}
                                </div>

                                <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        onClick={() => toggleFavorite(game)}
                                        style={{
                                            flex: 1,
                                            cursor: 'pointer',
                                            padding: '0.6rem',
                                            backgroundColor: isFavorite ? 'rgba(236, 72, 193, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                                            color: isFavorite ? 'var(--primary)' : 'white',
                                            border: `1px solid ${isFavorite ? 'var(--primary)' : 'rgba(255,255,255,0.1)'}`,
                                            borderRadius: '8px',
                                            fontWeight: '600'
                                        }}
                                    >
                                        {isFavorite ? '❤️ Favorito' : '🤍 Añadir'}
                                    </button>
                                    <Link
                                        to={`/game/${game.id}`}
                                        className="btn-primary"
                                        style={{ textDecoration: 'none', textAlign: 'center', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        Ver más
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Games
