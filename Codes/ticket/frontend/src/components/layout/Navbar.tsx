// src/components/layout/Navbar.tsx
import { NavLink } from "react-router-dom";
import './Navbar.css';
import { FaHome, FaUsers, FaShoppingCart, FaCalendarAlt } from 'react-icons/fa';
import ThemeToggle from "./ThemeToggle"; // 1. IMPORTE O COMPONENTE

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <NavLink to="/" className="navbar-logo">
                    TicketSys
                </NavLink>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')}>
                            <FaHome /> Início
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/users" className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')}>
                            <FaUsers /> Usuários
                        </NavLink>
                    </li>
                     <li className="nav-item">
                        <NavLink to="/events" className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')}>
                            <FaCalendarAlt /> Eventos
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/sales" className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')}>
                           <FaShoppingCart /> Vendas
                        </NavLink>
                    </li>
                </ul>

                {/* 2. ADICIONE O BOTÃO AQUI */}
                <ThemeToggle />

            </div>
        </nav>
    );
}

export default Navbar;