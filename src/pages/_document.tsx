import { Html, Head, Main, NextScript } from 'next/document';
import Menu from '../components/menu';
import Logo from '../components/logo';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Logo />
        <Menu />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
