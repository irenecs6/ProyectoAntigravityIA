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
        <div>
            <Link to="/">Volver al inicio</Link>
            <h1>{game.name}</h1>
            {game.background_image && (
                <img
                    src={game.background_image}
                    alt={game.name}
                    style={{ maxWidth: '100%', height: 'auto' }}
                />
            )}
            <p><strong>Fecha de lanzamiento:</strong> {game.released}</p>
            <p><strong>Rating:</strong> {game.rating} / 5</p>
            <div dangerouslySetInnerHTML={{ __html: game.description }} />
        </div>
    )
}

export default GameDetail
