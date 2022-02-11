import React, { useState, useEffect, useMemo } from 'react'

import { Prompt } from 'react-router-dom'

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
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Radio,
    RadioGroup,
    TextField,
} from '@mui/material'

const isEmpty = (incomeValue) => incomeValue.trim().length === 0

const defaultTextFieldValue = { value: '', isTouched: false }

const CreateEventForm = ({ uploadImageHandler }) => {
    const startDateDefault = useMemo(() => {
        return new Date(new Date().getTime() + 24 * 3600 * 1000)
    }, [])
    const endDateDefault = useMemo(() => {
        return new Date(new Date().getTime() + 24 * 3600 * 1000 + 5 * 60 * 1000)
    }, [])
    const [startDate, setStartDate] = useState(startDateDefault)
    const [endDate, setEndDate] = useState(endDateDefault)
    const [eventName, setEventName] = useState(defaultTextFieldValue)
    const [location, setLocation] = useState(defaultTextFieldValue)
    const [description, setDescription] = useState(defaultTextFieldValue)
    const [isFree, setIsFree] = useState(true)
    const [isChainEvents, setIsChainEvents] = useState(false)
    const [isPrivate, setIsPrivate] = useState(false)
    const [price, setPrice] = useState(0)
    const [formIsHalfFilled, setFormIsHalfFilled] = useState(false)
    useEffect(() => {
        if (isFree) setPrice(0)
        else setPrice(1000)
    }, [isFree])

    const eventNameChangeHandler = (event) => {
        setEventName((previousValue) => ({ ...previousValue, value: event.target.value }))
    }
    const locationChangeHandler = (event) => {
        setLocation((previousValue) => ({ ...previousValue, value: event.target.value }))
    }
    const descriptionChangeHandler = (event) => {
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
    const resetAllInput = () => {
        setEventName(defaultInputValue)
        setLocation(defaultInputValue)
        setDescription(defaultInputValue)
    }
    const eventNameIsInValid = isEmpty(eventName.value) && eventName.isTouched
    const locationIsInValid = isEmpty(location.value) && location.isTouched
    const descriptionIsInValid = isEmpty(description.value) && description.isTouched
    const overallTextFieldIsValid =
        !isEmpty(eventName.value) && !isEmpty(location.value) && !isEmpty(description.value)
    const onBlurForm = () => {
        if (!isEmpty(eventName.value) || !isEmpty(location.value) || !isEmpty(description.value))
            setFormIsHalfFilled(true)
        else setFormIsHalfFilled(false)
    }
    const submitHandler = (event) => {
        event.preventDefault()
        resetAllInput()
    }

    return (
        <React.Fragment>
            <Prompt
                when={formIsHalfFilled}
                message={(location) => {
                    return location.pathname === '/event/create'
                        ? false
                        : 'Changes you made may not be sent'
                }}
            />
            <Box
                component="form"
                p={2}
                autoComplete="off"
                onSubmit={submitHandler}
                onBlur={onBlurForm}
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
                            error={eventNameIsInValid}
                        />
                        {eventNameIsInValid && (
                            <FormHelperText error={eventNameIsInValid}>
                                Event name must be not empty
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
                            error={locationIsInValid}
                        />
                        {locationIsInValid && (
                            <FormHelperText error={locationIsInValid}>
                                Location must not be empty
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
                            helperText={
                                descriptionIsInValid ? 'Description must not be empty' : null
                            }
                            error={descriptionIsInValid}
                        />
                    </FormControl>
                    <FormControl sx={{ ml: 1.5 }}>
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Free"
                            onChange={() => setIsFree((previousValue) => !previousValue)}
                            checked={isFree}
                        />
                    </FormControl>
                    {!isFree && (
                        <FormControl fullWidth required sx={{ m: 1.5 }}>
                            <InputLabel htmlFor="price" shrink>
                                Price
                            </InputLabel>
                            <OutlinedInput
                                id="price"
                                endAdornment={<InputAdornment position="start">VND</InputAdornment>}
                                label="Price"
                                inputProps={{
                                    type: 'number',
                                    min: 1000,
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                }}
                                value={price}
                                onChange={(event) => setPrice(event.target.value)}
                                sx={{
                                    'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button':
                                        { display: 'none' },
                                }}
                            />
                        </FormControl>
                    )}
                    <FormControl sx={{ mx: 1.5 }} fullWidth>
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
                    <FormControl sx={{ ml: 1.5 }}>
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Chain of events"
                            value={isChainEvents}
                            onChange={() => setIsChainEvents((previousValue) => !previousValue)}
                        />
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
                        <MobileDateTimePicker
                            value={startDate}
                            onChange={(newValue) => {
                                setStartDate(newValue)
                            }}
                            label="Start Date"
                            minDateTime={startDateDefault}
                            inputFormat="yyyy/MM/dd hh:mm a"
                            mask="___/__/__ __:__ _M"
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <Box sx={{ mx: { sm: 2 }, my: { xs: 2, sm: 0 } }}>To</Box>
                        <MobileDateTimePicker
                            value={endDate}
                            onChange={(newValue) => {
                                setEndDate(newValue)
                            }}
                            label="End Date"
                            minDateTime={endDateDefault}
                            inputFormat="yyyy/MM/dd hh:mm a"
                            mask="___/__/__ __:__ _M"
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Box>
                <Box sx={{ m: 1.5 }}>
                    <InputLabel htmlFor="upload-photo" sx={{ display: 'inline-block' }}>
                        <input
                            style={{ display: 'none' }}
                            id="upload-photo"
                            name="upload-photo"
                            type="file"
                            onChange={uploadImageHandler}
                            accept="image/*"
                            required
                        />
                        <Button variant="outlined" component="span" startIcon={<CameraAlt />}>
                            Upload
                        </Button>
                    </InputLabel>
                </Box>
                <Box sx={{ m: 1.5, mt: 3 }} display="flex" justifyContent="flex-end">
                    <Button variant="contained" type="submit" disabled={!overallTextFieldIsValid}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default CreateEventForm
