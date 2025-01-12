import { BrowserRouter, Route, Routes } from 'react-router';
import { Home } from './routes/Home';
import { Profile } from './routes/Profile';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { SignInPage } from './routes/SignIn';
import { SignUpPage } from './routes/SignUp';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}
