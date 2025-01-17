import { useState } from 'react'
import { Link } from 'react-router'
import { ChevronDown, ChevronUp, LogOut, User } from 'lucide-react'
import { CategoryForm } from '../components/CategoryForm'
import { CategoryList } from '../components/CategoryList'
import { ExpenseForm } from '../components/ExpenseForm'
import { ExpensesList } from '../components/ExpensesList'
import { ExpensesChart } from '../components/ExpensesChart'
import { ExportButton } from '../components/ExportButton'
import { useAuth } from '../hooks/useAuth'
import { useCategories } from '../hooks/useCategories'
import { useExpenses } from '../hooks/useExpenses'
import { logout } from '../modules/auth/logout'

export function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { session } = useAuth()
  const { categories, refreshCategories } = useCategories(session?.user.id)
  const { 
    expenses, 
    loading, 
    refreshExpenses, 
    categoryTotals, 
    totalExpenses 
  } = useExpenses(session?.user.id)

  const handleSignOut = () => {
    logout()
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Control de Gastos</h1>
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                {session?.user.email?.[0].toUpperCase()}
              </div>
              {isMenuOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {isMenuOpen && (
              <>
                <div className='fixed z-10 inset-0 w-full h-full' onClick={() => setIsMenuOpen(false)} />
                <div className="absolute z-20 right-0 mt-2 w-48 bg-gray-50 rounded-md shadow-lg">
                  <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                    <User className="w-4 h-4" />
                    Usuario
                  </Link>

                <div className="border-b border-gray-200"></div>

                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar sesión
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Categorías</h2>
              <CategoryForm onCategoryAdded={refreshCategories} />
              <CategoryList 
                categories={categories} 
                onCategoryUpdated={() => {
                  refreshCategories()
                  refreshExpenses()
                }} 
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Añadir Gasto</h2>
              <ExpenseForm
                categories={categories}
                onExpenseAdded={refreshExpenses}
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Resumen</h2>
                <p className="text-2xl font-bold text-blue-600">
                  {new Intl.NumberFormat('es-ES', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(totalExpenses)}
                </p>
              </div>
              <ExpensesChart data={categoryTotals} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Gastos</h2>
                <ExportButton expenses={expenses} />
              </div>
              {loading ? (
                <p>Cargando gastos...</p>
              ) : (
                <ExpensesList 
                  expenses={expenses} 
                  categories={categories}
                  onExpenseUpdated={refreshExpenses} 
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
