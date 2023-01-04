import React from 'react'
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

GuestGuard.prototype = {
    children: PropTypes.node
};

export default function GuestGuard({children}) {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    if(isAuthenticated) {
        return <Navigate to={'/'} />
    }

  return <>{children}</>
}
