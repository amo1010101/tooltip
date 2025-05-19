'use client'

import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LogOut } from 'lucide-react'

export function NavAuth() {
  const { user, signOut } = useAuth()

  if (!user) {
    return (
      <div className="flex gap-4">
        <Link href="/auth/login">
          <Button variant="outline">Se connecter</Button>
        </Link>
        <Link href="/auth/register">
          <Button>S'inscrire</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-muted-foreground">{user.email}</span>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => signOut()}
        className="flex items-center gap-2"
      >
        <LogOut className="h-4 w-4" />
        Se déconnecter
      </Button>
    </div>
  )
} 