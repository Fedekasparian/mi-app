import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabaseClient'

// GET → Obtener clientes
export async function GET() {
  const { data, error } = await supabase
    .from('cliente')
    .select('id,nombre,fecha_ingreso')
    .order('id', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// POST → Agregar cliente
export async function POST(request: Request) {
  const body = await request.json() // 👈 trae los datos del frontend
  const { nombre, fecha_ingreso } = body

  if (!nombre || !fecha_ingreso) {
    return NextResponse.json(
      { error: 'Faltan datos obligatorios' },
      { status: 400 }
    )
  }

 //Agregar cliente a la base de datos
  const { error } = await supabase
    .from('cliente')
    .insert([{nombre, fecha_ingreso }])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

// DELETE → Eliminar cliente
export async function DELETE(request: Request) {
  const body = await request.json()
  const { nombre } = body

  if (!nombre) {
    return NextResponse.json({ error: 'El nombre es obligatorio' }, { status: 400 })
  }

  // Eliminar cliente de la base de datos
  const { error } = await supabase
    .from('cliente')
    .delete()
    .eq('nombre', nombre)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
