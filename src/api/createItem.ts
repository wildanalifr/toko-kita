import { supabase } from '@/lib/supabase'
import { QueryError } from '@supabase/supabase-js'

type CreateItemResponse = {
  error: QueryError | null
  status: number
}

export const createItem = async (nama: string): Promise<CreateItemResponse> => {
  const { error, status } = await supabase
    .from('barang')
    .insert({ nama })
    .select()

  if (error) {
    console.error('Create item error:', error.message)
  }

  return { error, status }
}
