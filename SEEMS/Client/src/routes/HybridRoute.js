import React from 'react'

import { Route } from 'react-router-dom'

import LocalStorageUtils from '../utils/LocalStorageUtils'

const HybridRoute = (props) => {
    const { publicComponent, privateComponent, ...rest } = props

    const user = LocalStorageUtils.getUser()
    const component = user?.email ? publicComponent : privateComponent

    return <Route component={component} {...rest} />
}

export default HybridRoute
