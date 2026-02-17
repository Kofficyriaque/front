import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import CandidateOnboarding from './pages/CandidateOnboarding';
import Candidat from './pages/Candidat';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Recruteur from './pages/Recruteur';
import Signup from './pages/Singup';  
import ForgotPassword from './pages/ForgotPassword';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import Profile from './pages/Profile';
import History from './pages/History';


const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // Initialiser la classe dark au chargement
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const isDark = savedTheme === 'dark' || (!savedTheme && theme === 'dark');
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [theme]);

  return (
    <BrowserRouter>
        <div className={`flex flex-col min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
          <Navbar theme={theme} toggleTheme={toggleTheme}/>
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/history" element={<History />} />
              <Route path="/candidateOnboarding" element={<CandidateOnboarding />} />
              <Route path="/candidat" element={<Candidat />} />
              <Route path="/recruteur" element={<Recruteur />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfUse />} />
              <Route path="*" element={<Landing />} />
            </Routes>
          </main>
          <Footer />
        </div>
    </BrowserRouter>
  );
};

export default App;
