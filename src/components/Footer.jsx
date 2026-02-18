function Footer() {
    return (
        <footer style={{ padding: '1rem', borderTop: '1px solid #ccc', marginTop: '2rem', textAlign: 'center' }}>
            <p>&copy; {new Date().getFullYear()} Jugan2 - Irene Carvajal</p>
            <p>Datos proporcionados por <a href="https://rawg.io/" target="_blank" rel="noreferrer">RAWG API</a></p>
        </footer>
    )
}

export default Footer
