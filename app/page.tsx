'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Page() {
  const [clientes, setClientes] = useState<any[]>([])

  useEffect(() => {
    const fetchClientes = async () => {
      const { data, error } = await supabase
        .from('cliente')
        .select('nombre, fecha_ingreso')

      if (error) console.error('Error al traer clientes:', error)
      else setClientes(data)
    }

    fetchClientes()
  }, [])

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>
      <ul className="list-disc ml-4">
        {clientes.map((cliente, i) => (
          <li key={i}>
            {cliente.nombre} - {new Date(cliente.fecha_ingreso).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </main>
  )
}
