import { useState, useEffect } from 'react'

import { Prompt } from 'react-router-dom'

const usePrompt = (message) => {
    const [formIsTouched, setFormIsTouched] = useState(false)
    useEffect(() => {
        window.onbeforeunload = formIsTouched && (() => message)
        return () => {
            window.onbeforeunload = null
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formIsTouched])
    const routerPrompt = (
        <Prompt
            when={formIsTouched}
            message={(location) => {
                return location.pathname === '/events/create' ? false : message
            }}
        />
    )
    return { routerPrompt, setFormIsTouched }
}

export default usePrompt
