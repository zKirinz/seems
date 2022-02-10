import React, { useState } from 'react'

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
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Radio,
    RadioGroup,
    TextField,
} from '@mui/material'

const CreateEventForm = ({ uploadImageHandler }) => {
    const [startDate, setStartDate] = React.useState(new Date())
    const [endDate, setEndDate] = React.useState(new Date())

    const [isFree, setIsFree] = useState(true)
    const [isChainEvents, setIsChainEvents] = useState(false)
    const [isPrivate, setIsPrivate] = useState(false)

    return (
        <Box component="form" p={2} autoComplete="off">
            <Box display="flex" flexWrap="wrap" justifyContent="space-between">
                <FormControl sx={{ m: 1.5, width: { md: '45%', xs: '100%' } }} required>
                    <InputLabel htmlFor="event-name">Event name</InputLabel>
                    <OutlinedInput id="event-name" label="Event Name" />
                </FormControl>
                <FormControl sx={{ m: 1.5, width: { md: '45%', xs: '100%' } }} required>
                    <InputLabel htmlFor="location">Location</InputLabel>
                    <OutlinedInput id="location" label="Location" />
                </FormControl>
                <FormControl sx={{ ml: 1.5 }}>
                    <FormControlLabel
                        value={isFree}
                        control={<Checkbox />}
                        label="Free"
                        onChange={() => setIsFree((previousValue) => !previousValue)}
                    />
                </FormControl>
                {!isFree && (
                    <FormControl fullWidth required sx={{ m: 1.5 }}>
                        <InputLabel htmlFor="price">Price</InputLabel>
                        <OutlinedInput
                            id="price"
                            endAdornment={<InputAdornment position="start">VND</InputAdornment>}
                            label="Price"
                        />
                    </FormControl>
                )}
                <FormControl fullWidth sx={{ m: 1.5 }} required>
                    <TextField label="Description" id="description" minRows={5} multiline />
                </FormControl>
                <FormControl sx={{ mx: 1 }} fullWidth>
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
            <Box sx={{ m: 1.5, display: 'flex', alignItems: 'center' }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDateTimePicker
                        value={startDate}
                        onChange={(newValue) => {
                            setStartDate(newValue)
                        }}
                        label="Start Date"
                        minDate={new Date()}
                        inputFormat="yyyy/MM/dd hh:mm a"
                        mask="___/__/__ __:__ _M"
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <Box sx={{ mx: 2 }}>To</Box>
                    <MobileDateTimePicker
                        value={endDate}
                        onChange={(newValue) => {
                            setEndDate(newValue)
                        }}
                        label="End Date"
                        minDate={new Date()}
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
                    />
                    <Button variant="outlined" component="span" startIcon={<CameraAlt />}>
                        Upload
                    </Button>
                </InputLabel>
            </Box>
            <Button sx={{ m: 1.5 }} variant="contained" type="submit">
                Submit
            </Button>
        </Box>
    )
}

export default CreateEventForm
