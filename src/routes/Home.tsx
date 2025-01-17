import { CategoryForm } from '../components/CategoryForm'
import { CategoryList } from '../components/CategoryList'
import { ExpenseForm } from '../components/ExpenseForm'
import { ExpensesList } from '../components/ExpensesList'
import { ExpensesChart } from '../components/ExpensesChart'
import { ExportButton } from '../components/ExportButton'
import { useAuth } from '../hooks/useAuth'
import { useCategories } from '../hooks/useCategories'
import { DateRangeOption, useExpenses } from '../hooks/useExpenses'
import { Header } from '../templates/Header'

export function Home() {
  const { session } = useAuth()
  const { categories, refreshCategories } = useCategories(session?.user.id)
  const {
    expenses,
    loading,
    refreshExpenses,
    categoryTotals,
    totalExpenses,
    setDateRangeByOption,
    dateRange,
  } = useExpenses(session?.user.id)

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-1">
            <span>Desde</span>
            <div className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-gray-700">
              <span>{dateRange.start}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span>Hasta</span>
            <div className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-gray-700">
              <span>{dateRange.end}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1 col-span-2">
            <span>Rango</span>
            <select
              onChange={(e) =>
                setDateRangeByOption(e.target.value as DateRangeOption)
              }
              className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="current_month"
            >
              <option value="current_month">Este mes</option>
              <option value="last_month">Último mes</option>
              <option value="last_3_months">Últimos 3 meses</option>
              <option value="last_6_months">Últimos 6 meses</option>
              <option value="current_year">Este año</option>
              <option value="last_year">Año anterior</option>
            </select>
          </div>
        </div>

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
                    currency: 'EUR',
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
