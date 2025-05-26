import Grafik from './sections/Grafik'
import TableDashboard from './sections/TableDashboard'

export default function Dashboard() {
  return (
    <div className="text-white min-h-screen p-6 space-y-6">
      {/* Table section */}
      <TableDashboard />

      {/* Chart section */}
      <div className="bg-gray-900 rounded-xl p-4 shadow flex flex-col items-center justify-center">
        <h4 className="mb-3">Grafik Penjualan</h4>
        <Grafik />
      </div>
    </div>
  )
}
