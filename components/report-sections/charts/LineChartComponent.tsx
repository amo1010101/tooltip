"use client"

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

interface LineDataSeries {
  dataKey: string
  color: string
  name?: string
}

interface LineChartComponentProps {
  data: any[]
  series: LineDataSeries[]
  xAxisKey?: string
  height?: number
  showLegend?: boolean
  tickFormatter?: (value: any) => string
  useGradient?: boolean
}

export function LineChartComponent({
  data,
  series,
  xAxisKey = "name",
  height = 300,
  showLegend = true,
  tickFormatter,
  useGradient = false
}: LineChartComponentProps) {
  // Assurons-nous que les données sont correctement formatées pour éviter les erreurs
  const safeData = data.map(item => {
    // Créer une copie sécurisée de chaque item
    const safeItem: Record<string, any> = {};
    
    // S'assurer que chaque clé est bien une valeur primitive
    Object.keys(item).forEach(key => {
      if (item[key] !== null && typeof item[key] === 'object') {
        // Si c'est un objet, le convertir en chaîne
        safeItem[key] = JSON.stringify(item[key]);
      } else {
        safeItem[key] = item[key];
      }
    });
    
    return safeItem;
  });

  // Fonction sécurisée pour le formatage des tooltips
  const safeFormatter = (value: any, name: string) => {
    if (value === null || value === undefined) return "";
    if (typeof value === "object") return JSON.stringify(value);
    return value.toString();
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart
        data={safeData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <defs>
          {useGradient && series.map((s, index) => (
            <linearGradient key={`gradient-${index}`} id={`color${s.dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={s.color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={s.color} stopOpacity={0.2} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
        <XAxis 
          dataKey={xAxisKey}
          tickFormatter={tickFormatter || ((value) => value?.toString() || "")}
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => value?.toString() || ""}
        />
        <Tooltip
          formatter={safeFormatter}
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderRadius: "8px",
            border: "1px solid hsl(var(--border))",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            padding: "8px 12px",
            fontSize: "12px",
            color: "hsl(var(--foreground))",
          }}
        />
        {showLegend && <Legend wrapperStyle={{ paddingTop: "10px", fontSize: "12px" }} iconType="circle" />}
        
        {series.map((s, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={s.dataKey}
            stroke={s.color}
            fill={useGradient ? `url(#color${s.dataKey})` : "none"}
            name={s.name || s.dataKey}
            activeDot={{ r: 6 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  )
} 