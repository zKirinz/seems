import React, { useState, useEffect } from 'react'

import { CameraAlt, InfoRounded } from '@mui/icons-material'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker'
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from '@mui/material'
import { grey } from '@mui/material/colors'

import usePrompt from '../../hooks/use-prompt'
import { useEventAction } from '../../recoil/event'

const defaultTextFieldValue = { value: '', isTouched: false }

const isEmpty = (incomeValue) => incomeValue?.trim().length === 0

const UpdateEventForm = ({ error, setError, updateEventHandler, id }) => {
    const { getDetailedEvent } = useEventAction()
    const { routerPrompt, setFormIsTouched } = usePrompt('Changes you made may not be saved.')
    const [eventName, setEventName] = useState(defaultTextFieldValue)
    const [location, setLocation] = useState(defaultTextFieldValue)
    const [description, setDescription] = useState(defaultTextFieldValue)
    const [eventFields, setEventFields] = useState({})

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
    const submitHandler = (event) => {
        event.preventDefault()
        const eventDetailed = {
            eventTitle: eventName.value,
            location: location.value,
            eventDescription: description.value,
            imageUrl: eventFields.imageUrl,
            isPrivate: eventFields.isPrivate,
            startDate: eventFields.startDate,
            endDate: eventFields.endDate,
            participantNum: eventFields.participantNum,
            registrationDeadline: eventFields.registrationDeadline,
        }
        updateEventHandler(eventDetailed)
    }
    const eventNameIsInValid = isEmpty(eventName.value) && eventName.isTouched
    const locationIsInValid = isEmpty(location.value) && location.isTouched
    const descriptionIsInValid = isEmpty(description.value) && description.isTouched
    const overallTextFieldIsValid =
        !isEmpty(eventName.value) && !isEmpty(location.value) && !isEmpty(description.value)

    useEffect(() => {
        getDetailedEvent(id)
            .then((response) => {
                const { event: responseEvent } = response.data.data
                setEventFields(responseEvent)

                setEventName((previousValue) => ({
                    ...previousValue,
                    value: responseEvent.eventTitle,
                }))

                setLocation((previousValue) => ({
                    ...previousValue,
                    value: responseEvent.location,
                }))

                setDescription((previousValue) => ({
                    ...previousValue,
                    value: responseEvent.eventDescription,
                }))
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <React.Fragment>
            {routerPrompt}
            <Grid container component={Paper} elevation={3}>
                <Grid item xs={12} sm={5}>
                    <Box display="flex" alignItems="center" height="100%">
                        <Box
                            component="img"
                            alt="school-image"
                            src={eventFields.imageUrl}
                            sx={{
                                width: '100%',
                                aspectRatio: '1 / 1',
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={7}>
                    <Box
                        component="form"
                        p={2}
                        autoComplete="off"
                        onSubmit={submitHandler}
                        onChange={formIsEntering}
                    >
                        <Box display="flex" flexWrap="wrap" justifyContent="space-between">
                            <FormControl sx={{ m: 1.5, width: { md: '45%', xs: '100%' } }} required>
                                <InputLabel htmlFor="event-name">Event name</InputLabel>
                                <OutlinedInput
                                    id="event-name"
                                    label="Event Name"
                                    value={eventName.value}
                                    onChange={eventNameChangeHandler}
                                    onBlur={eventNameTouchedHandler}
                                    error={eventNameIsInValid || !!error?.title}
                                />
                                {(error?.title || eventNameIsInValid) && (
                                    <FormHelperText error={eventNameIsInValid || !!error?.title}>
                                        {error?.title
                                            ? `${error.title}`
                                            : 'Event name must be not empty'}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl sx={{ m: 1.5, width: { md: '45%', xs: '100%' } }} required>
                                <InputLabel htmlFor="location">Location</InputLabel>
                                <OutlinedInput
                                    id="location"
                                    label="Location"
                                    value={location.value}
                                    onChange={locationChangeHandler}
                                    onBlur={locationTouchedHandler}
                                    error={locationIsInValid || !!error?.location}
                                />
                                {(error?.location || locationIsInValid) && (
                                    <FormHelperText error={locationIsInValid || !!error?.title}>
                                        {error?.location
                                            ? `${error.location}`
                                            : 'Location must not be empty'}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <Box
                                sx={{
                                    my: 2,
                                    ml: 1.5,
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <InputLabel htmlFor="upload-photo" sx={{ display: 'inline-block' }}>
                                    <input
                                        style={{ display: 'none' }}
                                        id="upload-photo"
                                        type="file"
                                        accept="image/*"
                                        disabled
                                    />
                                    <Button
                                        variant="outlined"
                                        component="span"
                                        startIcon={<CameraAlt />}
                                        disabled
                                    >
                                        Upload
                                    </Button>
                                </InputLabel>
                                <Box display="flex" alignItems="center" sx={{ ml: 3 }}>
                                    <InfoRounded color="primary" fontSize="small" />
                                    <Typography sx={{ color: grey[800], ml: 0.5 }}>
                                        Recommend using image with ratio 1:1
                                    </Typography>
                                </Box>
                            </Box>
                            <FormControl fullWidth sx={{ m: 1.5 }} required>
                                <TextField
                                    label="Description"
                                    id="description"
                                    minRows={5}
                                    multiline
                                    value={description.value}
                                    onChange={descriptionChangeHandler}
                                    onBlur={descriptionTouchedHandler}
                                    error={descriptionIsInValid || !!error?.description}
                                />
                                {(error?.description || descriptionIsInValid) && (
                                    <FormHelperText
                                        error={descriptionIsInValid || !!error?.description}
                                    >
                                        {error?.description
                                            ? `${error.description}`
                                            : 'Description must not be empty'}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl
                                sx={{ mx: 1.5, my: 1, flexDirection: 'row', alignItems: 'center' }}
                                fullWidth
                            >
                                <Typography
                                    component="span"
                                    variant="body2"
                                    fontWeight={500}
                                    sx={{ mr: 1.5 }}
                                >
                                    You want this event to be public or private only for FPT
                                    education.
                                </Typography>
                                <RadioGroup
                                    row
                                    name="row-radio-buttons-group"
                                    value={eventFields.isPrivate ? true : false}
                                >
                                    <FormControlLabel
                                        value={false}
                                        control={<Radio />}
                                        disabled
                                        label="Public"
                                    />
                                    <FormControlLabel
                                        value={true}
                                        control={<Radio />}
                                        disabled
                                        label="Private"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Box sx={{ mx: 1.5, mb: 4, mt: 1 }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: { sm: 'center', xs: 'flex-start' },
                                        flexDirection: { sm: 'row', xs: 'column' },
                                        mb: 2,
                                    }}
                                >
                                    <FormControl disabled>
                                        <MobileDateTimePicker
                                            disabled
                                            value={eventFields.startDate}
                                            label="Start Date"
                                            inputFormat="yyyy/MM/dd hh:mm a"
                                            mask="___/__/__ __:__ _M"
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </FormControl>
                                    <Box sx={{ mx: { sm: 2 }, my: { xs: 2, sm: 0 } }}>To</Box>
                                    <FormControl>
                                        <MobileDateTimePicker
                                            disabled
                                            value={eventFields.endDate}
                                            label="End Date"
                                            inputFormat="yyyy/MM/dd hh:mm a"
                                            mask="___/__/__ __:__ _M"
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </FormControl>
                                </Box>
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ mx: 1.5, display: 'flex' }}>
                            <FormControl sx={{ mr: 4 }}>
                                <InputLabel htmlFor="limit" shrink>
                                    Participants limitation
                                </InputLabel>
                                <OutlinedInput
                                    disabled
                                    id="limit"
                                    label="Participants limitation"
                                    inputProps={{
                                        type: 'number',
                                        min: 1,
                                        inputMode: 'numeric',
                                        pattern: '[0-9]*',
                                    }}
                                    value={eventFields.participantNum}
                                    sx={{
                                        'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button':
                                            { display: 'none' },
                                    }}
                                />
                            </FormControl>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <FormControl sx={{ mx: 2 }}>
                                    <MobileDateTimePicker
                                        disabled
                                        value={eventFields.registrationDeadline}
                                        label="Close registration date"
                                        inputFormat="yyyy/MM/dd hh:mm a"
                                        mask="___/__/__ __:__ _M"
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </FormControl>
                            </LocalizationProvider>
                        </Box>
                        <Box
                            sx={{ m: 1.5, mt: { sm: 9, xs: 3 } }}
                            display="flex"
                            justifyContent="flex-end"
                        >
                            <Button
                                variant="contained"
                                type="submit"
                                disabled={!overallTextFieldIsValid}
                                onClick={finishFormEntering}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default UpdateEventForm
