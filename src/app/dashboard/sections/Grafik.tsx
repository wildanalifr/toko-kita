'use client'

import { fetchLaba } from '@/api/laba'
import { tLaba } from '@/types/laba'
import { fDateMonth } from '@/utils/formatTime'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  LineController,
} from 'chart.js'
import { useEffect, useMemo, useState } from 'react'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  LineController
)

export default function Grafik() {
  const [grafik, setGrafik] = useState<tLaba[] | null>(null)

  const labelMonth = useMemo(() => {
    return grafik?.map((item) => fDateMonth(item.month))
  }, [grafik])

  const labelValue = useMemo(() => {
    return grafik?.map((item) => item.laba)
  }, [grafik])

  useEffect(() => {
    async function fetchDataBarang() {
      const { data } = await fetchLaba()
      setGrafik(data as tLaba[])
    }

    fetchDataBarang()
  }, [])

  return (
    <Line
      datasetIdKey="id"
      data={{
        labels: labelMonth?.map((item) => item),
        datasets: [
          {
            label: 'Laba',
            data: labelValue?.map((item) => item),
            borderColor: '#82ca9d',
            backgroundColor: 'rgba(130, 202, 157, 0.2)',
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index' as const,
            intersect: false,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Bulan',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Jumlah',
            },
          },
        },
      }}
    />
  )
}
