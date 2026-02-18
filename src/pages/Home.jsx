import { Link } from 'react-router-dom'

function Home() {
    return (
        <div style={{
            textAlign: 'center',
            marginTop: '10vh',
            padding: '2rem',
            background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.1) 0%, transparent 70%)'
        }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', marginBottom: '1rem' }}>Bienvenido a Jugan2 🎮</h1>
            <p style={{ fontSize: '1.4rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 2.5rem' }}>
                Sumérgete en el universo de los videojuegos. Explora miles de títulos, filtra por tus plataformas favoritas y guarda tus próximas aventuras.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/games" className="btn-primary" style={{ textDecoration: 'none', padding: '1rem 2rem', fontSize: '1.1rem' }}>
                    Explorar Juegos
                </Link>
                <Link to="/contact" style={{
                    textDecoration: 'none',
                    padding: '1rem 2rem',
                    fontSize: '1.1rem',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px'
                }}>
                    Danos tu opinión
                </Link>
            </div>
        </div>
    )
}

export default Home
