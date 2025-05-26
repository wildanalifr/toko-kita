import { z } from 'zod'
import { tItem } from '../item'

export const penjualanSchema = z.object({
  barang_id: z.string().min(1, 'Barang wajib dipilih'),
  qty: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: 'Qty harus berupa angka',
    })
    .transform((val) => Number(val))
    .refine((val) => val >= 1, { message: 'Qty minimal 1' }),
  harga_jual: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: 'Harga harus berupa angka',
    })
    .transform((val) => Number(val))
    .refine((val) => val >= 1, { message: 'Harga minimal 1' }),
  tanggal: z.string().min(1, 'Tanggal wajib diisi'),
})

export type tPenjualanSchema = z.infer<typeof penjualanSchema> & {
  id?: number
  barang?: tItem
  hpp?: number
}
