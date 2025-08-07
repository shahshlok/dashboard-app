"use client"

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ComposedChart
} from 'recharts'

interface ChartProps {
  data: any[]
  height?: number
}

export const RevenueProjectionChart = ({ data, height = 300 }: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis 
          dataKey="month" 
          style={{ fontSize: '12px' }}
          tick={{ fill: '#666' }}
        />
        <YAxis 
          style={{ fontSize: '12px' }}
          tick={{ fill: '#666' }}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip 
          formatter={(value: any) => `$${value.toLocaleString()}`}
          contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px' }}
        />
        <Legend />
        <Bar dataKey="costs" fill="#ef4444" opacity={0.6} name="Total Costs" />
        <Line 
          type="monotone" 
          dataKey="revenue" 
          stroke="#10b981" 
          strokeWidth={3}
          name="Revenue"
          dot={{ fill: '#10b981', r: 4 }}
        />
        <Line 
          type="monotone" 
          dataKey="ebitda" 
          stroke="#3b82f6" 
          strokeWidth={2}
          strokeDasharray="5 5"
          name="EBITDA"
          dot={{ fill: '#3b82f6', r: 3 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export const EnrollmentGrowthChart = ({ data, height = 300 }: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis 
          dataKey="month"
          style={{ fontSize: '12px' }}
          tick={{ fill: '#666' }}
        />
        <YAxis 
          style={{ fontSize: '12px' }}
          tick={{ fill: '#666' }}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px' }}
        />
        <Legend />
        <Area 
          type="monotone" 
          dataKey="enrollment" 
          stroke="#8b5cf6" 
          fill="#8b5cf6"
          fillOpacity={0.6}
          strokeWidth={2}
          name="Active Students"
        />
        <Line 
          type="monotone" 
          dataKey="target" 
          stroke="#ef4444" 
          strokeDasharray="8 4"
          strokeWidth={2}
          name="Target"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

interface EnhancedCashFlowChartProps extends ChartProps {
  onMonthClick?: (monthData: any) => void
  monthlyAssumptions?: any[]
}

export const CashFlowChart = ({ 
  data, 
  height = 300, 
  onMonthClick,
  monthlyAssumptions = []
}: EnhancedCashFlowChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis 
          dataKey="month"
          style={{ fontSize: '12px' }}
          tick={{ fill: '#666' }}
        />
        <YAxis 
          yAxisId="left"
          style={{ fontSize: '12px' }}
          tick={{ fill: '#666' }}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
        />
        <YAxis 
          yAxisId="right"
          orientation="right"
          style={{ fontSize: '12px' }}
          tick={{ fill: '#666' }}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip 
          content={({ active, payload, label }) => {
            if (!active || !payload || !payload.length) return null
            
            // Find matching monthly assumption data
            const monthAssumptions = monthlyAssumptions.find(ma => 
              ma.month.includes(label)
            )
            
            return (
              <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg max-w-sm">
                <div className="font-semibold text-gray-900 mb-2">{label} 2025/2026</div>
                
                {/* Financial Metrics */}
                <div className="space-y-2 mb-3">
                  {payload.map((entry, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{entry.name}:</span>
                      <span className="font-semibold" style={{ color: entry.color }}>
                        ${entry.value?.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Key Assumptions Preview */}
                {monthAssumptions && (
                  <div className="border-t border-gray-200 pt-3">
                    <div className="text-xs font-medium text-gray-700 mb-2">Key Assumptions:</div>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-600">
                        • Enrollment: {monthAssumptions.enrollment?.value} students
                      </div>
                      <div className="text-xs text-gray-600">
                        • Revenue: ${monthAssumptions.revenue?.value.toLocaleString()}
                      </div>
                      {monthAssumptions.enrollment?.seasonalFactors && (
                        <div className="text-xs text-orange-600">
                          • {monthAssumptions.enrollment.seasonalFactors}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-blue-600 mt-2 cursor-pointer">
                      Click for detailed assumptions →
                    </div>
                  </div>
                )}
              </div>
            )
          }}
        />
        <Legend />
        <Bar 
          yAxisId="left"
          dataKey="monthlyEBITDA" 
          fill="#3b82f6"
          opacity={0.7}
          name="Monthly EBITDA"
          onClick={onMonthClick}
          style={{ cursor: onMonthClick ? 'pointer' : 'default' }}
        />
        <Line 
          yAxisId="right"
          type="monotone" 
          dataKey="cumulativeCash" 
          stroke="#ef4444" 
          strokeWidth={3}
          name="Cumulative Cash"
          dot={{ 
            fill: '#ef4444', 
            r: 4,
            style: { cursor: onMonthClick ? 'pointer' : 'default' }
          }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export const CompetitivePosChart = ({ data, height = 400 }: ChartProps) => {
  const formattedData = data.map(item => ({
    ...item,
    x: item.price,
    y: item.value,
    z: item.students || 100
  }))

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ScatterChart>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis 
          type="number" 
          dataKey="x" 
          name="Price" 
          unit="$"
          domain={[80, 180]}
          style={{ fontSize: '12px' }}
          tick={{ fill: '#666' }}
          label={{ value: 'Monthly Price ($)', position: 'insideBottom', offset: -5 }}
        />
        <YAxis 
          type="number" 
          dataKey="y" 
          name="Value" 
          domain={[0, 10]}
          style={{ fontSize: '12px' }}
          tick={{ fill: '#666' }}
          label={{ value: 'Perceived Value', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip 
          cursor={{ strokeDasharray: '3 3' }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload
              return (
                <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                  <p className="font-semibold text-sm">{data.name}</p>
                  <p className="text-xs text-gray-600">Price: ${data.x}/mo</p>
                  <p className="text-xs text-gray-600">Value Score: {data.y}</p>
                  {data.note && <p className="text-xs text-gray-500 mt-1">{data.note}</p>}
                </div>
              )
            }
            return null
          }}
        />
        <Scatter 
          name="Competitors" 
          data={formattedData} 
          fill="#8884d8"
          shape={(props: any) => {
            const { cx, cy, payload } = props
            const isUs = payload.name === 'DDGA Ashburn'
            return (
              <circle 
                cx={cx} 
                cy={cy} 
                r={isUs ? 10 : 6} 
                fill={isUs ? '#10b981' : '#6b7280'}
                stroke={isUs ? '#059669' : '#4b5563'}
                strokeWidth={2}
                fillOpacity={0.8}
              />
            )
          }}
        />
      </ScatterChart>
    </ResponsiveContainer>
  )
}

export const CostBreakdownChart = ({ data, height = 300 }: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis 
          dataKey="month"
          style={{ fontSize: '12px' }}
          tick={{ fill: '#666' }}
        />
        <YAxis 
          style={{ fontSize: '12px' }}
          tick={{ fill: '#666' }}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip 
          formatter={(value: any) => `$${value.toLocaleString()}`}
          contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px' }}
        />
        <Legend />
        <Bar dataKey="direct" stackId="a" fill="#fbbf24" name="Direct Costs" />
        <Bar dataKey="fixed" stackId="a" fill="#f87171" name="Fixed Costs" />
        <Bar dataKey="admin" stackId="a" fill="#fb923c" name="Admin & Opex" />
      </BarChart>
    </ResponsiveContainer>
  )
}

interface GaugeData {
  name: string
  value: number
  fill: string
}

export const LTVCACGauge = ({ ltv, cac }: { ltv: number; cac: number }) => {
  const ratio = (ltv / cac).toFixed(1)
  const percentage = Math.min((ltv / cac) * 10, 100)
  
  const data: GaugeData[] = [
    {
      name: 'LTV/CAC',
      value: percentage,
      fill: percentage > 70 ? '#10b981' : percentage > 40 ? '#f59e0b' : '#ef4444'
    }
  ]

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={200}>
        <RadialBarChart 
          cx="50%" 
          cy="50%" 
          innerRadius="60%" 
          outerRadius="90%" 
          barSize={20} 
          data={data}
          startAngle={180} 
          endAngle={0}
        >
          <PolarGrid 
            gridType="circle" 
            radialLines={false}
            stroke="none"
            polarRadius={[60, 70]}
          />
          <RadialBar
            dataKey="value"
            cornerRadius={10}
            fill={data[0].fill}
            background={{ fill: '#f3f4f6' }}
          />
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-3xl font-bold">{ratio}x</div>
        <div className="text-sm text-gray-500">LTV/CAC Ratio</div>
        <div className="text-xs text-gray-400 mt-1">
          ${ltv} / ${cac}
        </div>
      </div>
    </div>
  )
}

export const MetricsCard = ({ title, value, subtitle, trend, trendValue }: {
  title: string
  value: string | number
  subtitle?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
}) => {
  const trendColor = trend === 'up' ? 'text-green-600' : 
                     trend === 'down' ? 'text-red-600' : 
                     'text-gray-600'
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="text-sm font-medium text-gray-600 mb-1">{title}</div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      {subtitle && (
        <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
      )}
      {trend && trendValue && (
        <div className={`text-xs font-medium mt-2 ${trendColor}`}>
          {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
        </div>
      )}
    </div>
  )
}