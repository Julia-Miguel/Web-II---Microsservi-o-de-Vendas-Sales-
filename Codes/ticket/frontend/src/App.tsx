// src/App.tsx
import { Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import './App.css';
import { ThemeProvider } from "./components/layout/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </ThemeProvider>
  )
}

export default App;