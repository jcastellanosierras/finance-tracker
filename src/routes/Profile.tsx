import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

export function Profile() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    email: session?.user.email || '',
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('Las contraseñas no coinciden');
      setError(true);
      setLoading(false);
      return;
    }

    try {
      if (formData.newPassword) {
        const { error } = await supabase.auth.updateUser({
          password: formData.newPassword
        });

        if (error) {
          setMessage("No se ha podido actualizar la contraseña, inténtalo de nuevo más tarde.")
          setError(true);
          setLoading(false);
          return;
        }

        setMessage('Contraseña actualizada correctamente');
        setError(false);
        navigate("/");
      }
    } catch (error: unknown) {
      setMessage((error as Error).message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center gap-4">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Perfil de Usuario</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white p-6 rounded-lg shadow">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full p-2 border rounded bg-gray-50"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Confirmar Nueva Contraseña
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              {message && (
                <div className={`${
                  error 
                    ? 'bg-red-100 border-red-400 text-red-700' 
                    : 'bg-green-100 border-green-400 text-green-700'
                } border px-4 py-3 rounded mb-4`}>
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? 'Actualizando...' : 'Actualizar Perfil'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
