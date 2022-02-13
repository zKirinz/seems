import React from 'react'

import { Redirect, Route } from 'react-router-dom'

import LocalStorageUtils from '../utils/LocalStorageUtils'

const HybridRoute = (props) => {
    const { publicComponent, privateComponent, ...rest } = props

    const user = LocalStorageUtils.getUser()
    const component = user?.email ? publicComponent : privateComponent

    if (user?.email && user?.role === 'Admin') {
        return <Redirect to="/admin" />
    }

    return <Route component={component} {...rest} />
}

export default HybridRoute
