import Link from 'next/link';

const StaticMenu = ({ menuItems }) => {
  return (
    <div>
      <ul className="menu">
        {menuItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StaticMenu;
