interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  bgColor?: string;
}

export default function ChartCard({ title, children, bgColor = 'bg-primary-green' }: ChartCardProps) {
  return (
    <div className={`${bgColor} rounded-2xl shadow-sm p-6 text-white h-[400px]`}>
      <h3 className="text-base font-semibold mb-4 font-montserrat tracking-tight">{title}</h3>
      <div className="bg-white/10 rounded-xl p-4 h-[90%] border border-white/10">
        {children}
      </div>
    </div>
  )
} 
