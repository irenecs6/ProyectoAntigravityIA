import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'

function Navbar() {
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const urlSearch = searchParams.get('search') || ''

    // Sincronizar el input con la URL cuando cambia externamente
    useEffect(() => {
        setSearchQuery(urlSearch)
    }, [urlSearch])

    const handleSearchChange = (e) => {
        const query = e.target.value
        setSearchQuery(query)

        const params = new URLSearchParams(location.search)
        if (query.trim()) {
            params.set('search', query)
        } else {
            params.delete('search')
        }

        // Navegar a /games con la nueva búsqueda, reemplazando la entrada actual en el historial
        // para que sea fluido y el botón de "atrás" no se llene de cada letra pulsada.
        navigate(`/games?${params.toString()}`, { replace: true })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        // No limpiaremos la búsqueda al enviar para que el usuario pueda seguir editando
    }

    const navLinkStyle = ({ isActive }) => ({
        textDecoration: 'none',
        color: isActive ? 'var(--secondary)' : 'var(--text-main)',
        fontWeight: '600',
        borderBottom: isActive ? '2px solid var(--secondary)' : 'none',
        paddingBottom: '0.2rem',
        transition: 'all 0.3s ease'
    })

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            padding: '1rem 2rem',
            background: 'rgba(11, 14, 20, 0.8)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center',
            zIndex: 1000,
            flexWrap: 'wrap'
        }}>
            <Link to="/" style={{ fontSize: '1.8rem', fontWeight: 'bold', textDecoration: 'none', color: 'var(--primary)', marginRight: 'auto' }}>
                Jugan2 🎮
            </Link>

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                    type="text"
                    placeholder="Buscar juegos..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'rgba(255,255,255,0.05)',
                        color: 'white',
                        outline: 'none'
                    }}
                />
                <button type="submit" className="btn-primary" style={{ padding: '0.5rem 1.2rem', borderRadius: '20px' }}>
                    Buscar
                </button>
            </form>

            <div style={{ display: 'flex', gap: '1.5rem' }}>
                <NavLink to="/games" style={navLinkStyle}>
                    Juegos
                </NavLink>
                <NavLink to="/favorites" style={navLinkStyle}>
                    Favoritos
                </NavLink>
                <NavLink to="/contact" style={navLinkStyle}>
                    Contacto
                </NavLink>
            </div>
        </nav>
    )
}

export default Navbar
