import { useState } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Pencil, Trash2, X, Check } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface Props {
  expenses: ExpenseTracker.Expense[];
  categories: ExpenseTracker.Category[];
  onExpenseUpdated: () => void;
}

export function ExpensesList({ expenses, categories, onExpenseUpdated }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editAmount, setEditAmount] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editDate, setEditDate] = useState('')
  const [editCategoryId, setEditCategoryId] = useState('')

  const handleEdit = (expense: ExpenseTracker.Expense) => {
    setEditingId(expense.id)
    setEditAmount(expense.amount.toString())
    setEditDescription(expense.description)
    setEditDate(expense.date)
    setEditCategoryId(expense.category_id)
  }

  const handleUpdate = async (id: string) => {
    const { error } = await supabase
      .from('expenses')
      .update({
        amount: parseFloat(editAmount),
        description: editDescription,
        date: editDate,
        category_id: editCategoryId
      })
      .eq('id', id)

    if (!error) {
      setEditingId(null)
      onExpenseUpdated()
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este gasto?')) {
      return
    }

    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id)

    if (!error) {
      onExpenseUpdated()
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Últimos Gastos</h3>
      <div className="border rounded-lg overflow-scroll">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Fecha
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Categoría
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Descripción
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Cantidad
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {expenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {editingId === expense.id ? (
                    <input
                      type="date"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    format(new Date(expense.date), 'dd MMM yyyy', { locale: es })
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {editingId === expense.id ? (
                    <select
                      value={editCategoryId}
                      onChange={(e) => setEditCategoryId(e.target.value)}
                      className="w-full p-1 border rounded"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    expense.category.name
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {editingId === expense.id ? (
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    expense.description
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 text-right whitespace-nowrap">
                  {editingId === expense.id ? (
                    <input
                      type="number"
                      step="0.01"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    new Intl.NumberFormat('es-ES', {
                      style: 'currency',
                      currency: 'EUR'
                    }).format(expense.amount)
                  )}
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <div className="flex justify-end gap-2">
                    {editingId === expense.id ? (
                      <>
                        <button
                          onClick={() => handleUpdate(expense.id)}
                          className="p-1 text-green-600 hover:text-green-800"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-1 text-gray-600 hover:text-gray-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(expense)}
                          className="p-1 text-blue-600 hover:text-blue-800"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(expense.id)}
                          className="p-1 text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
  
}