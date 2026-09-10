interface StatusCardProps {
  title: string
  count: number
  color: string
}

export default function StatusCard({ title, count, color }: StatusCardProps) {
  return (
    <div className={`${color} rounded-2xl shadow-sm p-6 text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300`}>
      <h3 className="text-xs uppercase tracking-[0.14em] font-semibold mb-3 font-montserrat text-white/75">{title}</h3>
      <p className="text-4xl font-bold font-montserrat">{count}</p>
    </div>
  )
} 
