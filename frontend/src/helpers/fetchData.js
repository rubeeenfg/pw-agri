export const fetchData = async (endpoint) => {
    try {
        const res = await fetch(`http://127.0.0.1:8000${endpoint}`)
        console.log('Response status:', res.status)  // <-- debug
        if (!res.ok) {
            throw new Error(`Error al obtener datos: ${res.statusText}`)
        }
        const data = await res.json()
        console.log('Data recibida:', data)  // <-- debug
        return data
    } catch (err) {
        console.error('Error fetchData:', err)
        return []
    }
}
