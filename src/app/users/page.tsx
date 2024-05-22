import { getUsers } from '../../lib/data';
import Link from 'next/link';

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div>
      <h1>Users</h1>
      <ul className="users">
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/user/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
