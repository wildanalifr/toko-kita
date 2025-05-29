import { describe, it, expect } from 'vitest'
import { hitungHPP } from '@/utils/hitungHPP'
import type { tPembelianSchema } from '@/types/schema/pembelian'

describe('hitungHPP', () => {
  it(' calculate HPP correctly', () => {
    const input: tPembelianSchema[] = [
      {
        barang_id: '1',
        qty: 5,
        harga_per_unit: 1000,
        tanggal: '2024-01-01',
        qty_terpakai: 0,
      },
      {
        barang_id: '2',
        qty: 3,
        harga_per_unit: 1200,
        tanggal: '2024-01-02',
        qty_terpakai: 0,
      },
    ]

    const qtyTerjual = 6

    const result = hitungHPP({ arr: [...input], qty: qtyTerjual })

    expect(result.tmpHPP).toBe(5 * 1000 + 1 * 1200)
    expect(result.arr[0].qty_terpakai).toBe(5)
    expect(result.arr[1].qty_terpakai).toBe(1)
  })

  it('qty input less than qty in real stock', () => {
    const input: tPembelianSchema[] = [
      {
        barang_id: '1',
        qty: 10,
        harga_per_unit: 1000,
        tanggal: '2024-01-01',
        qty_terpakai: 0,
      },
    ]

    const result = hitungHPP({ arr: [...input], qty: 4 })

    expect(result.tmpHPP).toBe(4 * 1000)
    expect(result.arr[0].qty_terpakai).toBe(4)
  })

  it('get error when more than stock in db', () => {
    const input: tPembelianSchema[] = [
      {
        barang_id: '1',
        qty: 2,
        harga_per_unit: 1000,
        tanggal: '2024-01-01',
        qty_terpakai: 0,
      },
      {
        barang_id: '2',
        qty: 1,
        harga_per_unit: 1200,
        tanggal: '2024-01-02',
        qty_terpakai: 0,
      },
    ]

    expect(() => hitungHPP({ arr: [...input], qty: 1000 })).toThrowError(
      'Stok tidak mencukupi'
    )
  })
})
