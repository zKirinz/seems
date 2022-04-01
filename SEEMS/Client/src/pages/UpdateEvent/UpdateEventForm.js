import React, { useState, useEffect } from 'react'

import AlertConfirm from '../../components/ConfirmDialog'
import { CameraAlt, InfoRounded } from '@mui/icons-material'
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
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from '@mui/material'
import { grey } from '@mui/material/colors'

import { useSnackbar } from '../../HOCs/SnackbarContext'
import usePrompt from '../../hooks/use-prompt'
import { useEventAction } from '../../recoil/event'
import Loading from '../Loading'

const defaultTextFieldValue = { value: '', isTouched: false }

const isEmpty = (incomeValue) => incomeValue?.trim().length === 0
const dayCalculation = (numDay = 1) => numDay * 24 * 60 * 60 * 1000

const UpdateEventForm = ({ error, setError, updateEventHandler, id, deleteEventHandler }) => {
    const showSnackbar = useSnackbar()
    const { getDetailedEvent } = useEventAction()
    const { routerPrompt, setFormIsTouched } = usePrompt('Changes you made may not be saved.')
    const [eventName, setEventName] = useState(defaultTextFieldValue)
    const [location, setLocation] = useState(defaultTextFieldValue)
    const [description, setDescription] = useState(defaultTextFieldValue)
    const [eventFields, setEventFields] = useState({})
    const [startDate, setStartDate] = useState({})
    const [endDate, setEndDate] = useState({})
    const [registrationTime, setRegistrationTime] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [poster, setPoster] = useState({ src: {}, file: null })
    const [sendingEmail, setSendingEmail] = useState(false)
    const [participantsLimited, setParticipantsLimited] = useState(0)
    const [confirmDialog, setConfirmDialog] = useState(false)

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

    const startDateChangeHandler = (newDate) => {
        error?.startDate && setError((previousError) => ({ ...previousError, startDate: null }))
        if (newDate !== null) setStartDate(newDate)
        else setStartDate(new Date(eventFields.startDate))
    }

    const endDateChangeHandler = (newDate) => {
        error?.endDate && setError((previousError) => ({ ...previousError, endDate: null }))
        if (newDate !== null) setEndDate(newDate)
        else setEndDate(new Date(eventFields.endDate))
    }

    const registrationTimeChangeHandler = (newDate) => {
        error?.registrationDeadline &&
            setError((previousError) => ({ ...previousError, registrationDeadline: null }))
        if (newDate !== null) setRegistrationTime(newDate)
        else setRegistrationTime(new Date(eventFields.registrationDeadline))
    }

    const limitationChangeHandler = (event) => {
        setParticipantsLimited(event.target.value)
    }

    const openDialog = (event) => {
        event.stopPropagation()
        setConfirmDialog(true)
    }

    const closeDialog = () => {
        setConfirmDialog(false)
    }

    const onConfirmDialog = () => {
        deleteEventHandler()
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
            startDate: startDate,
            endDate: endDate,
            participantNum: eventFields.participantNum,
            registrationDeadline: registrationTime,
            allowEmail: sendingEmail,
        }
        updateEventHandler({ eventData: eventDetailed, poster })
    }
    const eventNameIsInValid = isEmpty(eventName.value) && eventName.isTouched
    const locationIsInValid = isEmpty(location.value) && location.isTouched
    const descriptionIsInValid = isEmpty(description.value) && description.isTouched
    const overallTextFieldIsValid =
        !isEmpty(eventName.value) && !isEmpty(location.value) && !isEmpty(description.value)

    useEffect(() => {
        setIsLoading(true)
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
                setStartDate(new Date(responseEvent.startDate))
                setEndDate(new Date(responseEvent.endDate))
                setRegistrationTime(new Date(responseEvent.registrationDeadline))
                setPoster((previousValue) => ({ ...previousValue, src: responseEvent.imageUrl }))
                setParticipantsLimited(responseEvent.participantNum)
                setTimeout(() => {
                    setIsLoading(false)
                }, 500)
            })
            .catch(() => {
                showSnackbar({
                    severity: 'error',
                    children: 'Something went wrong, please try again later.',
                })
                setTimeout(() => {
                    setIsLoading(false)
                }, 500)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return isLoading ? (
        <Loading />
    ) : (
        <React.Fragment>
            <AlertConfirm
                open={confirmDialog}
                onClose={closeDialog}
                btnConfirmText="Delete"
                title="Are you sure you want to delete this event?"
                onConfirm={(event) => onConfirmDialog(event)}
            >
                Are you sure you want to send this feedback?
            </AlertConfirm>
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
                                        style={{ display: 'none' }}
                                        id="upload-photo"
                                        type="file"
                                        accept="image/*"
                                        onChange={uploadImageHandler}
                                    />
                                    <Button
                                        variant="outlined"
                                        component="span"
                                        startIcon={<CameraAlt />}
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
                                sx={{ mx: 1.5, mt: 1, flexDirection: 'row', alignItems: 'center' }}
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
                        <FormControl sx={{ mx: 1.5, mb: 1.5 }}>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Sending email for updating notification"
                                onChange={() => setSendingEmail((previousValue) => !previousValue)}
                                checked={sendingEmail}
                            />
                        </FormControl>
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
                                            minDate={
                                                new Date(new Date().getTime() + dayCalculation(1))
                                            }
                                            label="Start Date"
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
                                            label="End Date"
                                            onChange={(newValue) => {
                                                endDateChangeHandler(newValue)
                                            }}
                                            minDate={
                                                startDate.getTime
                                                    ? new Date(startDate.getTime() + 60 * 60 * 1000)
                                                    : new Date()
                                            }
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
                                        onChange={(newDate) =>
                                            registrationTimeChangeHandler(newDate)
                                        }
                                        value={registrationTime}
                                        label="Close registration date"
                                        minDate={
                                            new Date(new Date().getTime() + dayCalculation(0.5))
                                        }
                                        maxDateTime={
                                            startDate.getTime
                                                ? new Date(
                                                      startDate.getTime() - dayCalculation(0.25)
                                                  )
                                                : new Date()
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
                            justifyContent="space-between"
                        >
                            <Button variant="contained" color="error" onClick={openDialog}>
                                Delete
                            </Button>
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
