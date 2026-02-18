import { Link } from 'react-router-dom'

function Favorites({ favorites, toggleFavorite }) {
    return (
        <div>
            <h1>Mis Juegos Favoritos</h1>
            {favorites.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '1.5rem' }}>Aún no tienes juegos favoritos.</p>
                    <Link to="/games" className="btn-primary" style={{ textDecoration: 'none' }}>
                        Explorar catálogo
                    </Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                    {favorites.map(game => (
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
                                </div>

                                <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        onClick={() => toggleFavorite(game)}
                                        style={{
                                            flex: 1,
                                            cursor: 'pointer',
                                            padding: '0.6rem',
                                            backgroundColor: 'rgba(236, 72, 193, 0.2)',
                                            color: 'var(--primary)',
                                            border: '1px solid var(--primary)',
                                            borderRadius: '8px',
                                            fontWeight: '600'
                                        }}
                                    >
                                        ❤️ Quitar
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
                    ))}
                </div>
            )}
        </div>
    )
}

export default Favorites
