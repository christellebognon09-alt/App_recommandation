import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MyPlaces from "./pages/MyPlaces";
import Favorites from "./pages/Favorites"; // <--- AJOUTÉ

function App() {
  return (
    <Router>
      <Routes>
        {/* Page par défaut : Login */}
        <Route path="/" element={<Login />} />
        
        {/* Routes d'authentification */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Dashboard et Exploration */}
        <Route path="/home" element={<Home />} />
        
        {/* Gestion utilisateur et Lieux */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-places" element={<MyPlaces />} />
        <Route path="/favorites" element={<Favorites />} /> {/* <--- AJOUTÉ */}
        
        {/* Redirection automatique des erreurs vers le Login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;