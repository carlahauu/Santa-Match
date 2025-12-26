// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { name: 'Create Group', href: '/create-group' },
  { name: 'View Match', href: '/view-match' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-sky-200 mx-auto p-4 px-10 sticky z-50 top-10 rounded-full md:w-[65%] w-[85%]">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-semibold">
          SantaMatch
        </Link>
        <div className="hidden md:flex space-x-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-md hover:text-sky-600 hover:border-b-1 border-sky-600 ${
                pathname === item.href ? 'text-blue-400' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        {/* Mobile menu toggle (example) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
      {/* Mobile menu content (can be styled further) */}
      {isMenuOpen && (
        <div className="md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block text-white py-2"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
