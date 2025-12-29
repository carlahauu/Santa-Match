'use client';

import Link from 'next/link';
import { useState } from 'react';

const navItems = [
  { name: 'Create Group', href: '/create-group' },
  { name: 'View Match', href: '/view-match' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed w-full justify-center items-center flex flex-col mt-10">
      <nav className="bg-sky-200 mx-auto p-4 px-10 sticky z-50 rounded-full md:w-[65%] w-[90%]">
        <div className="mx-auto flex justify-between items-center">
          <Link href="/" className="text-lg font-semibold">
            SantaMatch
          </Link>
          <div className="hidden md:flex space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-md hover:text-sky-600 hover:border-b-1 border-sky-600`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </nav>
      <div className="fixed md:w-[65%] mt-30 rounded-b-xl w-[90%] bg-sky-200/50">
        {isMenuOpen && (
          <div className="flex md:hidden mt-10 mb-3 px-10 flex-col items-end">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="w-fit py-1">
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
