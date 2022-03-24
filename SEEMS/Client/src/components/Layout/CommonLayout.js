import React from 'react'

import Footer from '../Footer'
import { CommonHeader } from '../Header'

const CommonLayout = ({ children }) => {
    return (
        <React.Fragment>
            <CommonHeader />
            {children}
            <Footer />
        </React.Fragment>
    )
}

export default CommonLayout
