import { useState } from 'react'

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

const src = 'https://res.cloudinary.com/dq7l8216n/image/upload/v1642158763/FPTU.png'

const ModalChainOfEvents = ({
    chainEvents,
    setChainEvents,
    isOpenModal,
    closeChainOfEventHandler,
    onCreateChainOfEvents,
}) => {
    const chooseChainOfEventHandler = (event) => {
        setChainEvents(event.target.value)
    }
    const [categoryName, setCategoryName] = useState('')
    const [formCreateNewChainOfEvents, setFormCreateNewChainOfEvents] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const isValidForm = categoryName.trim().length !== 0
    const submitFormHandler = (event) => {
        event.preventDefault()
        setIsLoading(true)
        onCreateChainOfEvents({ categoryName, imageUrl: src })
            .then((response) => {
                const dataResponse = response.data.data
                setChainEvents({ id: dataResponse.id, categoryName: dataResponse.categoryName })
                setIsLoading(false)
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
    const createNewChainOfEventHandler = (event) => {
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
                        value={chainEvents ?? ''}
                        label="Category name"
                        onChange={chooseChainOfEventHandler}
                    >
                        <MenuItem value="Java">Java</MenuItem>
                        <MenuItem value="Javascript">Javascript</MenuItem>
                        <MenuItem value="Python">Python</MenuItem>
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
                            setFormCreateNewChainOfEvents((previousValue) => !previousValue)
                        }
                    >
                        Start create one.
                    </Typography>
                </Typography>
                {formCreateNewChainOfEvents && (
                    <Box component="form" sx={{ mt: 2 }} onSubmit={submitFormHandler}>
                        <FormControl fullWidth size="small">
                            <InputLabel htmlFor="name-chain-events">Name</InputLabel>
                            <OutlinedInput
                                id="name-chain-events"
                                label="Name"
                                size="small"
                                required
                                value={categoryName}
                                onChange={createNewChainOfEventHandler}
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
                            <Button
                                variant="contained"
                                disabled={!isValidForm}
                                type="submit"
                                sx={{ mr: 2 }}
                            >
                                Create
                            </Button>
                            {isLoading && <CircularProgress disableShrink size={20} />}
                        </Box>
                    </Box>
                )}
            </Box>
        </Modal>
    )
}

export default ModalChainOfEvents
