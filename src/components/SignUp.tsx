import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { signup } from '../modules/auth/signup'
import { signInWithGoogle } from '../modules/auth/signin'
import { GoogleIcon } from './icons/Google'

export function SignUp() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await signup(email, password)

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    navigate('/')
    setLoading(false)
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
        <p className='text-gray-500 text-sm mb-4'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline-block mr-1 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          De momento solo está habilitado el inicio de sesión con Google.
        </p>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          disabled
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
          disabled
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
          disabled
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Cargando...' : 'Registrarse'}
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
        ¿Ya tienes cuenta? {' '}
        <Link to="/signin" className="text-blue-500 hover:text-blue-600">Inicia sesión</Link>
      </div>
    </form>
  )
}