import React from "react";
import {NavLink, useLocation} from "react-router-dom";
import './Sidebar.css';

export default function Sidebar() {
    const location = useLocation();
    const isConverterActive = location.pathname === '/';


    return(
        <nav className="nav_wrapper">
            <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                    isPending ? "nav_pending" : isActive || isConverterActive ? "nav_active" : ""
                }
            >
                Converter
            </NavLink>
            <NavLink
                to="/currencies_list"
                className={({ isActive, isPending }) =>
                    isPending ? "nav_pending" : isActive ? "nav_active" : ""
                }
            >
                List of all CE rates
            </NavLink>
        </nav>
    )
}