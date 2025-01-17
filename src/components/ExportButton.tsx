import React from 'react'
import { Download } from 'lucide-react'

interface Expense {
  date: string;
  amount: number;
  description: string;
  category: { name: string };
}

export function ExportButton({ expenses }: { expenses: Expense[] }) {
  const exportToCSV = () => {
    const headers = ['Fecha', 'Categoría', 'Descripción', 'Cantidad']
    const csvContent = [
      headers.join(','),
      ...expenses.map(expense => [
        expense.date,
        expense.category.name,
        `"${expense.description}"`,
        expense.amount
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `gastos_${new Date().toISOString().slice(0, 7)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <button
      onClick={exportToCSV}
      className="flex items-center gap-2 bg-gray-100 text-gray-700 py-2 px-4 rounded hover:bg-gray-200"
    >
      <Download className="w-4 h-4" />
      Exportar CSV
    </button>
  )
}