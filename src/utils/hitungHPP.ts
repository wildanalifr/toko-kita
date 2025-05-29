import { tPembelianSchema } from '@/types/schema/pembelian'

export function hitungHPP({
  arr,
  qty,
}: {
  arr: tPembelianSchema[]
  qty: number
}): {
  tmpHPP: number
  arr: tPembelianSchema[]
} {
  console.log('arr', arr)
  const totalAvailable = arr.reduce((acc, item) => acc + item.qty, 0)
  if (qty > totalAvailable) {
    throw new Error('Stok tidak mencukupi')
  }

  let tmpHPP = 0
  let qty_sold = qty

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]

    if (qty_sold === 0) break

    if (item.qty >= qty_sold) {
      arr[i] = {
        ...item,
        qty_terpakai: (item.qty_terpakai as number) + qty_sold,
      }
      tmpHPP += qty_sold * item.harga_per_unit
      qty_sold = 0
      break
    } else {
      arr[i] = {
        ...item,
        qty_terpakai: (item.qty_terpakai as number) + item.qty,
      }
      tmpHPP += item.qty * item.harga_per_unit
      qty_sold -= item.qty
    }
  }

  return { tmpHPP, arr }
}
