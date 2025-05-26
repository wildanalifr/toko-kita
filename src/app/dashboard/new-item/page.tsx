'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { itemSchema, ItemSchema } from '@/types/schema/item'
import ButtonSubmit from '@/components/buttonSubmit'
import { useState } from 'react'
import { createItem } from '@/api/createItem'
import { useSnackbar } from 'notistack'

export default function ItemForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemSchema>({
    resolver: zodResolver(itemSchema),
  })

  const { enqueueSnackbar } = useSnackbar()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit = async (data: ItemSchema) => {
    setIsLoading(true)

    try {
      const { error, status } = await createItem(data.name)

      if (error || status === 404) {
        enqueueSnackbar(`Error!`, { variant: 'error' })
        return
      }

      enqueueSnackbar(`Sukses Input Data`, { variant: 'success' })
      reset({ name: '' })
    } catch (err) {
      console.error(err)
      enqueueSnackbar('Ada kesalahan', { variant: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-24 flex justify-center bg-black text-white px-4">
      <div className="bg-gray-900 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Tambah Barang</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Nama Barang
            </label>
            <input
              {...register('name')}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan nama barang"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

          <ButtonSubmit isLoading={isLoading} text="Submit" />
        </form>
      </div>
    </div>
  )
}
