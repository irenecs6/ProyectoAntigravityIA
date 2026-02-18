import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function GameDetail() {
    const { id } = useParams()
    const [game, setGame] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const apiKey = import.meta.env.VITE_RAWG_API_KEY
        const url = `https://api.rawg.io/api/games/${id}?key=${apiKey}`

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los detalles del juego')
                }
                return response.json()
            })
            .then(data => {
                setGame(data)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [id])

    if (loading) return <div>Cargando detalles...</div>
    if (error) return <div>Error: {error}</div>
    if (!game) return <div>No se encontró el juego.</div>

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <Link to="/games" style={{ color: 'var(--accent)', textDecoration: 'none', marginBottom: '2rem', display: 'inline-block', fontWeight: 'bold' }}>
                ← Volver al catálogo
            </Link>

            <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', marginBottom: '3rem' }}>
                {game.background_image && (
                    <img
                        src={game.background_image}
                        alt={game.name}
                        style={{ width: '100%', height: '50vh', minHeight: '300px', objectFit: 'cover' }}
                    />
                )}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '4rem 2rem 2rem',
                    background: 'linear-gradient(transparent, var(--bg-dark))'
                }}>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '0.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{game.name}</h1>
                    <div style={{ display: 'flex', gap: '2rem', color: 'white', fontWeight: '600', flexWrap: 'wrap' }}>
                        <span>📅 {game.released}</span>
                        <span>⭐ {game.rating} / 5</span>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                <div>
                    <h3 style={{ borderBottom: '2px solid var(--secondary)', display: 'inline-block', paddingBottom: '0.5rem', marginBottom: '1.5rem', color: 'white' }}>Sobre este juego</h3>
                    <div
                        dangerouslySetInnerHTML={{ __html: game.description }}
                        style={{
                            lineHeight: '1.8',
                            color: 'var(--text-muted)',
                            fontSize: '1.1rem'
                        }}
                    />
                </div>

                <div>
                    <div className="card">
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', color: 'white' }}>Detalles Técnicos</h3>
                        <p style={{ marginBottom: '1rem' }}><strong style={{ color: 'var(--primary)' }}>Plataformas:</strong></p>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {game.platforms?.map(p => (
                                <li key={p.platform.id} style={{ marginBottom: '0.5rem', paddingLeft: '1rem', borderLeft: '2px solid var(--accent)', color: 'var(--text-main)' }}>
                                    {p.platform.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameDetail
