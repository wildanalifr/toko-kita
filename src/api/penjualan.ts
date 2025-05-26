import { supabase } from '@/lib/supabase'
import { tPenjualanSchema } from '@/types/schema/penjualan'
import { QueryError } from '@supabase/supabase-js'

type CreateItemResponse = {
  error: QueryError | null
  status: number
}

export const createPenjualan = async ({
  barang_id,
  harga_jual,
  qty,
  tanggal,
}: tPenjualanSchema): Promise<CreateItemResponse> => {
  const { error, status } = await supabase
    .from('pembelian')
    .insert({ barang_id, harga_jual, qty, tanggal })
    .select()

  if (error) {
    console.error('Create pembelian error:', error.message)
  }

  return { error, status }
}

export const fetchPenjualan = async (): Promise<{
  data: tPenjualanSchema[] | null
  error: QueryError | null
}> => {
  const { data, error } = await supabase
    .from('penjualan')
    .select('*, barang(nama)')
    .order('tanggal', { ascending: false })

  return { data, error }
}
