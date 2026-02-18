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
        <div style={{ maxWidth: '700px', margin: '2rem auto', padding: '0 1rem' }}>
            <h1 style={{ textAlign: 'center' }}>Ponte en Contacto</h1>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem' }}>
                ¿Tienes alguna sugerencia o simplemente quieres hablar de juegos? ¡Escribenos!
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="card">
                <div>
                    <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>Tu Nombre</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '0.8rem',
                            background: '#1e293b',
                            border: '1px solid #334155',
                            borderRadius: '8px',
                            color: 'white',
                            outline: 'none'
                        }}
                    />
                </div>

                <div>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>Correo Electronico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '0.8rem',
                            background: '#1e293b',
                            border: '1px solid #334155',
                            borderRadius: '8px',
                            color: 'white',
                            outline: 'none'
                        }}
                    />
                </div>

                <div>
                    <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>Tu Mensaje</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="6"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '0.8rem',
                            background: '#1e293b',
                            border: '1px solid #334155',
                            borderRadius: '8px',
                            color: 'white',
                            resize: 'none',
                            outline: 'none'
                        }}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={submitted}
                    className="btn-primary"
                    style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        fontSize: '1.1rem',
                        opacity: submitted ? 0.7 : 1
                    }}
                >
                    {submitted ? 'Enviando Mensaje...' : 'Enviar Mensaje'}
                </button>
            </form>
        </div>
    )
}

export default Contact
