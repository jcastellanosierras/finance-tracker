import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export type DateRangeOption = 'current_month' | 'last_month' | 'last_3_months' | 'last_6_months' | 'current_year' | 'last_year'

export function useExpenses(userId: string | undefined) {
  const [expenses, setExpenses] = useState<ExpenseTracker.Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState<[Date, Date]>(() => {
    const today = new Date()
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    return [firstDayOfMonth, lastDayOfMonth]
  })

  const setDateRangeByOption = (option: DateRangeOption) => {
    const today = new Date()
    let start: Date
    let end: Date

    switch (option) {
      case 'current_month':
        start = new Date(today.getFullYear(), today.getMonth(), 1)
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        break
      case 'last_month':
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1)
        end = new Date(today.getFullYear(), today.getMonth(), 0)
        break
      case 'last_3_months':
        start = new Date(today.getFullYear(), today.getMonth() - 3, 1)
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        break
      case 'last_6_months':
        start = new Date(today.getFullYear(), today.getMonth() - 6, 1)
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        break
      case 'current_year':
        start = new Date(today.getFullYear(), 0, 1)
        end = new Date(today.getFullYear(), 11, 31)
        break
      case 'last_year':
        start = new Date(today.getFullYear() - 1, 0, 1)
        end = new Date(today.getFullYear() - 1, 11, 31)
        break
    }

    setDateRange([start, end])
  }

  const fetchExpenses = async (userId: string) => {
    const [startDate, endDate] = dateRange
    
    const { data } = await supabase
      .from('expenses')
      .select(`
        *,
        category:categories(name)
      `)
      .eq('user_id', userId)
      .gte('date', startDate.toISOString())
      .lte('date', endDate.toISOString())
      .order('date', { ascending: false })
    
    setExpenses(data || [])
    setLoading(false)
  }

  useEffect(() => {
    if (userId) {
      fetchExpenses(userId)
    }
  }, [userId, dateRange])

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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return {
    expenses,
    loading,
    setDateRangeByOption,
    dateRange: {
      start: formatDate(dateRange[0]),
      end: formatDate(dateRange[1])
    },
    refreshExpenses: () => userId && fetchExpenses(userId),
    categoryTotals: getCategoryTotals(),
    totalExpenses: getTotalExpenses()
  }
}
