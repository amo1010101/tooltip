"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

interface MobileFriendlyChartProps {
  children: React.ReactNode
  height?: number
  minHeight?: number
  className?: string
}

export function MobileFriendlyChart({
  children,
  height = 300,
  minHeight = 200,
  className = "",
}: MobileFriendlyChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const isMobile = useMediaQuery("(max-width: 640px)")

  useEffect(() => {
    if (containerRef.current) {
      const updateWidth = () => {
        if (containerRef.current) {
          setContainerWidth(containerRef.current.clientWidth)
        }
      }

      // Initial width
      updateWidth()

      // Update width on resize
      const resizeObserver = new ResizeObserver(updateWidth)
      resizeObserver.observe(containerRef.current)

      return () => {
        if (containerRef.current) {
          resizeObserver.unobserve(containerRef.current)
        }
      }
    }
  }, [])

  const actualHeight = isMobile ? minHeight : height

  return (
    <div
      ref={containerRef}
      className={cn("w-full overflow-hidden rounded-md", className)}
      style={{
        height: actualHeight,
        background: "hsl(var(--muted)/0.1)",
        padding: "12px",
      }}
    >
      <div style={{ width: containerWidth, height: actualHeight }}>{children}</div>
    </div>
  )
}
