import React, { useRef, useState } from 'react'

import AlertConfirm from '../../../components/ConfirmDialog'
import { Close } from '@mui/icons-material'
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
    IconButton,
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
    setChainOfEventList,
    onDeleteChainOfEvent,
}) => {
    const [categoryName, setCategoryName] = useState('')
    const [formCreateNewChainOfEvent, setFormCreateNewChainOfEvent] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [confirmDialog, setConfirmDialog] = useState(false)
    const idChainOfEventDeleted = useRef(null)
    const showSnackbar = useSnackbar()
    const isValidForm = categoryName.trim().length !== 0
    const chooseChainOfEventHandler = (id, categoryName) => {
        setChainEvent({ id: id, categoryName: categoryName })
        closeChainOfEventHandler()
        setFormCreateNewChainOfEvent(false)
    }

    const openDialog = (event, id) => {
        event.stopPropagation()
        idChainOfEventDeleted.current = id
        setConfirmDialog(true)
    }

    const closeDialog = () => {
        setConfirmDialog(false)
    }

    const onConfirmDelete = (id) => {
        onDeleteChainOfEvent(id).then(() => {
            setChainOfEventList((previousList) =>
                previousList.filter((chainOfEventItem) => chainOfEventItem.id !== id)
            )
            showSnackbar({
                severity: 'success',
                children: 'Delete chain of event successfully.',
            })
            setConfirmDialog(false)
            idChainOfEventDeleted.current = null
        })
    }

    const dropChainOfEventHandler = () => {
        setChainEvent(null)
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
                setError({
                    categoryName: error.response.data.message,
                })
                setIsLoading(false)
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
                        minHeight: 200,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <FormControl fullWidth>
                        <InputLabel id="category-chain-events">Category name</InputLabel>
                        <Select
                            labelId="category-chain-events"
                            value={chainOfEvent?.categoryName}
                            label="Category name"
                            sx={{ '& .MuiIconButton-root': { display: 'none' } }}
                            MenuProps={MenuProps}
                        >
                            {chainOfEventList.map((chainOfEventItem) => (
                                <MenuItem
                                    key={chainOfEvent?.id}
                                    value={chainOfEventItem?.categoryName}
                                    onClick={() =>
                                        chooseChainOfEventHandler(
                                            chainOfEventItem?.id,
                                            chainOfEventItem?.categoryName
                                        )
                                    }
                                    sx={{ position: 'relative' }}
                                >
                                    {chainOfEventItem?.categoryName}
                                    <IconButton
                                        sx={{ position: 'absolute', right: 5 }}
                                        onClick={(event) => openDialog(event, chainOfEventItem?.id)}
                                    >
                                        <Close />
                                    </IconButton>
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
                                    required
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
            <AlertConfirm
                title="Delete chain of event?"
                open={confirmDialog}
                onConfirm={() => onConfirmDelete(idChainOfEventDeleted.current)}
                onClose={closeDialog}
            >
                Are you sure you want to delete this chain of event?
            </AlertConfirm>
        </React.Fragment>
    )
}

export default ModalChainOfEvent
