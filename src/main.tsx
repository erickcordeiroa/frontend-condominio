import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes/AppRoutes.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <Router>
    <AuthProvider>
      <AppRoutes/>
    </AuthProvider>
  </Router>
)
