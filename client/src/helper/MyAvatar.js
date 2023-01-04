// hooks

// utils

//
import { useSelector } from 'react-redux';
import createAvatar from '../utils/createAvatar';
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useSelector((state) => state.user);

  return (
    <Avatar
      src={user?.avatar?.url}
      alt={user?.name}
      color={user?.avatar?.url ? 'default' : createAvatar(user?.displayName).color}
      {...other}
    >
      {createAvatar(user?.name).name}
    </Avatar>
  );
}
