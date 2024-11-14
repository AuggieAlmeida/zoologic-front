interface StatusCardProps {
  title: string
  count: number
  color: string
}

export default function StatusCard({ title, count, color }: StatusCardProps) {
  return (
    <div className={`${color} rounded-lg shadow p-6 text-white hover:shadow-lg transition-shadow duration-300`}>
      <h3 className="text-lg font-semibold mb-2 font-montserrat">{title}</h3>
      <p className="text-3xl font-bold font-montserrat">{count}</p>
    </div>
  )
} 