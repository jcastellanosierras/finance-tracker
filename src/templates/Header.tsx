import { Link } from 'react-router'
import { ChevronDown, ChevronUp, LogOut, User } from 'lucide-react'
import { logout } from '../modules/auth/logout'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { session } = useAuth()

  const handleSignOut = () => {
    logout()
  }

  return (
    <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Control de Gastos
          </h1>
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
                <div
                  className="fixed z-10 inset-0 w-full h-full"
                  onClick={() => setIsMenuOpen(false)}
                />
                <div className="absolute z-20 right-0 mt-2 w-48 bg-gray-50 rounded-md shadow-lg">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                  >
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
  )
}