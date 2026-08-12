import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import bootstrapIcons from '../assets/bootstrap-icons.svg'
import type { IUser } from './IUsers'
import { userAPI } from './UserAPI'
import UserCard from './UserCard'
import UserCardSkeleton from "./UserCardSkeleton";

function UserPage() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers  ] = useState<IUser[]>([]);
  const userCardSkeletons = Array.from(Array(12), (_value, index) => (
    <UserCardSkeleton key={index} />
  ));

  function removeUser(user: IUser) {
    setUsers((currentUser) =>
      currentUser.filter((s) => s.id !== user.id)
    );
  }

  useEffect(() => {
    void (async () => {
      setLoading(true);

      try {
        const data = await userAPI.list();
        setUsers(data);
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : "Unexpected error", { duration: 6000 });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
   <section className="content container-fluid mx-5 my-2 py-4">
      <div className="d-flex justify-content-between align-items-center pb-4 mb-4 border-bottom border-2">
        <h2 className="mb-0">Users</h2>

        <Link
          to="/users/create"
          className="btn btn-outline-primary"
        >
          <svg className="bi pe-none me-1" width={16} height={16} fill="currentColor">
            <use xlinkHref={`${bootstrapIcons}#plus`} />
          </svg>
          Add User
        </Link>
      </div>

      <section className="list d-flex flex-row flex-wrap gap-4 bg-light p-4 rounded-4">
        {loading && <p>Loading…</p>}
        {loading && userCardSkeletons}

        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onRemove={removeUser}
          />
        ))}
      </section>
    </section>
  );
}



export default UserPage;
