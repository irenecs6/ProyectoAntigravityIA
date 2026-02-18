import { Link } from 'react-router-dom'

function Favorites({ favorites, toggleFavorite }) {
    return (
        <div>
            <h1>Mis Juegos Favoritos</h1>
            {favorites.length === 0 ? (
                <p>Aún no tienes juegos favoritos. ¡Ve al <Link to="/games">catálogo</Link> y elige algunos!</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    {favorites.map(game => (
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
                                        padding: '0.3rem',
                                        backgroundColor: '#ff4d4d',
                                        color: 'white',
                                        border: 'none'
                                    }}
                                >
                                    ❤️ Quitar de Favoritos
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Favorites
