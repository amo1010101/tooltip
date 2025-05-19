import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { supabase } from '@/lib/supabase'
import type { Priority } from '@/lib/types/consistency'

interface AddPriorityProps {
  onPriorityAdded: (priority: Priority) => void
}

export function AddPriority({ onPriorityAdded }: AddPriorityProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [importance, setImportance] = useState(3)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) throw new Error('No user found')

      const { data, error } = await supabase
        .from('priorities')
        .insert([
          {
            user_id: user.user.id,
            title,
            description,
            importance,
          },
        ])
        .select()
        .single()

      if (error) throw error

      onPriorityAdded(data)
      setTitle('')
      setDescription('')
      setImportance(3)
    } catch (error) {
      console.error('Error adding priority:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's important to you?"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (optional)</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add some details..."
        />
      </div>

      <div className="space-y-2">
        <Label>Importance</Label>
        <Slider
          value={[importance]}
          onValueChange={([value]) => setImportance(value)}
          min={1}
          max={5}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>Low</span>
          <span>High</span>
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Adding...' : 'Add Priority'}
      </Button>
    </form>
  )
} 