import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { supabase } from '@/lib/supabase'
import { createPact } from '@/lib/services/accountability'
import type { AccountabilityBuddy, AccountabilityPact } from '@/lib/types/accountability'

interface CreatePactProps {
  buddies: AccountabilityBuddy[]
  onPactCreated: (pact: AccountabilityPact) => void
}

export function CreatePact({ buddies, onPactCreated }: CreatePactProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [buddyId, setBuddyId] = useState('')
  const [deadline, setDeadline] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) throw new Error('No user found')

      const pact = await createPact(
        user.user.id,
        buddyId,
        title,
        description,
        new Date(deadline)
      )
      onPactCreated(pact)
      setTitle('')
      setDescription('')
      setBuddyId('')
      setDeadline('')
    } catch (error) {
      console.error('Error creating pact:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="buddy">Select Buddy</Label>
        <select
          id="buddy"
          value={buddyId}
          onChange={(e) => setBuddyId(e.target.value)}
          className="w-full rounded-md border border-input bg-background px-3 py-2"
          required
        >
          <option value="">Select a buddy</option>
          {buddies.map((buddy) => (
            <option key={buddy.id} value={buddy.id}>
              {buddy.buddyName}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Pact Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's your commitment?"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details about your commitment..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="deadline">Deadline</Label>
        <Input
          id="deadline"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Creating...' : 'Create Pact'}
      </Button>
    </form>
  )
} 