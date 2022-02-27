import React, { useState } from 'react'

import { Close } from '@mui/icons-material'
import {
    Box,
    FormControl,
    InputLabel,
    Typography,
    OutlinedInput,
    Button,
    Modal,
    FormHelperText,
    CircularProgress,
    Autocomplete,
    TextField,
    IconButton,
} from '@mui/material'

import { useSnackbar } from '../../../HOCs/SnackbarContext'

const src = 'https://res.cloudinary.com/dq7l8216n/image/upload/v1642158763/FPTU.png'

const ModalChainOfEvent = ({
    chainOfEvent,
    setChainEvent,
    isOpenModal,
    closeChainOfEventHandler,
    onCreateChainOfEvent,
    chainOfEventList,
}) => {
    const showSnackbar = useSnackbar()
    const [categoryName, setCategoryName] = useState('')
    const [formCreateNewChainOfEvent, setFormCreateNewChainOfEvent] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [inputValue, setInputValue] = useState(() => {
        return chainOfEvent ? chainOfEvent.categoryName : ''
    })
    const [selectedValue, setSelectedValue] = useState(() => {
        return chainOfEvent ? chainOfEvent.categoryName : null
    })

    const isValidForm = categoryName.trim().length !== 0

    const chooseChainOfEventHandler = (chainOfEventSelected) => {
        if (chainOfEventSelected) {
            setChainEvent({
                id: chainOfEventSelected.id,
                categoryName: chainOfEventSelected.categoryName,
            })
            setSelectedValue(chainOfEventSelected.categoryName)
            closeChainOfEventHandler()
            setFormCreateNewChainOfEvent(false)
        } else {
            setSelectedValue(null)
        }
    }

    const submitFormHandler = (event) => {
        event.preventDefault()
        setIsLoading(true)
        onCreateChainOfEvent({ categoryName, imageUrl: src })
            .then((response) => {
                const dataResponse = response.data.data
                setChainEvent({ id: dataResponse.id, categoryName: dataResponse.categoryName })
                setIsLoading(false)
                showSnackbar({
                    severity: 'success',
                    children: 'Create chain of event successfully.',
                })
                closeChainOfEventHandler()
                setFormCreateNewChainOfEvent(false)
                setCategoryName('')
            })
            .catch((error) => {
                if (error.response.data.code === 422) {
                    setError({
                        categoryName: error.response.data.message,
                    })
                    setIsLoading(false)
                } else {
                    showSnackbar({
                        severity: 'error',
                        children: 'Something went wrong, please try again later.',
                    })
                    closeChainOfEventHandler()
                    setFormCreateNewChainOfEvent(false)
                    setCategoryName('')
                    setIsLoading(false)
                }
            })
    }

    const cateGoryNameHandler = (event) => {
        setCategoryName(event.target.value)
        error?.categoryName && setError(null)
    }
    return (
        <React.Fragment>
            <Modal
                open={isOpenModal}
                onClose={closeChainOfEventHandler}
                onBackdropClick={closeChainOfEventHandler}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 600,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 5,
                    }}
                >
                    <IconButton
                        onClick={closeChainOfEventHandler}
                        sx={{ position: 'absolute', top: 5, right: 5 }}
                    >
                        <Close />
                    </IconButton>
                    <Autocomplete
                        value={selectedValue}
                        isOptionEqualToValue={(option, value) => option.categoryName === value}
                        onChange={(_, chainOfEvent) => chooseChainOfEventHandler(chainOfEvent)}
                        inputValue={inputValue}
                        onInputChange={(_, chainOfEventChanged) => {
                            setInputValue(chainOfEventChanged)
                        }}
                        options={chainOfEventList.map((chainOfEventItem) => ({
                            ...chainOfEventItem,
                            label: chainOfEventItem.categoryName,
                        }))}
                        fullWidth
                        renderInput={(params) => <TextField {...params} label="chain of event" />}
                    />
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>
                        Do not see suitable chain of events?{'  '}
                        <Typography
                            component="span"
                            variant="h6"
                            fontWeight={700}
                            sx={{ '&:hover': { textDecoration: 'underline' }, cursor: 'pointer' }}
                            color="primary"
                            onClick={() =>
                                setFormCreateNewChainOfEvent((previousValue) => !previousValue)
                            }
                        >
                            Start create one.
                        </Typography>
                    </Typography>
                    {formCreateNewChainOfEvent && (
                        <Box component="form" sx={{ mt: 2 }} onSubmit={submitFormHandler}>
                            <FormControl fullWidth size="small">
                                <InputLabel htmlFor="name-chain-events">Name</InputLabel>
                                <OutlinedInput
                                    id="name-chain-events"
                                    label="Name"
                                    size="small"
                                    value={categoryName}
                                    onChange={cateGoryNameHandler}
                                    error={!!error?.categoryName}
                                />
                            </FormControl>
                            {error?.categoryName && (
                                <FormHelperText error={!!error?.categoryName}>
                                    {error?.categoryName && `${error.categoryName}`}
                                </FormHelperText>
                            )}
                            <Box
                                sx={{
                                    mt: 2,
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                }}
                            >
                                <Button variant="contained" disabled={!isValidForm} type="submit">
                                    Create
                                </Button>
                                {isLoading && (
                                    <CircularProgress disableShrink size={20} sx={{ ml: 2 }} />
                                )}
                            </Box>
                        </Box>
                    )}
                </Box>
            </Modal>
        </React.Fragment>
    )
}

export default ModalChainOfEvent
