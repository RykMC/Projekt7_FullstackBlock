import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
            <div className="flex gap-4 mb-2 md:mb-0">
              <a href="#" className="hover:text-indigo-400 transition">Impressum</a>
              <a href="#" className="hover:text-indigo-400 transition">Datenschutz</a>
              <a href="#" className="hover:text-indigo-400 transition">Kontakt</a>
            </div>
            <div className="text-xs text-gray-500">
              © {new Date().getFullYear()} Rico's Fullstack Block
            </div>
          </div>
        </footer>
  )
}

export default Footer;
