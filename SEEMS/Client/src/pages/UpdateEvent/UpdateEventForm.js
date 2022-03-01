import React, { useState, useEffect } from 'react'

const defaultTextFieldValue = { value: '', isTouched: false }

const UpdateEventForm = ({ event }) => {
    console.log(event)
    const [eventName, setEventName] = useState(defaultTextFieldValue)
    const [location, setLocation] = useState(defaultTextFieldValue)
    const [description, setDescription] = useState(defaultTextFieldValue)
    useEffect(() => {
        setEventName((previousValue) => ({ ...previousValue, value: event.eventTitle }))
        setLocation((previousValue) => ({ ...previousValue, value: event.location }))
        setDescription((previousValue) => ({ ...previousValue, value: event.eventDescription }))
    }, [event])
    return <React.Fragment></React.Fragment>
}

export default UpdateEventForm
