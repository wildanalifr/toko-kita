import { supabase } from '@/lib/supabase'

export default async function CheckStock(id: string) {
  const { data } = await supabase
    .from('pembelian')
    .select('*')
    .eq('barang_id', id)

  const totalQty = data!
    .filter((item) => item.qty !== item.qty_terpakai) // it will filter if qty is not same
    .reduce((sum, item) => sum + (item.qty - item.qty_terpakai), 0)

  return totalQty
}
