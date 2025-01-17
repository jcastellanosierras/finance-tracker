import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { PlusCircle } from 'lucide-react'

export function CategoryForm({ onCategoryAdded }: { onCategoryAdded: () => void }) {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      setLoading(false)
      return
    }

    const { error } = await supabase
      .from('categories')
      .insert([{ 
        name,
        user_id: user.id 
      }])

    if (!error) {
      setName('')
      onCategoryAdded()
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nueva categoría"
        className="flex-1 p-2 border rounded"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:opacity-50"
      >
        <PlusCircle className="w-5 h-5" />
      </button>
    </form>
  )
}