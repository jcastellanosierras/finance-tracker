import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useExpenses(userId: string | undefined) {
  const [expenses, setExpenses] = useState<ExpenseTracker.Expense[]>([])
  const [loading, setLoading] = useState(true)

  const fetchExpenses = async (userId: string) => {
    const { data } = await supabase
      .from('expenses')
      .select(`
        *,
        category:categories(name)
      `)
      .eq('user_id', userId)
      .order('date', { ascending: false })
    setExpenses(data || [])
    setLoading(false)
  }

  useEffect(() => {
    if (userId) {
      fetchExpenses(userId)
    }
  }, [userId])

  const getCategoryTotals = () => {
    return expenses.reduce((acc: { name: string; value: number }[], expense) => {
      const categoryName = expense.category.name
      const existingCategory = acc.find(c => c.name === categoryName)
      if (existingCategory) {
        existingCategory.value += expense.amount
      } else {
        acc.push({ name: categoryName, value: expense.amount })
      }
      return acc
    }, [])
  }

  const getTotalExpenses = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0)
  }

  return {
    expenses,
    loading,
    refreshExpenses: () => userId && fetchExpenses(userId),
    categoryTotals: getCategoryTotals(),
    totalExpenses: getTotalExpenses()
  }
}
