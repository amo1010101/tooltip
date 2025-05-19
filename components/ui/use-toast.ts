"use client"

import * as React from "react"

const ToastContext = React.createContext<{
  addToast: (toast: {
    id?: string
    title?: React.ReactNode
    description?: React.ReactNode
    action?: React.ReactNode
    duration?: number
    variant?: "default" | "destructive"
  }) => void
  updateToast: (toast: {
    id: string
    title?: React.ReactNode
    description?: React.ReactNode
    action?: React.ReactNode
    duration?: number
    variant?: "default" | "destructive"
  }) => void
  dismissToast: (toastId: string) => void
  toasts: {
    id: string
    title?: React.ReactNode
    description?: React.ReactNode
    action?: React.ReactNode
    duration?: number
    variant?: "default" | "destructive"
  }[]
}>({
  addToast: () => {},
  updateToast: () => {},
  dismissToast: () => {},
  toasts: [],
})

function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export { ToastContext, useToast }
