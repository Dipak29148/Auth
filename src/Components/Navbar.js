import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Derive initials from stored user if available
  const initials = useMemo(() => {
    try {
      const raw = localStorage.getItem('user');
      if (!raw) return 'U';
      const user = JSON.parse(raw);
      const name = user?.name || '';
      if (!name.trim()) return 'U';
      return name
        .trim()
        .split(' ')
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('') || 'U';
    } catch {
      return 'U';
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const toggleDropdown = () => setOpen((prev) => !prev);
  const handleLogoutClick = () => {
    setOpen(false);
    onLogout?.();
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MyWebsite</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {isLoggedIn ? (
          <li className="navbar-avatar-wrapper" ref={dropdownRef}>
            <button
              type="button"
              className="avatar-button"
              onClick={toggleDropdown}
              aria-label="User menu"
              aria-expanded={open}
            >
              <span className="avatar-circle">{initials}</span>
            </button>
            {open && (
              <div className="avatar-dropdown">
                <Link to="/dashboard" onClick={handleLinkClick}>Dashboard</Link>
                <Link to="/dashboard" onClick={handleLinkClick}>Profile</Link>
                <Link to="/dashboard" onClick={handleLinkClick}>Edit Profile</Link>
                <div className="dropdown-divider"></div>
                <button type="button" onClick={handleLogoutClick}>Logout</button>
              </div>
            )}
          </li>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/registration">Register</Link></li>
          </>
        )}
      </ul>
      <style>
        {`
          .navbar-avatar-wrapper {
            position: relative;
            list-style: none;
            display: flex;
            align-items: center;
          }
          .avatar-button {
            border: none;
            background: transparent;
            cursor: pointer;
            padding: 4px;
          }
          .avatar-circle {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #0d6efd;
            color: #fff;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            letter-spacing: 0.5px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          }
          .avatar-dropdown {
            position: absolute;
            right: 0;
            top: 48px;
            background: #0044cc;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.12);
            min-width: 180px;
            padding: 8px 0;
            display: flex;
            flex-direction: column;
            z-index: 20;
          }
          .avatar-dropdown a,
          .avatar-dropdown button {
            padding: 10px 14px;
            text-align: left;
            background: none;
            border: none;
            color: #111827;
            text-decoration: none;
            font-size: 14px;
            cursor: pointer;
          }
          .avatar-dropdown a:hover,
          .avatar-dropdown button:hover {
            background: #f3f4f6;
          }
          .dropdown-divider {
            height: 1px;
            background: #e5e7eb;
            margin: 4px 0;
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
