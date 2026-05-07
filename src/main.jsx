import { GoogleOAuthProvider } from "@react-oauth/google";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
<GoogleOAuthProvider clientId="1098234159685-sh7rcb00520f0vi02rdvqh9sedfv97u0.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
)
