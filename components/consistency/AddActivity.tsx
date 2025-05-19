import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { supabase } from '@/lib/supabase'
import type { Activity, Priority } from '@/lib/types/consistency'

interface AddActivityProps {
  priorities: Priority[]
  onActivityAdded: (activity: Activity) => void
}

export function AddActivity({ priorities, onActivityAdded }: AddActivityProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priorityId, setPriorityId] = useState('')
  const [effort, setEffort] = useState(3)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) throw new Error('No user found')

      const { data, error } = await supabase
        .from('activities')
        .insert([
          {
            user_id: user.user.id,
            priority_id: priorityId,
            title,
            description,
            effort,
            date: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (error) throw error

      onActivityAdded(data)
      setTitle('')
      setDescription('')
      setPriorityId('')
      setEffort(3)
    } catch (error) {
      console.error('Error adding activity:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="priority">Priority</Label>
        <Select value={priorityId} onValueChange={setPriorityId} required>
          <SelectTrigger>
            <SelectValue placeholder="Select a priority" />
          </SelectTrigger>
          <SelectContent>
            {priorities.map((priority) => (
              <SelectItem key={priority.id} value={priority.id}>
                {priority.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Activity</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What did you do?"
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
        <Label>Effort</Label>
        <Slider
          value={[effort]}
          onValueChange={([value]) => setEffort(value)}
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
        {loading ? 'Adding...' : 'Add Activity'}
      </Button>
    </form>
  )
} 