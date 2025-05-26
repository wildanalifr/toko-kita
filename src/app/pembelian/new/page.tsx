'use client'

import { fetchBarang } from '@/api/fetchItem'
import { createPembelian } from '@/api/pembelian'
import ButtonSubmit from '@/components/buttonSubmit'
import { tItem } from '@/types/item'
import { pembelianSchema, tPembelianSchema } from '@/types/schema/pembelian'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function PembelianFormPage() {
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
    resolver: zodResolver(pembelianSchema),
    defaultValues: {
      barang_id: '',
      qty: '',
      harga_per_unit: '',
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

  const onSubmit = async (data: tPembelianSchema) => {
    setIsLoading(true)

    try {
      const { error, status } = await createPembelian({
        barang_id: data.barang_id,
        harga_per_unit: data.harga_per_unit,
        qty: data.qty,
        tanggal: data.tanggal,
      })

      if (error || status === 404) {
        enqueueSnackbar(`Error!`, { variant: 'error' })
        return
      }

      enqueueSnackbar(`Sukses Input Data`, { variant: 'success' })
      reset({
        barang_id: '',
        qty: '',
        harga_per_unit: '',
        tanggal: '',
      })
    } catch (err) {
      console.error(err)
      enqueueSnackbar('Ada kesalahan', { variant: 'error' })
    } finally {
      setIsLoading(false)
    }

    router.push('/pembelian')
  }

  return (
    <main className="p-6 max-w-2xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-6">Tambah Pembelian</h1>
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
          placeholder="Harga per unit"
          {...register('harga_per_unit')}
          className="w-full p-2 rounded bg-gray-800"
        />
        {errors.harga_per_unit && (
          <p className="text-red-400">{errors.harga_per_unit.message}</p>
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
