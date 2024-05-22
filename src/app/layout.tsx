import '../styles/globals.css';
import Menu from '../components/menu';
import Logo from '../components/logo';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Logo />
        <Menu />
        <main>{children}</main>
      </body>
    </html>
  );
}
