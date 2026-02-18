import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/games?search=${searchQuery}`)
            setSearchQuery('')
        }
    }

    return (
        <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', color: 'inherit', marginRight: 'auto' }}>
                Jugan2 🎮
            </Link>

            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                    type="text"
                    placeholder="Buscar juegos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button type="submit" style={{ padding: '0.4rem 0.8rem', cursor: 'pointer', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: 'white' }}>
                    Buscar
                </button>
            </form>

            <Link to="/games" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold', marginLeft: '1rem' }}>
                Juegos
            </Link>
            <Link to="/favorites" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>
                Favoritos
            </Link>
            <Link to="/contact" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>
                Contacto
            </Link>
        </nav>
    )
}

export default Navbar
