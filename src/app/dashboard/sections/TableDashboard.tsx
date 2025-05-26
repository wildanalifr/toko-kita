import { fetchItems } from '@/api/fetchItem'
import Link from 'next/link'
import { PlusCircle, Package, AlertCircle } from 'lucide-react'

export default async function TableDashboard() {
  const { data, error } = await fetchItems()

  if (error) {
    console.error('Failed to fetch purchases:', error.message)
    return (
      <div className="flex items-center gap-2 text-red-400 bg-red-900 p-4 rounded-md">
        <AlertCircle className="w-5 h-5" />
        <span>{error.message}</span>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-md overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-white">
          <Package className="w-6 h-6" />
          <p className="text-xl font-semibold">Stok Barang</p>
        </div>
        <Link
          href="/dashboard/new-item"
          className="inline-flex items-center gap-2 text-sm text-white bg-blue-600 hover:bg-blue-700 transition px-3 py-1.5 rounded-lg shadow"
        >
          <PlusCircle className="w-4 h-4" />
          Tambah Barang
        </Link>
      </div>

      <table className="min-w-full text-left border-collapse text-sm text-white">
        <thead>
          <tr className="text-gray-300 border-b border-gray-700">
            <th className="py-2 px-4">Nama</th>
            <th className="py-2 px-4">Total Stok</th>
            <th className="py-2 px-4">Stok Sisa</th>
          </tr>
        </thead>
        <tbody>
          {data?.length ? (
            data.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-800 hover:bg-gray-800/50"
              >
                <td className="py-2 px-4">{item.nama}</td>
                <td className="py-2 px-4">{item.stok_total ?? '-'}</td>
                <td className="py-2 px-4">{item.stok_sisa ?? '-'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={3}
                className="py-4 px-4 text-center text-gray-400 italic"
              >
                <AlertCircle className="inline-block w-5 h-5 mr-1 mb-1" />
                Tidak ada data barang tersedia.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
