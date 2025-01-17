import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useCategories(userId: string | undefined) {
  const [categories, setCategories] = useState<ExpenseTracker.Category[]>([])

  const fetchCategories = async (userId: string) => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .eq('user_id', userId)
      .order('name')
    setCategories(data || [])
  }

  useEffect(() => {
    if (userId) {
      fetchCategories(userId)
    }
  }, [userId])

  return {
    categories,
    refreshCategories: () => userId && fetchCategories(userId)
  }
} 