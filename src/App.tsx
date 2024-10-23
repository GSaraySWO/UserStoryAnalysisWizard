import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth-store';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import WizardLayout from './pages/wizard/Layout';
import StoryInput from './pages/wizard/StoryInput';
import TestCases from './pages/wizard/TestCases';
import TestSelection from './pages/wizard/TestSelection';
import TestDetails from './pages/wizard/TestDetails';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wizard"
          element={
            <ProtectedRoute>
              <WizardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="story" element={<StoryInput />} />
          <Route path="test-cases" element={<TestCases />} />
          <Route path="selection" element={<TestSelection />} />
          <Route path="details" element={<TestDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;