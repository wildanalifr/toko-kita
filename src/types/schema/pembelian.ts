import { z } from 'zod'
import { tItem } from '../item'

export const pembelianSchema = z.object({
  barang_id: z.string().min(1, 'Barang wajib dipilih'),
  qty: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: 'Qty harus berupa angka',
    })
    .transform((val) => Number(val))
    .refine((val) => val >= 1, { message: 'Qty minimal 1' }),
  harga_per_unit: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: 'Harga harus berupa angka',
    })
    .transform((val) => Number(val))
    .refine((val) => val >= 1, { message: 'Harga minimal 1' }),
  tanggal: z.string().min(1, 'Tanggal wajib diisi'),
})

export type tPembelianSchema = z.infer<typeof pembelianSchema> & {
  id?: number
  barang?: tItem
  qty_terpakai?: number
}
