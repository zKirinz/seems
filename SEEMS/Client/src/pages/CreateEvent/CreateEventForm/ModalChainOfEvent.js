import { useState } from 'react'

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

const ModalChainOfEvent = ({
    chainOfEvent,
    setChainEvent,
    isOpenModal,
    closeChainOfEventHandler,
    onCreateChainOfEvent,
    chainOfEventList,
}) => {
    const [categoryName, setCategoryName] = useState('')
    const [formCreateNewChainOfEvent, setFormCreateNewChainOfEvent] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const showSnackbar = useSnackbar()
    const isValidForm = categoryName.trim().length !== 0
    const chooseChainOfEventHandler = (id, categoryName) => {
        setChainEvent({ id: id, categoryName: categoryName })
        closeChainOfEventHandler()
    }
    const dropChainOfEventHandler = () => {
        setChainEvent(null)
        closeChainOfEventHandler()
    }
    const deleteChainOfEvent = (event) => {
        event.stopPropagation()
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
            })
            .then(() => {
                closeChainOfEventHandler()
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
                        value={chainOfEvent?.categoryName ?? ''}
                        label="Category name"
                    >
                        {chainOfEventList.map((chainOfEvent) => (
                            <MenuItem
                                key={chainOfEvent.id}
                                value={chainOfEvent.categoryName}
                                onClick={() =>
                                    chooseChainOfEventHandler(
                                        chainOfEvent.id,
                                        chainOfEvent.categoryName
                                    )
                                }
                                sx={{ position: 'relative' }}
                            >
                                {chainOfEvent.categoryName}
                                <IconButton
                                    sx={{ position: 'absolute', right: 5 }}
                                    onClick={deleteChainOfEvent}
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
    )
}

export default ModalChainOfEvent
