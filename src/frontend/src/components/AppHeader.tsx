import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Menu, X } from 'lucide-react';

export const AppHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
      <Link 
        to="/" 
        className="flex items-center justify-center w-12 h-12 bg-white rounded-md shadow-md text-slate-800 hover:bg-slate-100 hover:text-slate-900 transition-colors"
        aria-label="Home"
      >
        <Home className="h-6 w-6" />
      </Link>
      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center justify-center w-12 h-12 bg-white rounded-md shadow-md text-slate-800 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          aria-label="Open menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        {isMenuOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Link
                to="/demo"
                className="block px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Patient Intake Demo
              </Link>
              <Link
                to="/clinician"
                className="block px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Clinician Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
