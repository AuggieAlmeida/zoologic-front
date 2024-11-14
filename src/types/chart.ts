export interface ChartDataset {
  data: number[]
  backgroundColor: string[]
  borderWidth?: number
  borderColor?: string
}

export interface ChartData {
  labels: string[]
  datasets: ChartDataset[]
} 