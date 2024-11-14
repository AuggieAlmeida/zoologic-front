interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  bgColor?: string;
}

export default function ChartCard({ title, children, bgColor = 'bg-primary-green' }: ChartCardProps) {
  return (
    <div className={`${bgColor} rounded-lg shadow p-6 text-white h-[400px]`}>
      <h3 className="text-lg font-semibold mb-4 font-montserrat">{title}</h3>
      <div className="bg-white/10 rounded-lg p-4 h-[90%]">
        {children}
      </div>
    </div>
  )
} 