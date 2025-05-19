"use client"

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts"

interface BarChartComponentProps {
  data: any[]
  dataKey: string
  xAxisKey?: string
  colors: string[]
  layout?: "horizontal" | "vertical"
  height?: number
  showLegend?: boolean
  legendName?: string
  barSize?: number
  tickFormatter?: (value: any) => string
  useGradient?: boolean
}

export function BarChartComponent({
  data,
  dataKey,
  xAxisKey = "name",
  colors,
  layout = "horizontal",
  height = 300,
  showLegend = true,
  legendName,
  barSize = 20,
  tickFormatter,
  useGradient = false
}: BarChartComponentProps) {
  const isVertical = layout === "vertical"

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

  // Fonction sécurisée pour le formatage des ticks
  const safeTickFormatter = (value: any) => {
    if (tickFormatter) return tickFormatter(value);
    if (value === null || value === undefined) return "";
    if (typeof value === "object") return JSON.stringify(value);
    return value.toString();
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart
        data={safeData}
        layout={layout}
        margin={{ top: 5, right: 30, left: isVertical ? 60 : 20, bottom: 5 }}
      >
        <defs>
          {useGradient && data.map((_, index) => (
            <linearGradient
              key={`gradient-${index}`}
              id={`colorBar${index}`}
              x1="0"
              y1="0"
              x2={isVertical ? "1" : "0"}
              y2={isVertical ? "0" : "1"}
            >
              <stop offset="0%" stopColor={colors[index % colors.length]} stopOpacity={0.8} />
              <stop
                offset="100%"
                stopColor={colors[(index + 1) % colors.length]}
                stopOpacity={0.8}
              />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
        
        {isVertical ? (
          <>
            <XAxis 
              type="number"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value?.toString() || ""}
            />
            <YAxis
              type="category"
              dataKey={xAxisKey}
              tick={{ fontSize: 12 }}
              width={60}
              tickFormatter={safeTickFormatter}
              stroke="hsl(var(--muted-foreground))"
              tickLine={false}
              axisLine={false}
            />
          </>
        ) : (
          <>
            <XAxis 
              dataKey={xAxisKey} 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={safeTickFormatter}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value?.toString() || ""}
            />
          </>
        )}
        
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
        
        {showLegend && (
          <Legend wrapperStyle={{ paddingTop: "10px", fontSize: "12px" }} iconType="circle" />
        )}
        
        <Bar 
          dataKey={dataKey} 
          name={legendName || dataKey} 
          radius={isVertical ? [0, 4, 4, 0] : [4, 4, 0, 0]}
          barSize={barSize}
        >
          {useGradient 
            ? data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={`url(#colorBar${index})`} stroke="none" />
              ))
            : data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} stroke="none" />
              ))
          }
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  )
} 