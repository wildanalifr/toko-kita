'use client'

import CheckStock from '@/api/checkStock'
import { fetchBarang } from '@/api/fetchItem'
import { getBarangPembelian } from '@/api/pembelian'
import ButtonSubmit from '@/components/buttonSubmit'
import { supabase } from '@/lib/supabase'
import { tItem } from '@/types/item'
import { penjualanSchema, tPenjualanSchema } from '@/types/schema/penjualan'
import { hitungHPP } from '@/utils/hitungHPP'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function PenjualanPage() {
  const [barangList, setBarangList] = useState<tItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { enqueueSnackbar } = useSnackbar()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(penjualanSchema),
    defaultValues: {
      barang_id: '',
      qty: '',
      harga_jual: '',
      tanggal: '',
    },
  })

  useEffect(() => {
    async function fetchDataBarang() {
      const { data } = await fetchBarang()
      setBarangList(data as tItem[])
    }

    fetchDataBarang()
  }, [])

  const onSubmit = async (data: tPenjualanSchema) => {
    setIsLoading(true)

    try {
      const stok = await CheckStock(data.barang_id)
      const stokNumber = Number(stok)
      const qtyNumber = data.qty

      if (qtyNumber > stokNumber) {
        enqueueSnackbar(`Stok tidak cukup!`, { variant: 'error' })
        setIsLoading(false)
        return
      }

      const pembelianList = await getBarangPembelian(data.barang_id)
      if (!pembelianList) throw new Error('Gagal mendapatkan data pembelian')

      const { tmpHPP, arr } = hitungHPP({ arr: pembelianList, qty: qtyNumber })

      // Update qty_terpakai
      for (const item of arr) {
        const { error } = await supabase
          .from('pembelian')
          .update({ qty_terpakai: item.qty_terpakai })
          .eq('id', item.id)

        if (error) {
          console.error(`Gagal update pembelian id ${item.id}`, error)
          throw error
        }
      }

      // Insert penjualan
      const { error: insertError } = await supabase.from('penjualan').insert({
        barang_id: data.barang_id,
        qty: qtyNumber,
        harga_jual: data.harga_jual,
        tanggal: data.tanggal,
        hpp: tmpHPP,
      })

      if (insertError) throw insertError

      enqueueSnackbar(`Sukses Input Data`, { variant: 'success' })
      reset({
        barang_id: '',
        qty: '',
        harga_jual: '',
        tanggal: '',
      })
    } catch (err) {
      console.error('Terjadi kesalahan saat submit:', err)
      enqueueSnackbar(err as string, { variant: 'error' })
    } finally {
      setIsLoading(false)
    }

    router.push('/penjualan')
  }

  return (
    <main className="p-6 max-w-2xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-6">Tambah Penjualan</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-gray-900 p-6 rounded-xl"
      >
        <div>
          <select
            {...register('barang_id')}
            className="w-full p-2 rounded bg-gray-800"
          >
            <option value="">Pilih Barang</option>
            {barangList.map((b) => (
              <option key={b.id} value={b.id}>
                {b.nama}
              </option>
            ))}
          </select>
          {errors.barang_id && (
            <p className="text-red-400">{errors.barang_id.message}</p>
          )}
        </div>

        <input
          placeholder="Qty"
          {...register('qty')}
          className="w-full p-2 rounded bg-gray-800"
        />
        {errors.qty && <p className="text-red-400">{errors.qty.message}</p>}

        <input
          placeholder="Harga Jual"
          {...register('harga_jual')}
          className="w-full p-2 rounded bg-gray-800"
        />
        {errors.harga_jual && (
          <p className="text-red-400">{errors.harga_jual.message}</p>
        )}

        <input
          type="date"
          {...register('tanggal')}
          className="w-full p-2 rounded bg-gray-800"
        />
        {errors.tanggal && (
          <p className="text-red-400">{errors.tanggal.message}</p>
        )}

        <ButtonSubmit isLoading={isLoading} text="Submit" />
      </form>
    </main>
  )
}
