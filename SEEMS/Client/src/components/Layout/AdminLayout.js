import React from 'react'

import Footer from '../Footer'
import { AdminHeader } from '../Header'

const AdminLayout = ({ children }) => {
    return (
        <React.Fragment>
            <AdminHeader />
            {children}
            <Footer />
        </React.Fragment>
    )
}

export default AdminLayout
