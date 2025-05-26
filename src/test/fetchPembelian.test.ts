import { describe, it, expect, vi } from 'vitest'
import { fetchPembelian } from '@/api/pembelian'

vi.mock('@/lib/supabase', () => {
  const unsortedData = [
    {
      barang_id: '1',
      qty: 25,
      harga_per_unit: 1000,
      tanggal: '2024-01-03',
      barang: { nama: 'Barang A' },
    },
    {
      barang_id: '2',
      qty: 100,
      harga_per_unit: 1000,
      tanggal: '2024-02-01',
      barang: { nama: 'Barang B' },
    },
    {
      barang_id: '3',
      qty: 76,
      harga_per_unit: 90,
      tanggal: '2024-01-02',
      barang: { nama: 'Barang C' },
    },
  ]

  const mockOrder = vi.fn().mockResolvedValue({
    data: unsortedData.sort(
      (a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime()
    ),
    error: null,
  })

  const mockSelect = vi.fn(() => ({
    order: mockOrder,
  }))

  return {
    supabase: {
      from: vi.fn(() => ({
        select: mockSelect,
      })),
    },
  }
})

describe('fetchPembelian', () => {
  it('correct data', async () => {
    const result = await fetchPembelian()

    expect(result.error).toBeNull()
    expect(result.data).toBeInstanceOf(Array)
    expect(result.data?.[0]?.barang?.nama).toBe('Barang B')
  })
})
