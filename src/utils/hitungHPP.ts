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
  const totalAvailable = arr.reduce((acc, item) => acc + item.qty, 0)
  if (qty > totalAvailable) {
    throw new Error('Stok tidak mencukupi')
  }

  let tmpHPP = 0
  let tempSisa = qty

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]

    tempSisa -= item.qty

    if (tempSisa > 0) {
      tmpHPP += item.qty * item.harga_per_unit
      arr[i] = { ...item, qty_terpakai: item.qty }
    } else {
      tmpHPP += (item.qty + tempSisa) * item.harga_per_unit
      arr[i] = { ...item, qty_terpakai: item.qty + tempSisa }
      break
    }
  }

  return { tmpHPP, arr }
}
