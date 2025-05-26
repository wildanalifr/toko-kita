import { supabase } from '@/lib/supabase'
import { tLaba } from '@/types/laba'
import { QueryError } from '@supabase/supabase-js'

export const fetchLaba = async (): Promise<{
  data: tLaba[] | null
  error: QueryError | null
}> => {
  const { data, error } = await supabase
    .from('view_monthly_report')
    .select('*')
    .order('month', { ascending: true })

  return { data, error }
}
