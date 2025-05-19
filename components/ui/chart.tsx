"use client"

import * as React from "react"
import type { ChartTooltipProps, TooltipProps } from "recharts"
import { cn } from "@/lib/utils"

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContextValue {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextValue>({
  config: {},
})

interface ChartContainerProps {
  config: ChartConfig
  children: React.ReactNode
  className?: string
}

export function ChartContainer({ config, children, className }: ChartContainerProps) {
  // Set CSS variables for chart colors
  React.useEffect(() => {
    const root = document.documentElement
    for (const [key, value] of Object.entries(config)) {
      root.style.setProperty(`--color-${key}`, value.color)
    }

    // Cleanup function to remove variables when component unmounts
    return () => {
      for (const key of Object.keys(config)) {
        root.style.removeProperty(`--color-${key}`)
      }
    }
  }, [config])

  return (
    <ChartContext.Provider value={{ config }}>
      <div className={cn("w-full h-full overflow-visible", className)}>{children}</div>
    </ChartContext.Provider>
  )
}

export function ChartTooltip({ content, ...props }: ChartTooltipProps<any, any>) {
  if (!props.active || !props.payload?.length) {
    return null
  }

  return (
    <div
      className="recharts-tooltip-wrapper"
      style={{
        pointerEvents: "none",
        visibility: props.active ? "visible" : "hidden",
        position: "absolute",
        top: 0,
        left: 0,
        transform: `translate(${props.coordinate?.x || 0}px, ${props.coordinate?.y || 0}px)`,
        zIndex: 1000,
      }}
    >
      {content && React.isValidElement(content) ? React.cloneElement(content, props) : null}
    </div>
  )
}

export function ChartTooltipContent({ active, payload, label }: TooltipProps<any, any>) {
  const { config } = React.useContext(ChartContext)

  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      {label && <div className="font-medium">{label}</div>}
      <div className="flex flex-col gap-0.5">
        {payload.map((item: any, index: number) => {
          const dataKey = item.dataKey
          const configItem = config[dataKey]
          return (
            <div key={`item-${index}`} className="flex items-center gap-1 text-xs">
              <div
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: item.color || configItem?.color || "#8884d8",
                }}
              />
              <span className="font-medium">{configItem?.label || dataKey}:</span>
              <span>{item.value}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
