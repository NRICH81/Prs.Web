import type { IUsers } from './IUsers';
import bootstrapIcons from '../assets/bootstrap-icons.svg';
import { userAPI } from './UserAPI';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { formatPhoneNumber } from '../utility/formatUtilities';

interface IUserCardProps {
  User: IUsers;
  onRemove: (User: IUsers) => void;
}

function UserCard({ User, onRemove }: IUserCardProps) {
  // Admin outranks Reviewer, so only the highest role is shown.
  const roles = User.isAdmin ? 'Admin' : User.isReviewer ? 'Reviewer' : '';

  return (
    <div className="d-flex gap-4" style={{ width: '25rem' }}>
      <div
        className="d-flex align-items-center justify-content-center rounded-circle bg-secondary fs-3 text-white me-2 flex-shrink-0"
        style={{ width: '6rem', height: '6rem' }}
      >
        {User.firstName?.[0]}{User.lastName?.[0]}
      </div>

      <address className="mb-0">
        <strong>
          {User.firstName} {User.lastName}
          <Dropdown className="d-inline">
            <Dropdown.Toggle className="btn btn-light no-caret" style={{ background: 'none' }}>
              <svg className="bi pe-none" width={20} height={20} fill="#007AFF">
                <use xlinkHref={`${bootstrapIcons}#three-dots-vertical`} />
              </svg>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={`/Users/edit/${User.id}`}>Edit</Dropdown.Item>
              <Dropdown.Item as="a" href="#" onClick={async (event) => {
                event.preventDefault();
                if (confirm('Delete this User member?') && User.id) {
                  try {
                    await userAPI.delete(User.id);
                    onRemove(User);
                    toast.success('Successfully deleted.');
                  } catch (error: unknown) {
                    toast.error(error instanceof Error ? error.message : 'Unexpected error', { duration: 6000 });
                  }
                }
              }}>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </strong>
        <br />
        <span className="text-secondary">{User.username}</span>
        <br />
        <span className="text-secondary">{roles || 'no role assigned'}</span>
        <br />
        <span className="text-secondary">{formatPhoneNumber(User.phone)}</span>
        <br />
        <span className="text-secondary">{User.email}</span>
      </address>
    </div>
  );
}

export default UserCard;