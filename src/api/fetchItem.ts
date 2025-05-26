import { supabase } from '@/lib/supabase'
import { tItem } from '@/types/item'
import { QueryError } from '@supabase/supabase-js'

export const fetchItems = async (): Promise<{
  data: tItem[] | null
  error: QueryError | null
}> => {
  const { data, error } = await supabase.from('view_barang_stok').select('*')

  return { data, error }
}

export const fetchBarang = async (): Promise<{
  data: tItem[] | null
  error: QueryError | null
}> => {
  const { data, error } = await supabase.from('barang').select('*')

  return { data, error }
}
