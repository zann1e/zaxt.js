import '../styles/globals.scss';
import Logo from '../components/logo';
import { cookies } from 'next/headers'; // Adjust import as necessary
import { unsealData } from 'iron-session';
import StaticMenu from '../components/StaticMenu';
import { DarkModeSetting, MenuItem, SessionData } from '../lib/types';

const RootLayout: ({
  children,
}: {
  children: any;
}) => Promise<JSX.Element> = async ({ children }) => {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('iron-session/');

  let isLoggedIn = false;
  let modeClass;
  if (sessionCookie) {
    try {
      const session: SessionData = await unsealData(sessionCookie.value, {
        password: process.env.IRON_SESSION_PASSWORD!,
      });
      isLoggedIn = session.loggedIn;
      switch (session.darkMode) {
        case DarkModeSetting.ON:
          console.log('Dark mode ON');
          modeClass = 'dark-mode';
          break;
        case DarkModeSetting.OFF:
          console.log('Dark mode off');

          modeClass = 'light-mode';
          break;
      }
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
          { href: '/post/create', label: 'Create Post' },
          { href: '/user/profile', label: 'Profile' },
          { href: '/user/logout', label: 'Logout' },
        ]
      : [{ href: '/user/login', label: 'Login' }]),
  ];

  return (
    <html className={modeClass}>
      <body>
        <Logo className={modeClass} />
        <StaticMenu menuItems={menuItems} />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
