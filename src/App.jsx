import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Games from './pages/Games'
import GameDetail from './pages/GameDetail'
import Contact from './pages/Contact'
import Favorites from './pages/Favorites'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('jugan2_favorites')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('jugan2_favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (game) => {
    setFavorites(prev => {
      const isFavorite = prev.some(f => f.id === game.id)
      if (isFavorite) {
        return prev.filter(f => f.id !== game.id)
      } else {
        return [...prev, game]
      }
    })
  }

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main style={{ padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/games"
              element={<Games favorites={favorites} toggleFavorite={toggleFavorite} />}
            />
            <Route path="/game/:id" element={<GameDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/favorites"
              element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
