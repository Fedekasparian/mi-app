'use client'

import { useEffect, useState } from 'react'

export default function Page() {
  const [clientes, setClientes] = useState<any[]>([])
  const [id, setId] = useState('') // Este estado no se usa en el formulario, pero lo puedes usar si necesitas un ID único
  const [nombre, setNombre] = useState('')
  const [fechaIngreso, setFechaIngreso] = useState('')

  // Este efecto se ejecuta al cargar la página para obtener la lista de clientes
  useEffect(() => {
    fetchClientes()
  }, [])

  const fetchClientes = async () => {
    const res = await fetch('/api/clientes')
    const data = await res.json()
    setClientes(data)
  }

  // Esta función envía los datos del formulario al backend para agregar un nuevo cliente
  const enviarCliente = async (e: any) => {
    e.preventDefault()

    const res = await fetch('/api/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        nombre,
        fecha_ingreso: fechaIngreso
      })
    })

    const result = await res.json()

    if (res.ok) {
      setNombre('')
      setFechaIngreso('')
      fetchClientes()
    } else {
      alert('Error: ' + result.error)
    }
  }

  // Esta función envía los datos del formulario al backend para eliminar un cliente
  const eliminarCliente = async (e: any) => {
    e.preventDefault()

    const res = await fetch('/api/clientes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre })
    })

    const result = await res.json()

    if (res.ok) {
      setNombre('')
      fetchClientes()
    } else {
      alert('Error: ' + result.error)
    }
  }
  
  // Este es el frontend de la aplicación que muestra el formulario y la lista de clientes
  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>  

      <form onSubmit={enviarCliente} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full border p-2 rounded text-gray-700"
        />
        <input
          type="date"
          value={fechaIngreso}
          onChange={(e) => setFechaIngreso(e.target.value)}
          className="w-full border p-2 rounded text-gray-700"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Agregar
        </button>
      </form>
      <form onSubmit={eliminarCliente} className="mb-6 space-y-4">
        
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Eliminar
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Lista de Clientes</h2>

      <ul className="list-disc pl-5">
        {clientes.map((c, i) => (
          <li key={i}>
            {c.nombre} – {new Date(c.fecha_ingreso).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </main>
  )
}
