import { supabase } from '@/lib/supabase'
import { tPembelianSchema } from '@/types/schema/pembelian'
import { QueryError } from '@supabase/supabase-js'

type CreateItemResponse = {
  error: QueryError | null
  status: number
}

export const createPembelian = async ({
  barang_id,
  harga_per_unit,
  qty,
  tanggal,
}: tPembelianSchema): Promise<CreateItemResponse> => {
  const { error, status } = await supabase
    .from('pembelian')
    .insert({ barang_id, harga_per_unit, qty, tanggal })
    .select()

  if (error) {
    console.error('Create pembelian error:', error.message)
  }

  return { error, status }
}

export const fetchPembelian = async (): Promise<{
  data: tPembelianSchema[] | null
  error: QueryError | null
}> => {
  const { data, error } = await supabase
    .from('pembelian')
    .select('*, barang(nama)')
    .order('tanggal', { ascending: false })

  return { data, error }
}

export const getBarangPembelian = async (barang_id: string) => {
  const { data } = await supabase
    .from('pembelian')
    .select('*')
    .order('tanggal')
    .eq('barang_id', barang_id)

  return data
}
