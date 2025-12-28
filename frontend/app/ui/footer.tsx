'use client';

import Link from 'next/link';

const footerItems = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '/terms-of-service' },
  { name: 'Contact Us', href: '/contact-us' },
  { name: 'GitHub Repo', href: 'https://github.com/carlahauu/Santa-Match' },
];

export default function Footer() {
  return (
    <div className="justify-center items-center flex flex-col mt-10">
      <footer className="flex flex-col bg-sky-200 mx-auto p-4 px-10 z-50 w-full">
        <div className="mx-auto flex mb-3 md:justify-between md:w-full">
          <div className="flex flex-col md:flex-row text-center gap-4">
            {footerItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm hover:text-sky-600 hover:border-b-1 border-sky-600 px-3`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <p className="mx-auto text-sm">
          Made with love by{' '}
          <Link
            className="hover:text-sky-600 hover:border-b-1 border-sky-600"
            href="https://carlahau.com"
          >
            Carla Hau
          </Link>
        </p>
      </footer>
    </div>
  );
}
