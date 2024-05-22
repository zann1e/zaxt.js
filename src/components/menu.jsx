import Link from 'next/link';

export default function Menu() {
  return (
    <div>
      <ul className="menu">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/albums">Albums</Link>
        </li>
        <li>
          <Link href="/posts">Posts</Link>
        </li>
        <li>
          <Link href="/users">Users</Link>
        </li>
      </ul>
    </div>
  );
}
