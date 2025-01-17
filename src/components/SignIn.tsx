import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { signin, signInWithGoogle } from '../modules/auth/signin'
import { GoogleIcon } from './icons/Google'

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await signin(email, password)

    if (error) {
      setError(error.message)
    }
    setLoading(false)
    navigate('/')
  }

  const handleSignInWithGoogle = async () => {
    await signInWithGoogle()
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Contraseña
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className='flex flex-col gap-2'>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>
        <button
          type="button"
          onClick={handleSignInWithGoogle}
          className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <GoogleIcon className='w-5 h-5' />
          Continuar con Google
        </button>
      </div>
      <div className="mt-4">
        ¿No tienes cuenta? {' '}
        <Link to="/signup" className="text-blue-500 hover:text-blue-600">Regístrate</Link>
      </div>
    </form>
  )
}