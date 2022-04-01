import React, { useState, useEffect, useMemo } from 'react'

import { useRecoilValue } from 'recoil'

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
    Radio,
    RadioGroup,
    TextField,
    Paper,
    Typography,
} from '@mui/material'
import { grey } from '@mui/material/colors'

import { useSnackbar } from '../../../../HOCs/SnackbarContext'
import usePrompt from '../../../../hooks/use-prompt'
import authAtom from '../../../../recoil/auth/atom'

const isEmpty = (incomeValue) => incomeValue.trim().length === 0
const defaultTextFieldValue = { value: '', isTouched: false }
const src = 'https://res.cloudinary.com/dq7l8216n/image/upload/v1642158763/FPTU.png'
const dayCalculation = (numDay = 1) => numDay * 24 * 60 * 60 * 1000

const CreateEventForm = ({ onCreateEvent, error, setError }) => {
    const auth = useRecoilValue(authAtom)
    const startDateDefault = useMemo(() => {
        return new Date(new Date().getTime() + dayCalculation())
    }, [])
    const endDateDefault = useMemo(() => {
        return new Date(new Date().getTime() + dayCalculation() + 60 * 60 * 1000)
    }, [])
    const closeRegistrationDateDefault = useMemo(() => {
        return new Date(startDateDefault.getTime() - dayCalculation(0.5))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const { routerPrompt, setFormIsTouched } = usePrompt('Changes you made may not be saved.')
    const [startDate, setStartDate] = useState(startDateDefault)
    const [endDate, setEndDate] = useState(endDateDefault)
    const [registrationTime, setRegistrationTime] = useState(closeRegistrationDateDefault)
    const [eventName, setEventName] = useState(defaultTextFieldValue)
    const [location, setLocation] = useState(defaultTextFieldValue)
    const [description, setDescription] = useState(defaultTextFieldValue)
    const [isPrivate, setIsPrivate] = useState(false)
    const [poster, setPoster] = useState({ src, file: null })
    const [participantsLimited, setParticipantsLimited] = useState(0)
    const showSnackbar = useSnackbar()

    useEffect(() => {
        return () => {
            poster.src && URL.revokeObjectURL(poster.src)
        }
    }, [poster])

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
    const limitationChangeHandler = (event) => {
        setParticipantsLimited(event.target.value)
    }
    const registrationTimeChangeHandler = (newDate) => {
        error?.registrationDeadline &&
            setError((previousError) => ({ ...previousError, registrationDeadline: null }))
        setRegistrationTime(newDate)
    }
    const uploadImageHandler = (event) => {
        const file = event.target.files[0]
        if (!file) return

        const { type } = file
        if (!(type.endsWith('jpeg') || type.endsWith('png') || type.endsWith('jpg'))) {
            showSnackbar({
                severity: 'error',
                children: 'Event poster can only be jpeg, png and jpg file.',
            })
            return
        }

        const imageUrl = URL.createObjectURL(event.target.files[0])
        setPoster({ src: imageUrl, file })
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

    const eventNameIsInValid = isEmpty(eventName.value) && eventName.isTouched
    const locationIsInValid = isEmpty(location.value) && location.isTouched
    const descriptionIsInValid = isEmpty(description.value) && description.isTouched
    const overallTextFieldIsValid =
        !isEmpty(eventName.value) && !isEmpty(location.value) && !isEmpty(description.value)
    const submitHandler = async (event) => {
        event.preventDefault()

        const eventDetailed = {
            eventTitle: eventName.value,
            location: location.value,
            eventDescription: description.value,
            imageUrl: src,
            isPrivate,
            startDate: startDate,
            endDate: endDate,
            organizationName: auth.organization,
            participantNum: +participantsLimited,
            registrationDeadline: registrationTime,
        }
        await onCreateEvent({ eventData: eventDetailed, poster })
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
                            src={poster.src}
                            sx={{
                                width: '100%',
                                aspectRatio: '1 / 1',
                                objectFit: 'contain',
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
                                        required
                                        style={{ opacity: 0, maxWidth: 0.5 }}
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
                                        Upload Poster
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
                                    education?
                                </Typography>
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
                                    <FormControl>
                                        <MobileDateTimePicker
                                            value={startDate}
                                            onChange={(newValue) => {
                                                startDateChangeHandler(newValue)
                                            }}
                                            label="Start date"
                                            minDate={
                                                new Date(new Date().getTime() + dayCalculation(1))
                                            }
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
                                            label="End date"
                                            minDate={new Date(startDate.getTime() + 60 * 60 * 1000)}
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
                                </Box>
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ mx: 1.5, display: 'flex' }}>
                            <FormControl required sx={{ mr: 4 }}>
                                <InputLabel htmlFor="limit" shrink>
                                    Participants limitation
                                </InputLabel>
                                <OutlinedInput
                                    id="limit"
                                    label="Participants limitation"
                                    inputProps={{
                                        type: 'number',
                                        inputMode: 'numeric',
                                        pattern: '[0-9]*',
                                    }}
                                    value={participantsLimited}
                                    onChange={limitationChangeHandler}
                                    sx={{
                                        'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button':
                                            { display: 'none' },
                                    }}
                                />
                            </FormControl>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <FormControl sx={{ mx: 2 }}>
                                    <MobileDateTimePicker
                                        value={registrationTime}
                                        onChange={(newValue) => {
                                            registrationTimeChangeHandler(newValue)
                                        }}
                                        label="Register closing date"
                                        minDate={
                                            new Date(new Date().getTime() + dayCalculation(0.5))
                                        }
                                        maxDateTime={
                                            new Date(startDate.getTime() - dayCalculation(0.25))
                                        }
                                        inputFormat="yyyy/MM/dd hh:mm a"
                                        mask="___/__/__ __:__ _M"
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    {error?.registrationDeadline && (
                                        <FormHelperText error={!!error?.registrationDeadline}>
                                            {error?.registrationDeadline &&
                                                `${error.registrationDeadline}`}
                                        </FormHelperText>
                                    )}
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

export default CreateEventForm
