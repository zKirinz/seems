import React from 'react'

import { useRecoilValue } from 'recoil'

import atom from '../../recoil/auth'
import Admin from './Admin'
import Organizer from './Organizer'
import User from './User'

const UserProfile = ({ userEmail, onClose, open, role }) => {
    const auth = useRecoilValue(atom)
    const isAdmin = auth.role === 'Admin'

    return (
        <React.Fragment>
            {role === 'User' && (
                <User userEmail={userEmail} onClose={onClose} open={open} isAdmin={isAdmin} />
            )}
            {role === 'Organizer' && (
                <Organizer userEmail={userEmail} onClose={onClose} open={open} isAdmin={isAdmin} />
            )}
            {role === 'Admin' && <Admin userEmail={userEmail} onClose={onClose} open={open} />}
        </React.Fragment>
    )
}

export default UserProfile
