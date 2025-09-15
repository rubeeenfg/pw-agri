export const fetchData = async (url, method = 'GET', body = null) => {
    const res = await fetch(`http://127.0.0.1:8000${url}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : null,
    })
    return res.json()
}
