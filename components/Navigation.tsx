'use client'

import React from 'react'
import {
  ActivityIcon,
  BriefcaseIcon,
  BookOpenIcon,
  LayoutGridIcon,
  HeartIcon,
  BrainIcon,
  UsersIcon,
  WalletIcon,
  GraduationCapIcon,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function Navigation() {
  const pathname = usePathname()
  
  const pillars = [
    {
      id: 'all',
      name: 'Overview',
      icon: <LayoutGridIcon className="h-5 w-5" />,
      href: '/'
    },
    {
      id: 'health-energy',
      name: 'Health & Energy',
      icon: <HeartIcon className="h-5 w-5" />,
      href: '/health-energy'
    },
    {
      id: 'mental-emotions',
      name: 'Mental & Emotions',
      icon: <BrainIcon className="h-5 w-5" />,
      href: '/mental-emotions'
    },
    {
      id: 'relations',
      name: 'Relations',
      icon: <UsersIcon className="h-5 w-5" />,
      href: '/relations'
    },
    {
      id: 'work-finance',
      name: 'Work & Finance',
      icon: <WalletIcon className="h-5 w-5" />,
      href: '/work-finance'
    },
    {
      id: 'self-development',
      name: 'Self Development',
      icon: <GraduationCapIcon className="h-5 w-5" />,
      href: '/self-development'
    }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t md:relative md:border-t-0 md:border-b md:shadow-sm">
      <div className="max-w-lg mx-auto md:max-w-4xl overflow-x-auto">
        <div className="grid grid-cols-3 md:flex md:space-x-1 min-w-max">
          {pillars.map((pillar) => (
            <Link
              key={pillar.id}
              href={pillar.href}
              className={`flex flex-col items-center py-3 px-4 md:flex-row md:py-3 md:px-4 transition-colors ${pathname === pillar.href ? 'text-blue-600 border-t-2 border-blue-600 md:border-t-0 md:border-b-2' : 'text-gray-600 hover:text-blue-600'}`}
            >
              <span className="mb-1 md:mb-0 md:mr-2">{pillar.icon}</span>
              <span className="text-xs md:text-sm font-medium whitespace-nowrap">
                {pillar.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
} 