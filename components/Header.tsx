import React from 'react'
import { LineChart, User2Icon } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-lg mx-auto md:max-w-4xl px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <LineChart className="h-5 w-5 text-blue-600 mr-2" />
          <h1 className="text-lg font-bold text-gray-800">TipTable</h1>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <User2Icon className="h-5 w-5 text-gray-700" />
        </button>
      </div>
    </header>
  )
} 