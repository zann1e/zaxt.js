import '../styles/globals.css';
import Logo from '../components/logo';
import React from 'react';
import { cookies } from 'next/headers'; // Adjust import as necessary
import { unsealData } from 'iron-session';
import StaticMenu from '../components/StaticMenu';
import { MenuItem, SessionData } from '../lib/types';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: ({
  children,
}: {
  children: any;
}) => Promise<JSX.Element> = async ({ children }) => {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('iron-session/');

  let isLoggedIn = false;
  if (sessionCookie) {
    try {
      const session: SessionData = await unsealData(sessionCookie.value, {
        password: process.env.IRON_SESSION_PASSWORD!,
      });
      isLoggedIn = session.loggedIn;
    } catch {
      isLoggedIn = false;
    }
  }

  // Example static menu items
  const menuItems: MenuItem[] = [
    { href: '/', label: 'Home' },
    { href: '/albums', label: 'Albums' },
    { href: '/posts', label: 'Posts' },
    { href: '/users', label: 'Users' },
    ...(isLoggedIn
      ? [
          { href: '/user/profile', label: 'Profile' },
          { href: '/user/logout', label: 'Logout' },
        ]
      : [{ href: '/user/login', label: 'Login' }]),
  ];

  return (
    <html>
      <body>
        <Logo />
        <StaticMenu menuItems={menuItems} />
        {children}
      </body>
    </html>
  );
};

export default Layout;
