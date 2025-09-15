import React, { useEffect, useState } from 'react'
import {
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CForm,
    CFormInput,
    CTable,
    CTableHead,
    CTableHeaderCell,
    CTableBody,
    CTableRow,
    CTableDataCell,
} from '@coreui/react'
import { fetchData } from '../../helpers/fetchData'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilX, cilXCircle } from '@coreui/icons'

const VistaProductos = () => {
    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true)

    // Estado para modal
    const [visible, setVisible] = useState(false)
    const [editing, setEditing] = useState(null) // null → crear, objeto → editar
    const [formData, setFormData] = useState({ nombre: '', descripcion: '', precio: '' })

    // Cargar productos
    const loadProductos = async () => {
        setLoading(true)
        const data = await fetchData('/productos')
        setProductos(data)
        setLoading(false)
    }

    useEffect(() => {
        loadProductos()
    }, [])

    // Abrir modal para crear
    const handleNuevo = () => {
        setEditing(null)
        setFormData({ nombre: '', descripcion: '', precio: '' })
        setVisible(true)
    }

    // Abrir modal para editar
    const handleEditar = (producto) => {
        setEditing(producto.id)
        setFormData({
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
        })
        setVisible(true)
    }

    // Guardar (crear o editar)
    const handleGuardar = async () => {
        if (editing) {
            // Editar
            await fetchData(`/productos/${editing}`, 'PUT', formData)
        } else {
            // Crear
            await fetchData('/productos', 'POST', formData)
        }
        setVisible(false)
        loadProductos()
    }

    // Eliminar
    const handleEliminar = async (id) => {
        if (window.confirm('¿Seguro que quieres eliminar este producto?')) {
            await fetchData(`/productos/${id}`, 'DELETE')
            loadProductos()
        }
    }

    if (loading) return <p>Cargando productos...</p>

    return (
        <div>
            <h3>Gestión de Productos</h3>
            <CButton color="primary" className="mb-3" onClick={handleNuevo}>
                + Nuevo producto
            </CButton>

            <CTable striped hover responsive>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell>Nombre</CTableHeaderCell>
                        <CTableHeaderCell>Descripción</CTableHeaderCell>
                        <CTableHeaderCell>Precio (€)</CTableHeaderCell>
                        <CTableHeaderCell>Acciones</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {productos.map((p) => (
                        <CTableRow key={p.id}>
                            <CTableDataCell>{p.nombre}</CTableDataCell>
                            <CTableDataCell>{p.descripcion}</CTableDataCell>
                            <CTableDataCell>{p.precio}</CTableDataCell>
                            <CTableDataCell>
                                <CButton size="sm" color="warning" className="me-2" onClick={() => handleEditar(p)}>
                                    <CIcon icon={cilPencil} />
                                </CButton>
                                <CButton size="sm" color="danger" onClick={() => handleEliminar(p.id)}>
                                    <CIcon icon={cilXCircle} />
                                </CButton>
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>

            {/* Modal de Crear/Editar */}
            <CModal visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader>
                    <CModalTitle>{editing ? 'Editar producto' : 'Nuevo producto'}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CFormInput
                            className="mb-2"
                            type="text"
                            label="Nombre"
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        />
                        <CFormInput
                            className="mb-2"
                            type="text"
                            label="Descripción"
                            value={formData.descripcion}
                            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                        />
                        <CFormInput
                            className="mb-2"
                            type="number"
                            step="0.01"
                            label="Precio (€)"
                            value={formData.precio}
                            onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                        />
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Cancelar
                    </CButton>
                    <CButton color="primary" onClick={handleGuardar}>
                        Guardar
                    </CButton>
                </CModalFooter>
            </CModal>
        </div>
    )
}

export default VistaProductos
