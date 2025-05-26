import { fetchPembelian } from '@/api/pembelian'
import { formatCurrency } from '@/utils/formatCurrency'
import { fDateTime } from '@/utils/formatTime'
import Link from 'next/link'
import { ShoppingCart, PlusCircle, AlertCircle } from 'lucide-react'

export default async function Pembelian() {
  const { data, error } = await fetchPembelian()

  if (error) {
    return (
      <div className="flex items-center gap-2 text-red-400 bg-red-900 p-4 rounded-md">
        <AlertCircle className="w-5 h-5" />
        <span>{error.message}</span>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-md mt-16">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-white">
          <ShoppingCart className="w-6 h-6" />
          <p className="text-xl font-semibold">Riwayat Pembelian</p>
        </div>
        <Link
          href="/pembelian/new"
          className="inline-flex items-center gap-2 text-sm text-white bg-blue-600 hover:bg-blue-700 transition px-3 py-1.5 rounded-lg shadow"
        >
          <PlusCircle className="w-4 h-4" />
          Tambah Pembelian
        </Link>
      </div>

      <table className="min-w-full text-left border-collapse text-sm text-white">
        <thead>
          <tr className="text-gray-300 border-b border-gray-700">
            <th className="py-2 px-4">Nama</th>
            <th className="py-2 px-4">Stok Pembelian</th>
            <th className="py-2 px-4">Harga per Unit</th>
            <th className="py-2 px-4">Tanggal Pembelian</th>
          </tr>
        </thead>
        <tbody>
          {data?.length ? (
            data.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-800 hover:bg-gray-800/50"
              >
                <td className="py-2 px-4">{item.barang?.nama}</td>
                <td className="py-2 px-4">{item.qty}</td>
                <td className="py-2 px-4">
                  {formatCurrency(item.harga_per_unit)}
                </td>
                <td className="py-2 px-4">{fDateTime(item.tanggal)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="py-4 px-4 text-center text-gray-400 italic"
              >
                <AlertCircle className="inline-block w-5 h-5 mr-1 mb-1" />
                Tidak ada data pembelian.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
