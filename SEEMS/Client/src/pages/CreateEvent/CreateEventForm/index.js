import React, { useState, useEffect, useMemo } from 'react'

import { CameraAlt } from '@mui/icons-material'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker'
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Radio,
    RadioGroup,
    TextField,
    Paper,
    Typography,
} from '@mui/material'

import usePrompt from '../../../hooks/use-prompt'
import ModalChainOfEvent from './ModalChainOfEvent'

const isEmpty = (incomeValue) => incomeValue.trim().length === 0

const defaultTextFieldValue = { value: '', isTouched: false }
const src = 'https://res.cloudinary.com/dq7l8216n/image/upload/v1642158763/FPTU.png'
const CreateEventForm = ({
    onCreateEvent,
    error,
    setError,
    onCreateChainOfEvent,
    onLoadChainOfEvent,
}) => {
    const startDateDefault = useMemo(() => {
        return new Date(new Date().getTime() + 24 * 3600 * 1000)
    }, [])
    const endDateDefault = useMemo(() => {
        return new Date(new Date().getTime() + 24 * 3600 * 1000 + 5 * 60 * 1000)
    }, [])
    const { routerPrompt, setFormIsTouched } = usePrompt('Changes you made may not be saved.')
    const [startDate, setStartDate] = useState(startDateDefault)
    const [endDate, setEndDate] = useState(endDateDefault)
    const [eventName, setEventName] = useState(defaultTextFieldValue)
    const [location, setLocation] = useState(defaultTextFieldValue)
    const [description, setDescription] = useState(defaultTextFieldValue)
    const [isPrivate, setIsPrivate] = useState(false)
    const [posterUrl, setPosterUrl] = useState({ src })
    const [chainOfEvent, setChainOfEvent] = useState(null)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [chainOfEventList, setChainOfEventList] = useState([])
    useEffect(() => {
        return () => {
            posterUrl.src && URL.revokeObjectURL(posterUrl.src)
        }
    }, [posterUrl])
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

    const startDateChangeHandler = (newDate) => {
        error?.startDate && setError((previousError) => ({ ...previousError, startDate: null }))
        setStartDate(newDate)
    }

    const endDateChangeHandler = (newDate) => {
        error?.endDate && setError((previousError) => ({ ...previousError, endDate: null }))
        setEndDate(newDate)
    }

    const uploadImageHandler = (event) => {
        const imageUrl = URL.createObjectURL(event.target.files[0])
        setPosterUrl({ src: imageUrl })
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
    const openChainOfEventHandler = () => {
        setIsOpenModal(true)
        onLoadChainOfEvent().then((response) => {
            setChainOfEventList(response.data.data)
        })
    }
    const closeChainOfEventHandler = () => {
        setIsOpenModal(false)
    }
    const eventNameIsInValid = isEmpty(eventName.value) && eventName.isTouched
    const locationIsInValid = isEmpty(location.value) && location.isTouched
    const descriptionIsInValid = isEmpty(description.value) && description.isTouched
    const overallTextFieldIsValid =
        !isEmpty(eventName.value) && !isEmpty(location.value) && !isEmpty(description.value)
    const submitHandler = (event) => {
        event.preventDefault()
        const eventDetailed = {
            eventTitle: eventName.value,
            location: location.value,
            eventDescription: description.value,
            imageUrl: src,
            isPrivate,
            startDate: startDate,
            endDate: endDate,
            chainOfEventId: chainOfEvent?.id,
        }
        onCreateEvent(eventDetailed)
    }

    return (
        <React.Fragment>
            {routerPrompt}
            <Grid container component={Paper} elevation={3}>
                <Grid item xs={12} sm={5}>
                    <Box display="flex" alignItems="center" height="100%">
                        <Box
                            component="img"
                            alt="school-image"
                            src={posterUrl.src}
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
                                sx={{ ml: 1.5, flexDirection: 'row', alignItems: 'center' }}
                                fullWidth
                            >
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Chain of events"
                                    checked={!!chainOfEvent ?? isOpenModal}
                                    onChange={openChainOfEventHandler}
                                />
                                {chainOfEvent && (
                                    <Typography
                                        sx={{ ml: 2, textDecoration: 'underline' }}
                                        variant="subtitle1"
                                        fontWeight={600}
                                        color="primary"
                                    >
                                        ({chainOfEvent.categoryName})
                                    </Typography>
                                )}
                            </FormControl>
                            <FormControl
                                sx={{ mx: 1.5, my: 1, flexDirection: 'row', alignItems: 'center' }}
                                fullWidth
                            >
                                <RadioGroup row name="row-radio-buttons-group" value={isPrivate}>
                                    <FormControlLabel
                                        value={false}
                                        control={<Radio />}
                                        label="Public"
                                        onChange={() => setIsPrivate(false)}
                                    />
                                    <FormControlLabel
                                        value={true}
                                        control={<Radio />}
                                        label="Private"
                                        onChange={() => setIsPrivate(true)}
                                    />
                                </RadioGroup>
                                <Typography component="span" variant="body2" fontWeight={500}>
                                    You want this event to be public or private only for FPT
                                    education
                                </Typography>
                            </FormControl>
                        </Box>
                        <Box
                            sx={{
                                m: 1.5,
                                display: 'flex',
                                alignItems: { sm: 'center', xs: 'flex-start' },
                                flexDirection: { sm: 'row', xs: 'column' },
                            }}
                        >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <FormControl>
                                    <MobileDateTimePicker
                                        value={startDate}
                                        onChange={(newValue) => {
                                            startDateChangeHandler(newValue)
                                        }}
                                        label="Start Date"
                                        minDateTime={startDateDefault}
                                        inputFormat="yyyy/MM/dd hh:mm a"
                                        mask="___/__/__ __:__ _M"
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    {error?.startDate && (
                                        <FormHelperText error={!!error?.startDate}>
                                            {error?.startDate && `${error.startDate}`}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                                <Box sx={{ mx: { sm: 2 }, my: { xs: 2, sm: 0 } }}>To</Box>
                                <FormControl>
                                    <MobileDateTimePicker
                                        value={endDate}
                                        onChange={(newValue) => {
                                            endDateChangeHandler(newValue)
                                        }}
                                        label="End Date"
                                        minDateTime={endDateDefault}
                                        inputFormat="yyyy/MM/dd hh:mm a"
                                        mask="___/__/__ __:__ _M"
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    {error?.endDate && (
                                        <FormHelperText error={!!error?.endDate}>
                                            {error?.endDate && `${error.endDate}`}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ mx: 1.5, my: 3 }}>
                            <InputLabel htmlFor="upload-photo" sx={{ display: 'inline-block' }}>
                                <input
                                    style={{ display: 'none' }}
                                    id="upload-photo"
                                    type="file"
                                    onChange={uploadImageHandler}
                                    accept="image/*"
                                />
                                <Button
                                    variant="outlined"
                                    component="span"
                                    startIcon={<CameraAlt />}
                                >
                                    Upload
                                </Button>
                            </InputLabel>
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
            <ModalChainOfEvent
                chainOfEvent={chainOfEvent}
                setChainEvent={setChainOfEvent}
                isOpenModal={isOpenModal}
                closeChainOfEventHandler={closeChainOfEventHandler}
                onCreateChainOfEvent={onCreateChainOfEvent}
                chainOfEventList={chainOfEventList}
            />
        </React.Fragment>
    )
}

export default CreateEventForm
