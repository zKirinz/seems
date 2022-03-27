import React from 'react'

import Admin from './Admin'
import Organizer from './Organizer'
import User from './User'

const UserProfile = ({ userEmail, onClose, open, role }) => {
    return (
        <React.Fragment>
            {role === 'User' && <User userEmail={userEmail} onClose={onClose} open={open} />}
            {role === 'Organizer' && (
                <Organizer userEmail={userEmail} onClose={onClose} open={open} />
            )}
            {role === 'Admin' && <Admin userEmail={userEmail} onClose={onClose} open={open} />}
        </React.Fragment>
    )
}

export default UserProfile
