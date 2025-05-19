import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import { addBuddy } from '@/lib/services/accountability'
import type { AccountabilityBuddy } from '@/lib/types/accountability'

interface AddBuddyProps {
  onBuddyAdded: (buddy: AccountabilityBuddy) => void
}

export function AddBuddy({ onBuddyAdded }: AddBuddyProps) {
  const [buddyName, setBuddyName] = useState('')
  const [buddyEmail, setBuddyEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) throw new Error('No user found')

      const buddy = await addBuddy(user.user.id, buddyEmail, buddyName)
      onBuddyAdded(buddy)
      setBuddyName('')
      setBuddyEmail('')
    } catch (error) {
      console.error('Error adding buddy:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="buddyName">Buddy Name</Label>
        <Input
          id="buddyName"
          value={buddyName}
          onChange={(e) => setBuddyName(e.target.value)}
          placeholder="Enter your buddy's name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="buddyEmail">Buddy Email</Label>
        <Input
          id="buddyEmail"
          type="email"
          value={buddyEmail}
          onChange={(e) => setBuddyEmail(e.target.value)}
          placeholder="Enter your buddy's email"
          required
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Adding...' : 'Add Buddy'}
      </Button>
    </form>
  )
} 