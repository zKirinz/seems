import React, { useEffect, useRef, useState } from 'react'

import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    OutlinedInput,
    Button,
    Modal,
    FormHelperText,
    CircularProgress,
} from '@mui/material'

import { useSnackbar } from '../../../HOCs/SnackbarContext'

const src = 'https://res.cloudinary.com/dq7l8216n/image/upload/v1642158763/FPTU.png'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
}

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
    const [cloneChainOfEvent, setCloneChainOfEvent] = useState(chainOfEventList)
    const typingTimeOut = useRef(null)
    const [filterChainOfEvent, setFilterChainOfEvent] = useState('')

    const isValidForm = categoryName.trim().length !== 0
    const chooseChainOfEventHandler = (id, categoryName) => {
        setChainEvent({ id: id, categoryName: categoryName })
        closeChainOfEventHandler()
        setFormCreateNewChainOfEvent(false)
    }

    const dropChainOfEventHandler = () => {
        setChainEvent(null)
        setCategoryName('')
        setFormCreateNewChainOfEvent(false)
        closeChainOfEventHandler()
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
    const filterChainOfEventByNameHandler = (event) => {
        const filterSearchValue = event.target.value
        setFilterChainOfEvent(filterSearchValue)
        if (typingTimeOut.current) clearTimeout(typingTimeOut.current)

        typingTimeOut.current = setTimeout(() => {
            const filterChainOfEventList = chainOfEventList.filter((chainOfEvent) =>
                chainOfEvent.categoryName.toLowerCase().includes(filterSearchValue.toLowerCase())
            )
            setCloneChainOfEvent(filterChainOfEventList)
        }, 1000)
    }
    useEffect(() => {
        setCloneChainOfEvent(chainOfEventList)
    }, [chainOfEventList])
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
                        p: 4,
                    }}
                >
                    <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                        <InputLabel htmlFor="filter-name">Search by name</InputLabel>
                        <OutlinedInput
                            id="filter-name"
                            label="Search by name"
                            size="small"
                            value={filterChainOfEvent}
                            onChange={filterChainOfEventByNameHandler}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="category-chain-events">Category name</InputLabel>
                        <Select
                            labelId="category-chain-events"
                            value={chainOfEvent?.categoryName ?? ''}
                            label="Category name"
                            sx={{ '& .MuiIconButton-root': { display: 'none' } }}
                            MenuProps={MenuProps}
                        >
                            {cloneChainOfEvent.map((chainOfEventItem) => (
                                <MenuItem
                                    key={chainOfEventItem.id}
                                    value={chainOfEventItem.categoryName}
                                    onClick={() =>
                                        chooseChainOfEventHandler(
                                            chainOfEventItem.id,
                                            chainOfEventItem.categoryName
                                        )
                                    }
                                    sx={{ position: 'relative' }}
                                >
                                    {chainOfEventItem.categoryName}
                                </MenuItem>
                            ))}
                            <MenuItem value="None" onClick={dropChainOfEventHandler}>
                                None
                            </MenuItem>
                        </Select>
                    </FormControl>
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
