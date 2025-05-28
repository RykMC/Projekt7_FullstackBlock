import { Link } from "react-router-dom";
import { FiHome, FiPlusCircle, FiInfo, FiMenu } from "react-icons/fi";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-indigo-400">
          🧱 Fullstack Block
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm items-center">
          <NavLink to="/" icon={<FiHome />} label="Startseite" />
          <NavLink to="/createPost" icon={<FiPlusCircle />} label="Beitrag erstellen" />
        </nav>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FiMenu />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-2 space-y-2">
          <MobileLink to="/" label="Startseite" />
          <MobileLink to="/createPost" label="Beitrag erstellen" />
          <MobileLink to="/details" label="Details" />
        </div>
      )}
    </header>
  );
}

function NavLink({ to, icon, label }) {
  return (
    <Link to={to} className="flex items-center gap-1 hover:text-indigo-300 transition">
      {icon}
      {label}
    </Link>
  );
}

function MobileLink({ to, label }) {
  return (
    <Link
      to={to}
      className="block py-1 text-gray-200 hover:text-indigo-400"
    >
      {label}
    </Link>
  );
}
