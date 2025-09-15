import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CRow, CCol } from '@coreui/react'
import { fetchData } from '../../helpers/fetchData'

const Dashboard = () => {
  const [totalProductos, setTotalProductos] = useState(0)

  useEffect(() => {
    const loadTotalProductos = async () => {
      const data = await fetchData('/productos')
      setTotalProductos(data.length) // contar todos los productos
    }
    loadTotalProductos()
  }, [])

  return (
    <CRow>
      <CCol sm={3}>
        <CCard className="mb-4">
          <CCardHeader>Total de productos activos</CCardHeader>
          <CCardBody>
            <h2>{totalProductos}</h2>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Dashboard
