import { createRoot } from 'react-dom/client'
import './index.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AppRoutes from './routes/AppRoutes.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { ToastContainer} from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <Router>
    <AuthProvider>
    <ToastContainer />
    <AppRoutes/>
    </AuthProvider>
  </Router>
)
