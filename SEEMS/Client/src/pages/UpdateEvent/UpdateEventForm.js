import React, { useState, useEffect } from 'react'

const defaultTextFieldValue = { value: '', isTouched: false }

const isEmpty = (incomeValue) => incomeValue.trim().length === 0

const UpdateEventForm = ({ event, error }) => {
    console.log(event)
    const { routerPrompt, setFormIsTouched } = usePrompt('Changes you made may not be saved.')
    const [eventName, setEventName] = useState(defaultTextFieldValue)
    const [location, setLocation] = useState(defaultTextFieldValue)
    const [description, setDescription] = useState(defaultTextFieldValue)

    const eventNameChangeHandler = (event) => {
        error?.title && setError((previousError) => ({ ...previousError, title: null }))
        setEventName((previousValue) => ({ ...previousValue, value: event.target.value }))
    }

    const locationChangeHandler = (event) => {
        error?.location && setError((previousError) => ({ ...previousError, location: null }))
        setLocation((previousValue) => ({ ...previousValue, value: event.target.value }))
    }

    const descriptionChangeHandler = (event) => {
        error?.description && setError((previousError) => ({ ...previousError, description: null }))
        setDescription((previousValue) => ({ ...previousValue, value: event.target.value }))
    }

    const eventNameTouchedHandler = () => {
        setEventName((previousValue) => ({ ...previousValue, isTouched: true }))
    }

    const locationTouchedHandler = () => {
        setLocation((previousValue) => ({ ...previousValue, isTouched: true }))
    }

    const descriptionTouchedHandler = () => {
        setDescription((previousValue) => ({ ...previousValue, isTouched: true }))
    }

    const formIsEntering = () => {
        setFormIsTouched(true)
    }

    const finishFormEntering = () => {
        setFormIsTouched(false)
    }
    const overallTextFieldIsValid =
        !isEmpty(eventName.value) && !isEmpty(location.value) && !isEmpty(description.value)
    useEffect(() => {
        setEventName((previousValue) => ({ ...previousValue, value: event.eventTitle }))
        setLocation((previousValue) => ({ ...previousValue, value: event.location }))
        setDescription((previousValue) => ({ ...previousValue, value: event.eventDescription }))
    }, [event])
    return <React.Fragment></React.Fragment>
}

export default UpdateEventForm
