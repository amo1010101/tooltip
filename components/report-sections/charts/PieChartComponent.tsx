"use client"

import { useState } from "react"
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Sector,
  Legend
} from "recharts"

interface PieChartComponentProps {
  data: any[]
  dataKey: string
  nameKey?: string
  colors: string[]
  height?: number
  activeShape?: boolean
  showLegend?: boolean
}

export function PieChartComponent({
  data,
  dataKey,
  nameKey = "name",
  colors,
  height = 300,
  activeShape = false,
  showLegend = false
}: PieChartComponentProps) {
  const [activeIndex, setActiveIndex] = useState(0)

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

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  // Composant pour le secteur actif du PieChart
  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const sx = cx + (outerRadius + 10) * cos
    const sy = cy + (outerRadius + 10) * sin
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const textAnchor = cos >= 0 ? "start" : "end"

    // Assurons-nous que les valeurs affichées sont des chaînes de caractères
    const displayValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
    const displayName = typeof payload[nameKey] === 'object' ? JSON.stringify(payload[nameKey]) : String(payload[nameKey] || '');
    const displayPercent = typeof percent === 'number' ? (percent * 100).toFixed(2) : "0.00";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="text-sm font-medium">
          {displayName}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          stroke="hsl(var(--background))"
          strokeWidth={2}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="hsl(var(--foreground))"
          className="text-xs"
        >
          {`${displayValue}`}
        </text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="hsl(var(--muted-foreground))"
          className="text-xs"
        >
          {`(${displayPercent}%)`}
        </text>
      </g>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          activeIndex={activeShape ? activeIndex : undefined}
          activeShape={activeShape ? renderActiveShape : undefined}
          data={safeData}
          cx="50%"
          cy="50%"
          innerRadius={activeShape ? 60 : 0}
          outerRadius={80}
          fill="#8884d8"
          dataKey={dataKey}
          nameKey={nameKey}
          onMouseEnter={activeShape ? onPieEnter : undefined}
        >
          {safeData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
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
      </RechartsPieChart>
    </ResponsiveContainer>
  )
} 