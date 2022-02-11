import { useState, useEffect } from 'react'

import LocalStorageUtils from './LocalStorageUtils'

const usePersistedState = (key, defaultValue) => {
    const [state, setState] = useState(() => LocalStorageUtils.getItem(key) || defaultValue)

    useEffect(() => {
        LocalStorageUtils.setItem(key, state)
    }, [key, state])

    return [state, setState]
}

export default usePersistedState
