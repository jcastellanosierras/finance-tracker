// import React, { useState } from 'react';
import { SignIn } from './SignIn';
// import { SignUp } from './SignUp';

export function Auth() {
  // const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Finance Tracker</h2>
        {/* {isLogin ? <SignIn /> : <SignUp />} */}
        {/* <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full text-center text-sm text-gray-600 hover:text-gray-900 mt-4"
        >
          {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
        </button> */}
        <SignIn />
      </div>
    </div>
  );
}