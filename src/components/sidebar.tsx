'use client'

import Link from 'next/link'
import { Home, Boxes } from 'lucide-react'
import { usePathname } from 'next/navigation'

const navbar = [
  {
    id: 1,
    name: 'Dashboard',
    key: 'dashboard',
    path: '/dashboard',
    icon: <Home size={18} />,
  },
  {
    id: 2,
    name: 'Pembelian',
    key: 'pembelian',
    path: '/pembelian',
    icon: <Boxes size={18} />,
  },
  {
    id: 3,
    name: 'Penjualan',
    key: 'penjualan',
    path: '/penjualan',
    icon: <Boxes size={18} />,
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6">Toko Kita</h2>

      <nav className="flex-1 space-y-2 ">
        {navbar.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className={`flex items-center gap-2 ${
              pathname.includes(item.path) ? 'text-gray-100' : 'text-gray-500'
            } hover:text-gray-300`}
          >
            {item.icon} {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
