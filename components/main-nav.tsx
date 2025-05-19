'use client'

import Link from 'next/link'
import { NavAuth } from './nav-auth'

export function MainNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E1E5EA] bg-white">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-[#2D3648]">TipTable</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <Link href="/profile" className="text-sm font-medium text-[#2D3648] transition-colors hover:text-[#4A5568]">
              Profil
            </Link>
          </nav>
          <NavAuth />
        </div>
      </div>
    </header>
  )
} 