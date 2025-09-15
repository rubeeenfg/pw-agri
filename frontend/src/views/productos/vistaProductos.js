import React, { useEffect, useState } from 'react'
import {
    CTable,
    CTableHead,
    CTableHeaderCell,
    CTableBody,
    CTableRow,
    CTableDataCell,
} from '@coreui/react'
import { fetchData } from '../../helpers/fetchData'

const VistaProductos = () => {
    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadProductos = async () => {
            const data = await fetchData('/productos')
            setProductos(data)
            setLoading(false)
        }
        loadProductos()
    }, [])

    if (loading) return <p>Cargando productos...</p>

    return (
        <CTable striped hover responsive>
            <CTableHead>
                <CTableRow>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>Nombre</CTableHeaderCell>
                    <CTableHeaderCell>Descripción</CTableHeaderCell>
                    <CTableHeaderCell>Precio (€)</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {productos.map((p) => (
                    <CTableRow key={p.id}>
                        <CTableDataCell>{p.id}</CTableDataCell>
                        <CTableDataCell>{p.nombre}</CTableDataCell>
                        <CTableDataCell>{p.descripcion}</CTableDataCell>
                        <CTableDataCell>{p.precio}</CTableDataCell>
                    </CTableRow>
                ))}
            </CTableBody>
        </CTable>
    )
}

export default VistaProductos
