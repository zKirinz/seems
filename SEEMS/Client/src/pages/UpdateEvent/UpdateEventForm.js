import React, { useState } from 'react'

const defaultTextFieldValue = { value: '', isTouched: false }

const UpdateEventForm = ({ event }) => {
    console.log(event)
    const [eventName, setEventName] = useState(defaultTextFieldValue)
    const [location, setLocation] = useState(defaultTextFieldValue)
    const [description, setDescription] = useState(defaultTextFieldValue)
    // useEffect(() => {}, [])
    return <React.Fragment></React.Fragment>
}

export default UpdateEventForm
