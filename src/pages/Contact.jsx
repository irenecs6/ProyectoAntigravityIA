import { useState } from 'react'

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Datos enviados:', formData)
        setSubmitted(true)
        // Simular envío
        setTimeout(() => {
            alert(`¡Gracias ${formData.name}! Hemos recibido tu mensaje.`)
            setFormData({ name: '', email: '', message: '' })
            setSubmitted(false)
        }, 500)
    }

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1>Contacto</h1>
            <p>Cuéntanos qué te parece Jugan2 o dinos tu juego favorito.</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>

                <div>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>

                <div>
                    <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem' }}>Mensaje:</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={submitted}
                    style={{
                        padding: '0.75rem',
                        backgroundColor: submitted ? '#ccc' : '#007bff',
                        color: 'white',
                        border: 'none',
                        cursor: submitted ? 'not-allowed' : 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    {submitted ? 'Enviando...' : 'Enviar mensaje'}
                </button>
            </form>
        </div>
    )
}

export default Contact
