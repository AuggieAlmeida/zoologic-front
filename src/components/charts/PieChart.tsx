import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

interface PieChartProps {
  data: {
    labels: string[]
    datasets: {
      data: number[]
      backgroundColor: string[]
      borderWidth?: number
      borderColor?: string
    }[]
  }
}

export default function PieChart({ data }: PieChartProps) {
  const options = {
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#FFFFFF',
          font: {
            family: 'Montserrat',
            size: 14
          },
          padding: 20
        }
      },
      tooltip: {
        bodyFont: {
          family: 'Montserrat'
        },
        titleFont: {
          family: 'Montserrat'
        }
      }
    },
    maintainAspectRatio: false
  }

  return (
    <div className="h-full w-full">
      <Pie data={data} options={options} />
    </div>
  )
} 